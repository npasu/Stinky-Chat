import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Plus, CircleUserRound, UserRoundGroup } from "lucide-react";

import { SelectButton } from "../components/SelectButton";
import { Button } from "../components/Button";
import { ChatList } from "../components/ChatList";

import { CreateGroupPopUp } from "../components/CreateGroupPopUp";
import { ViewMembersPopUp } from "../components/ViewMembersPopUp";

import ChatListMock from "../components/ChatListMock";

function Home() {
  const navigate = useNavigate();
  const [chatType, setChatType] = useState("DIRECT");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isMembersPopupOpen, setIsMembersPopupOpen] = useState(false);

  const handleCreateGroup = (groupName) => {
    console.log("New group created:", groupName);
    //TODO:
    setIsPopupOpen(false);
  };

  return (
    <div className="w-screen h-dvh overflow-hidden flex flex-col items-center">
      {/* Cat ears and header text */}
      <div className="relative w-full shrink-0 flex justify-center">
        <p className="absolute top-0 z-10 w-full mt-1 text-[4vw] max-w-[60%] font-semibold text-center whitespace-nowrap">
          Welcome to Stinky Chat
        </p>

        <svg viewBox="0 0 1000 120" className="block w-[94%] h-auto">
          <image href="/ear.svg" x="80" y="0" width="120" height="120" />
          <image href="/ear.svg" x="800" y="0" width="120" height="120" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative bg-white w-[94%] flex-1 min-h-0 -mt-[3vw] py-[3vw] rounded-ss-[6vw] rounded-se-[6vw] flex flex-col">
        <div className="z-20 flex justify-between py-4 px-18">
          <div className="flex gap-[2vw]">
            <SelectButton
              color={chatType === "DIRECT" ? "black" : "white"}
              className="font-medium text-button"
              onClick={() => {
                setChatType("DIRECT");
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
            onClick={() => setIsPopupOpen(true)}
            hidden={chatType != "GROUP"}
            hideShadow
          >
            Create New Group
          </Button>
        </div>
        <div className="flex-1 min-h-0 py-4 px-18 flex flex-col gap-3 overflow-y-auto overflow-x-hidden overscroll-contain">
          {ChatListMock.map(
            (option) =>
              option.type === chatType && (
                <ChatList
                  key={option.id}
                  name={option.name}
                  profileIcon={
                    option.type === "GROUP" ? (
                      <UserRoundGroup size={56} strokeWidth={1} />
                    ) : (
                      <CircleUserRound size={56} strokeWidth={1} />
                    )
                  }
                  onChatClick={() => navigate(`/chat/${option.id}`)}
                  onMembersClick={() => {
                    setIsMembersPopupOpen(true);
                  }}
                  isGroup={option.type === "GROUP"}
                />
              ),
          )}
        </div>
      </div>
      {isPopupOpen && (
        <CreateGroupPopUp
          onCancel={() => setIsPopupOpen(false)}
          onConfirm={handleCreateGroup}
        />
      )}
      {isMembersPopupOpen && (
        <ViewMembersPopUp onConfirm={() => setIsMembersPopupOpen(false)} />
      )}
    </div>
  );
}

export default Home;
