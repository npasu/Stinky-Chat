import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Entry from "./pages/Entry";
import Chat from "./pages/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Entry />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:conversationId" element={<Chat />} />
    </Routes>
  );
}

export default App;
