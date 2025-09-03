import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "secondary";
  theme?: "light" | "dark" | "romantic"; // NEW
};

export function Button({
  size = "md",
  variant = "default",
  theme = "light",
  className,
  children,
  ...rest
}: ButtonProps) {
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variants = {
    default: "bg-rose-500 text-white hover:bg-rose-600",
    secondary: "bg-white border text-gray-700 hover:bg-gray-50",
  };

  // 🎨 Theme overrides
  const themeStyles: Record<typeof theme, string> = {
    light: "",
    dark: "bg-gray-800 text-white hover:bg-gray-700 border-gray-600",
    romantic:
      "bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 text-white hover:opacity-90",
  };

  return (
    <button
      {...rest}
      className={clsx(
        "inline-flex items-center justify-center rounded-2xl font-medium shadow transition",
        sizes[size],
        variants[variant],
        themeStyles[theme],
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;