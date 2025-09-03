import React from "react";

type Theme = "light" | "dark" | "romantic";

export const Card = ({
  children,
  className = "",
  theme = "light", // NEW
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { theme?: Theme }) => {
  const themeStyles: Record<Theme, string> = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white border border-gray-700",
    romantic:
      "bg-gradient-to-r from-pink-100 via-purple-200 to-pink-300 text-gray-900",
  };

  return (
    <div
      {...rest}
      className={`rounded-2xl shadow p-4 ${themeStyles[theme]} ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...rest} className={`${className}`}>
    {children}
  </div>
);

export const CardContent = ({
  children,
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...rest} className={`p-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({
  children,
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...rest} className={`p-3 border-t ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({
  children,
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 {...rest} className={`text-lg font-semibold ${className}`}>
    {children}
  </h3>
);