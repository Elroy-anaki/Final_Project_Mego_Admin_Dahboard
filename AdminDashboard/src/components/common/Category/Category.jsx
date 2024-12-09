import React from 'react'

function Category({ className, value }) {
    return (
        <div>
            <p className='text-sm px-2 py-1'>{value}</p>
        </div>
    )
}

export default Category
