import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useSocket } from "../hooks/useSocket";

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
  const [chatHistory, setChatHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [groupDetail, setGroupDetail] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const isLeader =
    chatType === "GROUP" && user?.username === groupDetail?.leaderName;

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleMessageChange = (value) => {
    setMessage(value);
  };

  const handleRecord = () => {
    console.log("Recording");
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessage("");
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
  const handleGroupUserLeft = () => {
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
      socket.on("group:user_left", handleGroupUserLeft);
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
        socket.off("group:user_left", handleGroupUserLeft);
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
  }, [chatHistory]);

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

                  const sender =
                    option.senderName === "Anonymous"
                      ? { username: "Anonymous", avatarId: 0 }
                      : onlineUser;
                  return (
                    <ChatBox
                      key={index}
                      isSender={option.senderName === user.username}
                      message={option.text}
                      time={option.createdAt}
                      sender={sender}
                      user={user}
                      reactions={option.reactions}
                      onEmote={(emoji) => handleReact(option._id, emoji)}
                    />
                  );
                })}
            </div>
          </div>
          <ChatFooter
            message={message}
            onMessageChange={handleMessageChange}
            onSendMessage={handleSendMessage}
            onRecord={handleRecord}
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
