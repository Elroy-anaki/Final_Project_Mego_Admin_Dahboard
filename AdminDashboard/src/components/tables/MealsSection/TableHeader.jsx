import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const TableHeader = ({ title, sort, field, needToSort  }) => {
  return (
    <th className="px-6 py-4 text-lg font-medium text-white text-center">
      <div className="flex justify-center items-center gap-2">
        {title}
        {needToSort && <div className="flex gap-1 " >
          <FaArrowUp
            size={15}
            className="cursor-pointer hover:text-gray-300 tooltip z-50"
            onClick={() => sort(field, '1')}
          />
          <FaArrowDown
            size={15}
            className="cursor-pointer hover:text-gray-300"
            onClick={() => sort(field, '-1')}
          />
        </div> }
        
      </div>
    </th>
  );
};

export default TableHeader;
