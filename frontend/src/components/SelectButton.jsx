export function SelectButton({
  children,
  icon,
  className = "",
  color = "light",
  disabled = false,
  ...props
}) {
  const colorClass = {
    black: "bg-black border-2 border-black text-white",
    white: "bg-white border-2 border-black text-black",
  };

  return (
    <button
      {...props}
      disabled={disabled}
      className={`${colorClass[color]} rounded-full flex items-center justify-center gap-2 py-2 px-4 w-36 text-button transition-colors ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:brightness-90"} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
