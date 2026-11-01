import { MessageCircleMore } from "lucide-react";

export function ChatList({
  children,
  profileIcon,
  name,
  className = "",
  disabled = false,
  hideShadow = false,
  ...props
}) {
  const colorClass = {
    yellow: "bg-primary-yellow text-black",
    disableyellow: "bg-dark-yellow text-black",
  };

  const currentColor = disabled ? `disableyellow` : "yellow";

  return (
    <button
      {...props}
      className={`${colorClass[currentColor]} w-full rounded-full flex items-center justify-between gap-2 px-6 py-4 text-button transition-colors cursor-pointer hover:brightness-90 ${className}`}
    >
      <div>
        {profileIcon && <span>{profileIcon}</span>}
        {name}
      </div>
      <MessageCircleMore size={36} strokeWidth={1} />
    </button>
  );
}
