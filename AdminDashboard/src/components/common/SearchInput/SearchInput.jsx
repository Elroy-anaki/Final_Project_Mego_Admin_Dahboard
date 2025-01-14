


import React, { useContext, useState } from 'react';
import { MealContext } from '../../../Contexts/MealContext';

function SearchInput({ id, searchValue, setSearchInput, suggestions = [], showFromSuggestion, keyName }) {

    const [inputValue, setInputValue] = useState("");

    return (
        <div className='relative'>
            <input
                onChange={(e) => {
                    const value = e.target.value;
                    setInputValue(value);
                    setSearchInput(value);
                }}
                value={inputValue}
                type="search"
                id={id}
                className="block  rounded-r-none w-full py-2.5 ps-10 text-sm text-white border bg-sky-700 border-none placeholder-white"
                placeholder={`Search ${searchValue}...`}
            />
            {inputValue && suggestions?.length > 0 && (
                <div className='absolute z-10 bg-white px-2 py-1 w-72'>
                    {suggestions.map((item, index) => (
                        <p
                            key={index}
                            onClick={() => {showFromSuggestion(item); console.log(item)}}
                        >
                            {item[keyName]}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchInput;

