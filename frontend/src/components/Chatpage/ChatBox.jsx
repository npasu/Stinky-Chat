export function ChatBox({ isSender, message, emote, user }) {
  const bgColor = isSender ? "bg-primary-blue" : "bg-primary-yellow";
  const alignment = isSender ? "self-end" : "self-start";
  return (
    <div className={`${alignment} flex w-full gap-3`}>
      {!isSender && (
        <img
          src={user.profile}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
      <div className={`${alignment} flex min-w-0 flex-col w-full gap-1`}>
        <p className={`${alignment} text-body font-medium`}>{user.name}</p>
        <p
          className={`${bgColor} ${alignment} max-w-[60%] rounded-3xl break-words px-4 py-2`}
        >
          {message}
        </p>
      </div>
      {isSender && (
        <img
          src={user.profile}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
    </div>
  );
}
