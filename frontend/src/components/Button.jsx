export function Button({
  children,
  icon,
  className = "",
  color = "light",
  disabled = false,
  fullRound = false,
  ...props
}) {
  const colorClass = {
    yellow: "bg-primary-yellow text-black",
    blue: "bg-primary-500 text-white",
    "accent-500": "bg-accent-500 text-white",
    disableyellow: "bg-dark-yellow text-black",
    "accent-300": "bg-accent-300 text-primary-500",
  };

  const currentColor = disabled ? `disable${color}` : color;

  return (
    <button
      {...props}
      disabled={disabled}
      className={`${colorClass[currentColor]} ${fullRound ? "rounded-full" : "rounded-xl"} flex items-center justify-center gap-2 px-12 py-2 text-button transition-colors ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:brightness-90 shadow-button"} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
