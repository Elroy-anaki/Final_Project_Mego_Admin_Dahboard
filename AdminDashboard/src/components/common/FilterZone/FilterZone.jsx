import React, { useState } from 'react'


function FilterZone({ fn, btnData, select = false }) {
    
    return (
        <div>
        {!select ?<div className='bg-sky-700 h-10 rounded-t-lg flex'>

            <div className='flex justify-center items-center text-white'>
                {btnData.map((btn) => (<button
                    onClick={() => { fn(btn.value) }} 
                    className='px-1 py-1 w-full h-full bg-transparent  rounded-md hover:bg-sky-600'>{btn.title}</button>))}
            </div>
            </div> 
            : <select className='bg-sky-600 h-10 rounded-tl-lg text-white text-center' onChange={(e) => { fn(e.target.value) }}>
                <option value="" className='text-white'>Choose Category</option>
                <option value="All" className='text-white'>All</option>
                {btnData.map((btn) => (<option value={btn._id} className='text-black bg-white'>{btn.categoryName}</option>))}
            </select> 
            }
            </div>

    )
}

export default FilterZone
