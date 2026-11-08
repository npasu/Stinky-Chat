import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useSocket } from "../hooks/useSocket";

import { Bot } from "lucide-react";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime';

import { BlankChat } from "../components/Chatpage/BlankChat";
import { ChatHeader } from "../components/Chatpage/ChatHeader";
import { ChatFooter } from "../components/Chatpage/ChatFooter";
import { ChatBox } from "../components/Chatpage/ChatBox";

import { DeleteGroupPopUp } from "../components/DeleteGroupPopUp";

export default function Chat() {
  const navigate = useNavigate();

  const { targetName: rawTargetName } = useParams();
  const targetName = decodeURIComponent(rawTargetName);

  const [searchParams] = useSearchParams();
  const chatType = searchParams.get("type");

  const chatContainerRef = useRef(null);
  const { socket, isConnected } = useSocket();

  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");

  // --- States from Main ---
  const [chatHistory, setChatHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [groupDetail, setGroupDetail] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const isLeader =
    chatType === "GROUP" && user?.username === groupDetail?.leaderName;

  // --- AI Feature State & Hooks ---
  const baseMessage = useRef("");
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Append the transcript instead of overwriting
  useEffect(() => {
    if (transcript) {
      // Add a space between typed text and spoken text if needed
      const space = baseMessage.current ? " " : "";
      setMessage(baseMessage.current + space + transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (listening) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [listening]);

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleMessageChange = (value) => {
    setMessage(value);

    // Keep the AI and text box in sync when user backspaces/types manually
    baseMessage.current = value;
    resetTranscript();
  };

  const handleRecord = () => {
    console.log("Recording");
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessage("");
    
    // Clear AI memory on send
    baseMessage.current = ""; 
    resetTranscript(); 
    scrollToBottom();
    
    // Main branch logic: Emit send message event
    if (chatType === "PRIVATE")
      socket.emit("private:send_message", {
        receiverName: targetName,
        text: message,
      });
    else
      socket.emit("group:send_message", {
        groupName: targetName,
        text: message,
      });
  };

  const handleRecord = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition. Please use Google Chrome.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      // Save current text and reset AI memory right before listening starts
      baseMessage.current = message;
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: 'th-TH' }); // Thai language
    }
  };

  const handleReact = (messageId, emoji) => {
    if (chatType === "PRIVATE") {
      socket.emit("private:react", {
        messageId: messageId,
        emoji: emoji,
      });
    } else {
      socket.emit("group:react", {
        messageId: messageId,
        emoji: emoji,
        groupName: targetName,
      });
    }
  };

  const handleDeleteConfirm = () => {
    socket.emit("group:delete", {
      groupName: targetName,
    });
    setIsDeletePopupOpen(false);
    navigate("/home");
  };

  // Named Functions for handler
  const handleProfileLoaded = (res) => setUser(res);
  const handleOnlineUsersLoaded = (res) => setUserList(res || []);
  const handleChatLoaded = (res) => setChatHistory(res?.history || res || []);

  const handleGroupLoaded = (res) => setGroupDetail(res);
  const handleChatUpdated = () => {
    if (chatType === "PRIVATE")
      socket.emit("private:get_history", { receiverName: targetName });
    else socket.emit("group:get_history", { groupName: targetName });
  };
  const handleGroupUserChange = () => {
    socket.emit("group:get_detail", { groupName: targetName });
    socket.emit("group:get_history", { groupName: targetName });
  };

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
      return;
    }

    // Emit request
    socket.emit("user:get_profile");
    socket.emit("user:get_online_users");
    if (chatType === "PRIVATE")
      socket.emit("private:get_history", { receiverName: targetName });
    else {
      socket.emit("group:get_history", { groupName: targetName });
      socket.emit("group:get_detail", { groupName: targetName });
    }

    // Event Listeners
    socket.on("user:profile_loaded", handleProfileLoaded);
    socket.on("user:online_users_loaded", handleOnlineUsersLoaded);

    if (chatType === "PRIVATE") {
      socket.on("private:history_loaded", handleChatLoaded);
      socket.on("private:message_received", handleChatUpdated);
      socket.on("private:reaction_updated", handleChatUpdated);
    } else {
      socket.on("group:detail_loaded", handleGroupLoaded);
      socket.on("group:history_loaded", handleChatLoaded);
      socket.on("group:message_received", handleChatUpdated);
      socket.on("group:reaction_updated", handleChatUpdated);
      socket.on("group:user_left", handleGroupUserChange);
      socket.on("group:user_joined", handleGroupUserChange);
    }

    // Cleanup Function
    return () => {
      socket.off("user:profile_loaded", handleProfileLoaded);
      socket.off("user:online_users_loaded", handleOnlineUsersLoaded);

      if (chatType === "PRIVATE") {
        socket.off("private:history_loaded", handleChatLoaded);
        socket.off("private:message_received", handleChatUpdated);
        socket.off("private:reaction_updated", handleChatUpdated);
      } else {
        socket.off("group:detail_loaded", handleGroupLoaded);
        socket.off("group:history_loaded", handleChatLoaded);
        socket.off("group:message_received", handleChatUpdated);
        socket.off("group:reaction_updated", handleChatUpdated);
        socket.off("group:user_left", handleGroupUserChange);
        socket.off("group:user_joined", handleGroupUserChange);
      }
    };
  }, [isConnected, navigate, socket, chatType, targetName]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") navigate("/home");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  useEffect(() => {
    if (chatHistory.length > 0) {
      scrollToBottom();
    }
  }, [chatHistory.length]);

  return (
    <div className="w-screen h-dvh flex justify-center items-center">
      {targetName ? (
        <div className="w-full flex flex-col justify-start h-full">
          <ChatHeader
            targetName={targetName}
            chatType={chatType}
            toHome={() => navigate("/home")}
            onDeleteClick={() => setIsDeletePopupOpen(true)}
            isLeader={isLeader}
          />
          <div
            ref={chatContainerRef}
            className="relative z-10 bg-white w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain"
          >
            
            <div className="flex flex-col gap-8 px-24 pt-4 pb-8">
              {user &&
                userList &&
                chatHistory.map((option, index) => {
                  const onlineUser = userList.find(
                    (u) => u?.username === option.senderName,
                  );

                  return (
                    <ChatBox
                      key={index}
                      isSender={option.senderName === user.username}
                      message={option.text}
                      time={option.createdAt}
                      sender={onlineUser}
                      user={user}
                      reactions={option.reactions}
                      onEmote={(emoji) => handleReact(option._id, emoji)}
                    />
                  );
                })}

              {/* AI Working Indicator */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  listening ? "max-h-20 opacity-100 mt-2 mb-2" : "max-h-0 opacity-0 m-0"
                }`}
              >
                <div className="flex items-center gap-4 animate-pulse">
                  <div className="w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center text-white shadow-sm">
                    <Bot size={24} strokeWidth={2} />
                  </div>
                  <span className="text-primary-orange font-medium text-body">
                    Ai is working ...
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ChatFooter
            message={message}
            onMessageChange={handleMessageChange}
            onSendMessage={handleSendMessage}
            onRecord={handleRecord}
            isRecording={listening}
          />
        </div>
      ) : (
        <BlankChat
          toHome={() => navigate("/home")}
          toEntry={() => navigate("/")}
        />
      )}
      {isDeletePopupOpen && (
        <DeleteGroupPopUp
          onCancel={() => setIsDeletePopupOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}