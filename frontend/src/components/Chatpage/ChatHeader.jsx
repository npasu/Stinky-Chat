import { ArrowLeft, Trash } from "lucide-react";

import { Button } from "../Button";

export function ChatHeader({ toHome, conversationId }) {
  return (
    <div className="bg-blue w-full h-24 flex items-center px-24 justify-between">
      <div className="flex items-center gap-6">
        <Button
          fullRound={true}
          px="px-2"
          py="py-2"
          color="blue"
          hideShadow={true}
          onClick={toHome}
          icon={<ArrowLeft size={24} strokeWidth={2} />}
        />
        <p className="text-h3 font-semibold">{conversationId}</p>
      </div>
      <Button
        color="orange"
        px="px-4"
        hideShadow={true}
        className="text-button font-semibold"
        onClick={() => {}}
        icon={<Trash size={24} strokeWidth={2} />}
      >
        Delete Group
      </Button>
    </div>
  );
}
