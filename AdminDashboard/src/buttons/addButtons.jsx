import React from "react";

export function AddButton({ text = "Add", onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-green-500 
        hover:bg-green-600 
        text-white 
        font-semibold py-2 px-4 
        rounded shadow-md transition-all ease-in-out duration-200 
        focus:outline-none 
        focus:ring-2 
        focus:ring-green-400 
        focus:ring-offset-2 
        ${className}`}
    >
      {text}
    </button>
  );
}
