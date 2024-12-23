import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ changeState, CountOfItems: countOfItems, page, limit }) {
    const pages = Math.ceil(countOfItems / limit);
    const numberOfbtns = [];
    
    for (let i = 1; i <= pages; i++) {
        numberOfbtns.push(i);
    }

    function handelPrevious() {
        changeState((previous) => previous === 1 ? previous : previous - 1);
    }

    function handelNext() {
        changeState((next) => next === pages ? next : next + 1);
    }

    return (
        <div className="flex justify-center items-center gap-2">
            <button
                onClick={handelPrevious}
                disabled={page === 1}
                className={`
                    inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg
                    transition-all duration-200
                    ${page === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 border border-gray-200'
                    }
                `}
            >
                <ChevronLeft className="w-4 h-4" />
                Previous
            </button>

            <div className="flex items-center gap-1">
                {numberOfbtns.map((btn) => (
                    <button
                        key={btn}
                        onClick={() => changeState(btn)}
                        className={`
                            w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium
                            transition-all duration-200
                            ${page === btn 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 border border-gray-200'
                            }
                        `}
                    >
                        {btn}
                    </button>
                ))}
            </div>

            <button
                onClick={handelNext}
                disabled={page === pages}
                className={`
                    inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg
                    transition-all duration-200
                    ${page === pages 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 border border-gray-200'
                    }
                `}
            >
                Next
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}

export default Pagination;