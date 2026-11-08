import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, UserRoundGroup } from "lucide-react";

import { useSocket } from "../hooks/useSocket";

import { SelectButton } from "../components/SelectButton";
import { Button } from "../components/Button";
import { ChatList } from "../components/ChatList";
import { CreateGroupPopUp } from "../components/CreateGroupPopUp";
import { ViewMembersPopUp } from "../components/ViewMembersPopUp";
import { useRef } from "react";

function Home() {
  const navigate = useNavigate();
  const { socket, isConnected, socketError, setSocketError } = useSocket();
  const [selectedType, setSelectedType] = useState("PRIVATE");

  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMembersPopupOpen, setIsMembersPopupOpen] = useState(false);
  const [groupSelected, setGroupSelected] = useState(null);

  const isPopupOpenRef = useRef(isPopupOpen);
  const isMembersPopupOpenRef = useRef(isMembersPopupOpen);

  const handleCreateGroup = (groupName) => {
    socket.emit("group:create", { groupName });
    setIsPopupOpen(false);
    navigate(`/chat/${encodeURIComponent(groupName)}?type=GROUP`);
  };
  const handleJoinGroup = (groupName) => {
    socket.emit("group:join", { groupName });
    navigate(`/chat/${encodeURIComponent(groupName)}?type=GROUP`);
  };

  // Named Functions for handler
  const handleProfileLoaded = (res) => setUser(res);
  const handleOnlineUsersLoaded = (res) => setUserList(res || []);
  const handleGroupListLoaded = (res) => setGroupList(res || []);
  const handleUserChange = () => socket.emit("user:get_online_users");
  const handleGroupChange = () => socket.emit("group:get_list");

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
      return;
    }

    // Emit request
    socket.emit("user:get_profile");
    socket.emit("user:get_online_users");
    socket.emit("group:get_list");

    // Event Listeners
    socket.on("user:profile_loaded", handleProfileLoaded);
    socket.on("user:online_users_loaded", handleOnlineUsersLoaded);
    socket.on("group:list_loaded", handleGroupListLoaded);
    socket.on("group:list_updated", handleGroupChange);
    socket.on("group:deleted", handleGroupChange);
    socket.on("user:online", handleUserChange);
    socket.on("user:offline", handleUserChange);

    // Cleanup Function
    return () => {
      socket.off("user:profile_loaded", handleProfileLoaded);
      socket.off("user:online_users_loaded", handleOnlineUsersLoaded);
      socket.off("group:list_loaded", handleGroupListLoaded);
      socket.off("group:list_updated", handleGroupChange);
      socket.off("group:deleted", handleGroupChange);
      socket.off("user:online", handleUserChange);
      socket.off("user:offline", handleUserChange);
    };
  }, [isConnected, navigate, socket]);

  useEffect(() => {
    isPopupOpenRef.current = isPopupOpen;
    isMembersPopupOpenRef.current = isMembersPopupOpen;
  }, [isPopupOpen, isMembersPopupOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        const isOpen = isPopupOpenRef.current || isMembersPopupOpenRef.current;
        if (isOpen) {
          setIsPopupOpen(false);
          setIsMembersPopupOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
              color={selectedType === "PRIVATE" ? "black" : "white"}
              className="font-medium text-button"
              onClick={() => {
                setSelectedType("PRIVATE");
              }}
            >
              Online Friends
            </SelectButton>
            <SelectButton
              color={selectedType === "GROUP" ? "black" : "white"}
              className="font-medium text-button"
              onClick={() => {
                setSelectedType("GROUP");
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
            hidden={selectedType != "GROUP"}
            hideShadow
          >
            Create New Group
          </Button>
        </div>
        <div className="flex-1 min-h-0 py-4 px-18 flex flex-col gap-3 overflow-y-auto overflow-x-hidden overscroll-contain">
          {user && (
            <ChatList
              name={user.username}
              profileIcon={
                <img
                  src={`/profile${user.avatarId}.svg`}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
              }
              isUserProfile={true}
            />
          )}
          <hr className="h-1 bg-dark-gray border-0"></hr>
          {selectedType === "PRIVATE"
            ? userList.length > 0 &&
              // Private chat
              userList.map(
                (option) =>
                  user &&
                  option.username != user.username && (
                    <ChatList
                      key={option._id}
                      name={option.username}
                      profileIcon={
                        <img
                          src={`/profile${option.avatarId}.svg`}
                          alt=""
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      }
                      onChatClick={() =>
                        navigate(
                          `/chat/${encodeURIComponent(option.username)}?type=PRIVATE`,
                        )
                      }
                    />
                  ),
              )
            : groupList.length > 0 &&
              // Group chat
              groupList.map((group) => (
                <ChatList
                  key={group._id}
                  name={group.groupName}
                  profileIcon={<UserRoundGroup size={56} strokeWidth={1} />}
                  onChatClick={() => handleJoinGroup(group.groupName)}
                  isGroup={true}
                  onMembersClick={() => {
                    setGroupSelected(group);
                    setIsMembersPopupOpen(true);
                  }}
                />
              ))}
        </div>
      </div>
      {isPopupOpen && (
        <CreateGroupPopUp
          onCancel={() => setIsPopupOpen(false)}
          onConfirm={handleCreateGroup}
        />
      )}
      {isMembersPopupOpen && groupSelected && (
        <ViewMembersPopUp
          onConfirm={() => {
            setIsMembersPopupOpen(false);
            setGroupSelected(null);
          }}
          leader={groupSelected?.leaderName || groupSelected?.leader}
          member={groupSelected?.members || []}
          onlineList={userList}
        />
      )}
    </div>
  );
}

export default Home;
