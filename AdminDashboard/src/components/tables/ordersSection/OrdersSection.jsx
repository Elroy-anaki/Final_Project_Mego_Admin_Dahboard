import React, { useState } from 'react'
import TablesOrdersTable from './TablesOrders/TablesOrdersTable'

function OrdersSections() {

  const [showTables, setShowTables] = useState(true)

  return (
    <div className='w-[75%] relative mt-10'>
      <div className='text-5xl text-center mb-10'>
        Orders

      </div>
      <div className='flex justify-center items-center w-1/2 mx-auto text-center'>
        <div 
        onClick={() => setShowTables(true)}
        className='px-10 py-5 bg-sky-800 hover:bg-sky-700 cursor-pointer w-52 text-white text-xl rounded-l-lg'>Tables</div>
        <div 
        onClick={() => setShowTables(false)}
        className='px-10 py-5 bg-sky-800 hover:bg-sky-700 cursor-pointer w-52 text-white text-xl rounded-r-lg'>Take Away</div>
      </div>
      <div className='mt-5'>
        {showTables ? <TablesOrdersTable /> : 'take'}
      </div>
    </div>
  )
}

export default OrdersSections
