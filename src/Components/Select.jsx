import React, { useId } from 'react'

const Select = ({
    options,
    label,
    ref,
    className="",
    ...props

}) => {
  const id= useId()
  return (
    <div className='w-full'>
      {label && <label className="" htmlFor={id}> </label> }
      <select ref={ref} id={id} {...props} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
       {options && options.map((option)=>
        <option key={option} value={option}>
          {option}
        </option>
       )}

      </select>
    </div>
  )
}

export default Select