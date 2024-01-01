import React from "react";

function Button({
  // Destructuring props with default values where needed
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children} {/* Rendering the content inside the button */}
    </button>
  );
}

export default Button;
