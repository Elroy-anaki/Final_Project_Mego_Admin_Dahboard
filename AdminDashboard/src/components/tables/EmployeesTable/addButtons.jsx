import React from "react";

export function AddButton({ text, functionHandler, className = "" }) {
  return (
    <button
      onClick={functionHandler}
      className={`
        bg-green-700 
        hover:bg-green-600 
        text-white 
        font-semibold py-2 px-4
        rounded-lg shadow-md transition-all ease-in-out duration-200 
        focus:outline-none 
        focus:ring-2 
        focus:ring-green-500 
        focus:ring-offset-2 
        ${className}`}
    >
      {text}
    </button>
  );
}
