import React from "react";
import { FaFileExcel } from "react-icons/fa";

function ExportButton({ download }) {

  return (
    <div className="tooltip" data-tip="Export To XL">
      <button
        onClick={download}
        type="button"
        className="text-gray-900 bg-white border
      border-gray-300 focus:outline-none hover:bg-green-100 focus:ring-4
       focus:ring-gray-100 font-medium rounded-lg text-sm px-3.5 py-2 me-2 mb-2
        dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-green-700
         dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        <FaFileExcel size={20} />
      </button>
    </div>
  );
}

export default ExportButton;
