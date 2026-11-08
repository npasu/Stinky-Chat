import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSocket } from "../hooks/useSocket";

import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";

function Entry() {
  const navigate = useNavigate();
  const { socket, isConnected, socketError, setSocketError } = useSocket();

  const [name, setName] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);

  const catProfiles = [
    "/profile1.svg",
    "/profile2.svg",
    "/profile3.svg",
    "/profile4.svg",
    "/profile5.svg",
  ];

  useEffect(() => {
    if (isConnected) {
      setIsConnecting(false);
      navigate("/home");
    }

    if (socketError) {
      setIsConnecting(false);
    }
  }, [isConnected, navigate, socketError]);

  const handleStart = () => {
    if (isConnecting || isConnected) return;

    setIsConnecting(true);
    setSocketError(null);

    localStorage.setItem("username", name);
    localStorage.setItem("avatarId", selectedProfile);

    socket.auth = {
      username: name,
      avatarId: selectedProfile,
    };
    socket.connect();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleStart();
    }
  };

  return (
    <div className="w-screen h-dvh flex justify-center items-center">
      <div
        className={`bg-white p-8 shadow-card relative flex flex-col space-y-4 rounded-3xl w-[30%] min-w-[450px] min-h-[380px] max-w-[1200px] justify-center items-center`}
      >
        {/* Cat ears and tail */}
        <img
          src="/ear.svg"
          alt=""
          width={70}
          className="absolute -top-12 left-1/5 -translate-x-1/2 z-10"
        />
        <img
          src="/ear.svg"
          alt=""
          width={70}
          className="absolute -top-12 left-4/5 -translate-x-1/2 z-10"
        />
        <img
          src="/tail.svg"
          alt=""
          width={220}
          className="absolute top-70 translate-x-80 -z-10"
        />
        {/* Items */}
        <p className="text-h1 font-semibold text-black text-center">
          Start Your
          <br />
          Stinky Chat
        </p>
        <div className="space-y-2 w-full">
          <div className="flex items-center gap-2">
            <p className="text-h3 font-semibold text-black self-start">Name</p>
            {socketError && (
              <p className="text-subtle font-thin text-primary-orange">
                {socketError.message}
              </p>
            )}
          </div>
          <TextInput
            value={name}
            onChange={setName}
            placeholder="Enter your name"
            className="w-full"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="space-y-2 w-full">
          <p className="text-h3 font-semibold text-black self-start">Profile</p>
          {/** 5 cat profiles */}
          <div className="flex justify-between items-center w-full">
            {catProfiles.map((cat, index) => (
              <Button
                key={index}
                fullRound={true}
                onClick={() => setSelectedProfile(index + 1)}
                hideShadow={true}
                px={0}
                py={0}
                className={`${
                  selectedProfile === index + 1
                    ? "border-black border-2"
                    : "border-transparent hover:border-gray-200 border-2"
                }`}
              >
                <img
                  src={cat}
                  alt={`Cat profile ${index + 1}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </Button>
            ))}
          </div>
        </div>
        {/* Start Button */}
        <Button
          color="yellow"
          disabled={name === "" || isConnecting}
          className="font-medium"
          onClick={handleStart}
        >
          {isConnecting ? "Connecting..." : "Start"}
        </Button>
      </div>
    </div>
  );
}

export default Entry;
