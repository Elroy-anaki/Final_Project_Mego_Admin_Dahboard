import React from 'react'

function Pagination({changeState, CountOfItems: countOfItems, page, limit}) {

    const pages = Math.ceil(countOfItems / limit)
    const numberOfbtns = []

    {for(let i = 1 ; i <= pages; i++) {numberOfbtns.push(i)}}
    console.log("NUMBER OF PAGES", numberOfbtns)



    function handelPrevious() {
        changeState((previous) => previous === 1 ? previous :previous - 1);
    };

    function handelNext() {
      changeState((next) => next === pages ? next : next + 1);
  }

  return (
    <div
    className='mt-2'>
    <nav >
  <ul className="inline-flex -space-x-px text-sm h-10  ">
    <li
        onClick={handelPrevious}>
      <button 
      disabled={page === 1} 
      className="rounded-l-lg  cursor-pointer flex items-center justify-center p-6 h-full  ms-0 leading-tight text-white bg-sky-800 font-semibold text-base  ">Previous</button>
    </li>
      {numberOfbtns.map((btn) => (<li
    onClick={() => changeState(btn)}>
      <div  className={`cursor-pointer flex items-center justify-center p-6 h-full leading-tight text-sky-500 bg-white  hover:bg-sky-100 hover:text-sky-700  ${page === btn ? 'dark:bg-sky-700': 'dark:bg-sky-800'}  dark:text-white dark:hover:bg-sky-700 dark:hover:text-white`}>{btn}</div>
    </li>))}
    <li
        onClick={handelNext}>
      <button 
      disabled={page === pages} 
      className="cursor-pointer flex items-center justify-center p-6 h-full leading-tight text-base   rounded-r-lg rounded-l-none bg-sky-800 text-white font-semibold">Next</button>
    </li>
  </ul>
</nav>
</div>
  )
}

export default Pagination
