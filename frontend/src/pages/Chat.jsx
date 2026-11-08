import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Bot } from "lucide-react";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime';

import { Bot } from "lucide-react";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime';

import { BlankChat } from "../components/Chatpage/BlankChat";
import { ChatHeader } from "../components/Chatpage/ChatHeader";
import { ChatFooter } from "../components/Chatpage/ChatFooter";
import { ChatBox } from "../components/Chatpage/ChatBox";

import { DeleteGroupPopUp } from "../components/DeleteGroupPopUp";

import ChatMock from "../components/ChatMock";

export default function Chat() {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const chatContainerRef = useRef(null);

  const [message, setMessage] = useState("");
<<<<<<< Updated upstream
  // Add a ref to remember text typed before the mic was turned on
  const baseMessage = useRef("");

  const [user, setUser] = useState({ name: "user1" });

||||||| Stash base
  const [chatHistory, setChatHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [groupDetail, setGroupDetail] = useState(null);
=======

  // --- States from Main ---
  const [chatHistory, setChatHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [groupDetail, setGroupDetail] = useState(null);
>>>>>>> Stashed changes
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

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

  const handleSendMessage = () => {
    if (!message.trim()) return;

    console.log("Send:", message);

    setMessage("");
<<<<<<< Updated upstream
    baseMessage.current = ""; // Clear memory on send
    resetTranscript(); // Clear the AI transcript when the message sends
    scrollToBottom();
||||||| Stash base
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
=======
    
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
>>>>>>> Stashed changes
  };

<<<<<<< Updated upstream
  const handleRecord = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition. Please use Google Chrome.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
||||||| Stash base
  const handleReact = (messageId, emoji) => {
    if (chatType === "PRIVATE") {
      socket.emit("private:react", {
        messageId: messageId,
        emoji: emoji,
      });
=======
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
>>>>>>> Stashed changes
    } else {
      // Save current text and reset AI memory right before listening starts
      baseMessage.current = message;
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: 'th-TH' }); // Thai language
    }
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting group:", conversationId);
    // TODO:

    setIsDeletePopupOpen(false);
    navigate("/home");
  };

  return (
    <div className="w-screen h-dvh flex justify-center items-center">
      {conversationId ? (
        <div className="w-full flex flex-col justify-start h-full">
          <ChatHeader
            conversationId={conversationId}
            chatType={"GROUP"}
            toHome={() => navigate("/home")}
            onDeleteClick={() => setIsDeletePopupOpen(true)}
          />
          <div
            ref={chatContainerRef}
            className="relative z-10 bg-white w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain"
          >
            
            <div className="flex flex-col gap-8 px-24 pt-4 pb-8">
              {ChatMock.map((option) => (
                <ChatBox
                  key={option.id}
                  isSender={option.isSender}
                  message={option.message}
                  sender={option.user}
                  user={user}
                  reactions={option.reactions}
                />
              ))}

<<<<<<< Updated upstream
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
||||||| Stash base
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
=======
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
>>>>>>> Stashed changes
            </div>
          </div>
          <ChatFooter
            message={message}
            onMessageChange={handleMessageChange}
            onSendMessage={handleSendMessage}
            onRecord={handleRecord}
            isRecording={listening} // Pass listening state to the footer
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