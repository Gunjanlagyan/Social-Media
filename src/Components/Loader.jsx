import React from 'react'

const Loader = () => {
  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-400">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
  )
}

export default Loader
