import { FaceSlightlySmiling, Heart, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "../Button";

export function ChatBox({ isSender, message, reactions, user, sender }) {
  const bgColor = isSender ? "bg-primary-blue" : "bg-primary-yellow";
  const alignment = isSender ? "self-end" : "self-start";

  const reactionIcon = {
    HEART: (isActive) => (
      <Heart
        fill={
          isActive
            ? "var(--color-primary-orange)"
            : "var(--color-primary-yellow)"
        }
        color="var(--color-black)"
        size={18}
        strokeWidth={3}
      />
    ),
    THUMBS_UP: (isActive) => (
      <ThumbsUp
        fill={
          isActive ? "var(--color-primary-blue)" : "var(--color-primary-yellow)"
        }
        color="var(--color-black)"
        size={18}
        strokeWidth={3}
      />
    ),
    THUMBS_DOWN: (isActive) => (
      <ThumbsDown
        fill={
          isActive ? "var(--color-dark-gray)" : "var(--color-primary-yellow)"
        }
        color="var(--color-black)"
        size={18}
        strokeWidth={3}
      />
    ),
  };
  return (
    <div className={`${alignment} flex w-full gap-3`}>
      {/* Profile Image Left */}
      {!isSender && (
        <img
          src={sender.profile}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
      <div
        className={`${alignment} relative flex min-w-0 flex-col w-full gap-1`}
      >
        {/* Emote box */}

        <div className={`${alignment} absolute -bottom-6 flex w-fit ms-6`}>
          <div className="bg-primary-yellow flex items-center justify-center min-h-8 px-2 border-white border-1 rounded-full gap-2">
            <div className="flex items-center gap-1">
              <FaceSlightlySmiling size={18} strokeWidth={2.5} />
              <p className="font-semibold">|</p>
            </div>
            {Object.entries(reactionIcon).map(([key, renderIcon]) => {
              const users = reactions[key] ?? [];
              const isActive = users.includes(user.name);

              return (
                <div key={key} className="flex items-center gap-0.5">
                  <Button
                    fullRound={true}
                    px="px-0"
                    py="py-0"
                    color="yellow"
                    hideShadow={true}
                    onClick={() => {}}
                    className="h-6 aspect-square flex items-center justify-center"
                    icon={renderIcon(isActive)}
                  />{" "}
                  <p
                    className={`${isActive ? "font-bold" : "font-medium"} text-body`}
                  >
                    {users.length > 0 && users.length}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Username */}
        <p className={`${alignment} text-body font-medium`}>{sender.name}</p>
        {/* Message Box */}
        <p
          className={`${bgColor} ${alignment}  max-w-[60%] rounded-3xl break-words px-4 py-2`}
        >
          {message}
        </p>
      </div>
      {/* Profile Image Right */}
      {isSender && (
        <img
          src={sender.profile}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
    </div>
  );
}
