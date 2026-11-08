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
  const handleChatLoaded = (res) => setChatHistory(res?.history || res ||