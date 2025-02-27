import React from 'react'

const Button = ({children,
    type = "button",
    bgColour = "bg-blue-600",
    textColour = "text-white",
    classname ="",
    ...props
}) => {
  return (
   <button className={`px-4 py-2 rounded-lg ${bgColour} ${textColour} ${classname}`}{...props}>{children}</button>
  )
}

export default Button