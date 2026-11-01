import { Button } from "../Button";

export function BlankChat({ toHome, toEntry }) {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-h1 font-bold text-center">
        Please select a conversation
      </p>
      <Button
        color="yellow"
        py="py-6"
        fullRound={true}
        className="font-bold text-h3"
        onClick={toHome}
      >
        Back to home
      </Button>{" "}
      <Button
        color="yellow"
        py="py-6"
        fullRound={true}
        className="font-bold text-h3"
        onClick={toEntry}
      >
        Back to entry
      </Button>
    </div>
  );
}
