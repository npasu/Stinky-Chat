export function Button({
  children,
  icon,
  className = "",
  variant = "light",
  disabled,
  ...props
}) {
  const variantClass = {
    light: "bg-white border-2 text-primary-500",
    dark: "bg-primary-500 text-white",
    "accent-500": "bg-accent-500 text-white",
    red: "bg-error border-primary-500 border-2 text-white",
    disable: "bg-neutral-400 border-2 text-white",
    "accent-300": "bg-accent-300 text-primary-500",
    transparent: "bg-transparent border text-primary-500",
    error: "bg-error text-white",
  };

  const currentVariant = disabled ? "disable" : variant;

  return (
    <button
      {...props}
      disabled={disabled}
      className={`${variantClass[currentVariant]} flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-button transition-colors ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:brightness-90"} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
