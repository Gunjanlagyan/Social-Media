import React from "react";

const Button = ({
  children,
  type = "button",
  bgColour = "bg-blue-600",
  textColour = "text-white",
  classname = "",
  ...props
}) => {
  return (
    <button
      className={`w-full py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg ${bgColour} ${textColour} ${classname}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
