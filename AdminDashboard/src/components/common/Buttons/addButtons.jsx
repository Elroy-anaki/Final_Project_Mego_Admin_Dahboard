import React from "react";

export function AddButton({ text, className = "" }) {
  return (
    <button
      className={`
        bg-green-700 
        hover:bg-green-600 
        text-white 
        font-semibold py-2 px-4
         rounded-tl-lg  shadow-md transition-all ease-in-out duration-200 
        ${className}`}
    >
      {text}
    </button>
  );
}
