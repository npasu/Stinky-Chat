import { Mic, Send } from "lucide-react";

import { Button } from "../Button";
import { TextInput } from "../TextInput";

export function ChatFooter({
  message,
  onMessageChange,
  onSendMessage,
  onRecord,
}) {
  return (
    <div className="bg-blue w-full h-24 flex items-center px-24 gap-6 justify-center">
      <TextInput
        value={message}
        onChange={onMessageChange}
        placeholder="Type a message"
        className="bg-white w-full h-10"
        borderWeight="border-0"
      />
      <Button
        fullRound={true}
        px="px-0"
        py="py-0"
        color="yellow"
        hideShadow={true}
        onClick={onRecord}
        className="h-10 aspect-square"
        icon={<Mic size={20} strokeWidth={2} />}
      />
      <Button
        fullRound={true}
        px="px-0"
        py="py-0"
        color="yellow"
        hideShadow={true}
        onClick={onSendMessage}
        className="h-10 aspect-square"
        icon={<Send size={20} strokeWidth={2} />}
      />
    </div>
  );
}
