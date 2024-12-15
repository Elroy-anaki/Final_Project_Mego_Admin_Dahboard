import React, { useContext } from 'react'
import { MealContext } from '../../../../Contexts/MealContext'
import { IoCloseCircle } from "react-icons/io5";


function MealDetailsModal() {
  const { meal } = useContext(MealContext)
  console.log(meal?.ingredients)

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" >open modal</button>
      <dialog id="mealDatails" className="modal w-[60%] rounded-2xl border-none">
        <div className="modal-box   max-w-5xl flex justify-end">
          <button
            onClick={() => { document.getElementById('mealDatails').close() }}><IoCloseCircle size={30} color='red' />
          </button>
        </div>
        <section class="py-2 bg-white antialiased w-11/12 mx-auto">
          <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div class="shrink-0 max-w-md lg:max-w-lg mx-auto ">
                <img class="w-96 h-96 rounded-full hidden dark:block" src={meal?.mealImage} alt={meal?.mealName} />
              </div>

              <div class="mt-6 sm:mt-8 lg:mt-0">
                <h1
                  class="text-4xl font-bold text-gray-900 "
                >
                  {meal?.mealName}
                </h1>
                <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p
                    class="text-2xl font-bold text-gray-900 "
                  >
                    {meal?.mealPrice}$
                  </p>

                  <div class="flex items-center gap-2 mt-2 sm:mt-0">

                    <p
                      class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                    >
                      Rating (5.0)
                    </p>
                    <a
                      href="#"
                      class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                    >
                      345 Reviews
                    </a>
                  </div>
                </div>

                <hr class="my-5 border-gray-200 dark:border-gray-800" />
                <p className="font-semibold text-xl text-gray-700 text-center">Ingredients:</p>

                <div className="flex flex-wrap items-center gap-2 p-4 mb-6 ">
                  {meal?.ingredients.map((ingredient, index) => (
                    <p
                      key={index}
                      className="inline-block bg-blue-200 text-blue-700 px-2 py-1 rounded-full shadow-sm text-sm">
                      {ingredient}
                    </p>
                  ))}
                </div>
                  <div className='bg-red-300 w-full h-48 text-center text-lg'>
                    Reviews
                  </div>

              </div>
            </div>
          </div>
        </section>
      </dialog>
    </div>
  )
}

export default MealDetailsModal
