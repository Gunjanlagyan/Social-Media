import  { useId } from "react";

const Input = ({
    label, 
    type = "text",
    className = "",
    ref,
    ...props 
}) => {
  const id = useId();
  return(
<div className=" w-full">
    {label && <label className="inline-block font-medium mb-1 pl-1 text-center w-full text-lg " htmlFor={id}>{label}</label> }
    <input type={type} className={`${className} w-full rounded-xl pl-2 py-1 `} ref={ref} {...props} id={id}/>
     </div>
  )
};

export default Input;
