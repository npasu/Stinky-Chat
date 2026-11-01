import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Plus } from "lucide-react";

import { SelectButton } from "../components/SelectButton";
import { Button } from "../components/Button";
import { ChatList } from "../components/ChatList";

const chatListMock = [
  {
    id: 1,
    name: "aaaa",
  },
  {
    id: 1,
    name: "aaaa",
  },
  {
    id: 2,
    name: "bbb",
  },
  {
    id: 3,
    name: "ccc",
  },
  {
    id: 4,
    name: "ddd",
  },
];
function App() {
  const navigate = useNavigate();
  const [chatType, setChatType] = useState("CHAT");

  return (
    <div className="h-dvh w-full overflow-hidden flex flex-col items-center">
      {/* Cat ears and header text */}
      <div className="relative w-full shrink-0 flex justify-center">
        <p className="absolute top-0 z-10 w-full mt-1 text-[4vw] max-w-[60%] font-semibold text-center whitespace-nowrap">
          Welcome to Stinky Chat
        </p>

        <svg viewBox="0 0 1000 180" className="block w-[94%] h-auto">
          <image href="/ear.svg" x="80" y="0" width="120" height="120" />
          <image href="/ear.svg" x="800" y="0" width="120" height="120" />
          <path
            d="M 0 160 Q 0 80 80 80 L 920 80 Q 1000 80 1000 160 L 1000 180 L 0 180 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="z-20 absolute  w-[94%] flex justify-between top-[12vw] px-[3vw]">
        <div className="flex gap-[2vw]">
          <SelectButton
            color={chatType === "CHAT" ? "black" : "white"}
            className="font-medium text-button"
            onClick={() => {
              setChatType("CHAT");
            }}
          >
            Online Friends
          </SelectButton>
          <SelectButton
            color={chatType === "GROUP" ? "black" : "white"}
            className="font-medium text-button"
            onClick={() => {
              setChatType("GROUP");
            }}
          >
            Group Chats
          </SelectButton>
        </div>
        <Button
          color="blue"
          className="font-medium text-button"
          fullRound
          px="px-4"
          icon={<Plus size={18} />}
          onClick={() => {}}
          hidden={chatType != "GROUP"}
          hideShadow
        >
          Create New Group
        </Button>
      </div>
      <div className="relative z-10 bg-white w-[94%] flex-1 min-h-0 -mt-[2px] overflow-y-auto overflow-x-hidden overscroll-contain">
        <div className="p-4 flex flex-col gap-3">
          {chatListMock.map((option) => (
            <ChatList
              key={option.id}
              name={option.name}
              onClick={() => navigate("/chat")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
