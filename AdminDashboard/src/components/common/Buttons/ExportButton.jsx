import React from "react";
import { Download, FileSpreadsheet } from "lucide-react";

function ExportButton({ download, className }) {
  return (
    <div className="relative group">
      <button
        onClick={download}
        type="button"
        className={`
          inline-flex items-center gap-2
          px-4 py-2.5
          bg-white
          text-gray-700
          text-sm
          font-medium
          rounded-xl
          border
          border-gray-200
          transition-all
          duration-200
          hover:bg-green-50
          hover:border-green-200
          hover:text-green-600
          hover:shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
          focus:ring-offset-2
          active:scale-95
          ${className}
        `}
      >
        <FileSpreadsheet className="w-4 h-4" />
        <span>Export XL</span>
      </button>
      
      {/* Tooltip */}
      <div className="
        absolute 
        bottom-full 
        left-1/2 
        -translate-x-1/2 
        mb-2
        px-3 
        py-1.5 
        bg-gray-900 
        text-white 
        text-xs 
        rounded-lg
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-200
        pointer-events-none
        whitespace-nowrap
      ">
        Export to Excel
        {/* Tooltip Arrow */}
        <div className="
          absolute 
          top-full 
          left-1/2 
          -translate-x-1/2 
          border-4 
          border-transparent 
          border-t-gray-900
        "/>
      </div>
    </div>
  );
}

export default ExportButton;