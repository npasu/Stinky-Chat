import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";

function App() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [selectedProfile, setSelectedProfile] = useState(0);

  const catProfiles = [
    "/profile1.svg",
    "/profile2.svg",
    "/profile3.svg",
    "/profile4.svg",
    "/profile5.svg",
  ];

  return (
    <div className="min-h-screen min-w-screen flex  justify-center items-center">
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
          <p className="text-h3 font-semibold text-black self-start">Name</p>
          <TextInput
            value={name}
            onChange={setName}
            placeholder="Enter your name"
          />
        </div>
        <div className="space-y-2 w-full">
          <p className="text-h3 font-semibold text-black self-start">Profile</p>
          {/** 5 cat profiles */}
          <div className="flex justify-between items-center w-full">
            {catProfiles.map((cat, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedProfile(index)}
                className={`rounded-full border-2 transition-all duration-200 focus:outline-none ${
                  selectedProfile === index
                    ? "border-black"
                    : "border-transparent hover:border-gray-200"
                }`}
              >
                <img
                  src={cat}
                  alt={`Cat profile ${index + 1}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <Button
          color="yellow"
          disabled={name === ""}
          className="font-medium"
          onClick={() => navigate("/home")}
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default App;
