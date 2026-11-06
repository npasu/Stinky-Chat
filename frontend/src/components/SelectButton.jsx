import { Button } from "../components/Button";

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
    <Button
      {...props}
      disabled={disabled}
      icon={icon}
      className={className}
      color={color}
      px="px-4"
      hideShadow={true}
      fullRound={true}
    >
      {children}
    </Button>
  );
}
