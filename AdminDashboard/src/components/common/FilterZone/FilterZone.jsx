import React, { useState } from 'react'


function FilterZone({ fn, btnData }) {
    
    return (
        <div className='bg-sky-700 h-10 rounded-t-lg flex'>

        <div className='flex justify-center items-center text-white'>
            {btnData.map((btn) => (<button
                onClick={() => { fn(btn.value) }} 
                className='px-3 py-1 w-full h-full bg-transparent  rounded-md hover:bg-sky-600'>{btn.title}</button>))}
        </div>
        </div>

    )
}

export default FilterZone
