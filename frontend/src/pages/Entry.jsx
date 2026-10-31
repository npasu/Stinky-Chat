import { useState } from "react";
import { Home } from "lucide-react";

import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";

function App() {
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <div
        className={`bg-white shadow-card rounded-3xl w-[30%] aspect-[9/8] min-w-[450px] min-h-[380px] max-w-[1200px] items-center`}
      >
        <p className="text-h1 text-black font-bold text-center">
          Start Your
          <br />
          Stinky Chat
        </p>
        <p className="text-h3 text-black font-bold text-center">Name</p>

        <TextInput
          value={name}
          onChange={setName}
          placeholder="Enter your name"
        />
        <Button icon={null} variant="light">
          Start
        </Button>
      </div>
    </div>
  );
}

export default App;
