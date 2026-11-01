import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BlankChat } from "../components/Chatpage/BlankChat";
import { ChatHeader } from "../components/Chatpage/ChatHeader";
import { ChatFooter } from "../components/Chatpage/ChatFooter";
import { ChatBox } from "../components/Chatpage/ChatBox";

import ChatMock from "../components/ChatMock";

export default function Chat() {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const chatContainerRef = useRef(null);

  const [message, setMessage] = useState("");

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleMessageChange = (value) => {
    setMessage(value);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    console.log("Send:", message);

    setMessage("");
    scrollToBottom();
  };

  const handleRecord = () => {
    console.log("Recording");
  };

  return (
    <div className="w-screen h-dvh flex justify-center items-center">
      {conversationId ? (
        <div className="w-full flex flex-col justify-start h-full">
          <ChatHeader
            conversationId={conversationId}
            toHome={() => navigate("/home")}
          />
          <div
            ref={chatContainerRef}
            className="relative z-10 bg-white w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain"
          >
            <div className="flex flex-col gap-3 px-24 py-4">
              {ChatMock.map((option) => (
                <ChatBox
                  key={option.id}
                  isSender={option.isSender}
                  message={option.message}
                  user={option.user}
                />
              ))}
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
    </div>
  );
}
