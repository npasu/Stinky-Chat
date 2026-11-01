export function Button({
  children,
  icon,
  className = "",
  color = "yellow",
  px = "px-12",
  disabled = false,
  hideShadow = false,
  fullRound = false,
  ...props
}) {
  const colorClass = {
    yellow: "bg-primary-yellow text-black",
    blue: "bg-primary-blue text-black",
    disableyellow: "bg-dark-yellow text-black",
  };

  const currentColor = disabled ? `disable${color}` : color;

  return (
    <button
      {...props}
      disabled={disabled}
      className={`${colorClass[currentColor]} ${fullRound ? "rounded-full" : "rounded-xl"} flex items-center justify-center gap-2 ${px} py-2 text-button transition-colors ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:brightness-90 hover:scale-105 active:scale-95 shadow-button"} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
