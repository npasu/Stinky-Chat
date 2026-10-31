export function TextInput({
  value,
  onChange,
  type = "text",
  className = "",
  multiline = false,
  ...props
}) {
  const commonClasses = `
    w-full rounded-full border-2 border-primary-blue px-5 py-3 text-subtle
    ${className}
  `;

  if (multiline) {
    return (
      <textarea
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`resize-none ${commonClasses}`}
      />
    );
  }

  return (
    <input
      {...props}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={commonClasses}
    />
  );
}
