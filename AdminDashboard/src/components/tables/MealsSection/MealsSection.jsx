import React, { useContext, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '../../../hooks/searchHook.jsx/useSearch';
import axios from 'axios';

// Import Components + Context
import { MealContext } from '../../../Contexts/MealContext';
import MealTable from './MealTable';
import { AddButton } from '../../common/Buttons/addButtons'
import Pagination from '../../common/Pagination/Pagination';
import SearchInput from '../../common/SearchInput/SearchInput';
import ExportButton from '../../common/Buttons/ExportButton';
import { downloadMeals } from "../../../lib/exportXL/exportXL";
import FilterZone from '../../common/FilterZone/FilterZone';

function MealSection() {
  const [field, setField] = useState('mealName')
  const [sort, setSort] = useState('1')
  const { setMeal } = useContext(MealContext)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [category, setCategory] = useState('All')
  const [filterBtn, setFilterBtn] = useState([])
  const [suggestions, setSearchInput] = useSearch('meals');

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['getCategories'],
    queryFn: async () => {
      try {
        const { data } = await axios.get('/categories/get-all-categories')
        // setFilterBtn(data.data)
        return data
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        return { data: [] }
      }
    },
    retry: 2,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data && data.data) {
        setFilterBtn(data.data)
      }
    }
  })

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['getAllMeals', page, field, sort, category],
    queryFn: async () => {
      const { data } = await axios.get(`/meals/get-all-meals?page=${page}&search=${field}&category=${category}&sortBy=${sort}&limit=${limit}`)
      return data;
    },
    staleTime: 1000 * 6,
    retry: 2,
    refetchOnWindowFocus: false
  });

  // Effect to handle initial loading and updates
  useEffect(() => {
    if (categories?.data && !categoriesLoading) {
      setFilterBtn(categories.data)
    }
  }, [categories, categoriesLoading])

  function showMealFromSuggestion(item) {
    setMeal(item);
    document.getElementById('mealDetails').showModal();
  };

  function handelSort(field, sort) {
    setField(field)
    setSort(sort)
  }

  function handelCategory(category) {
    setCategory(category)
  }
  
  return (
    <div className='w-[75%] relative mt-10 '>
      <div>
        <h1 className='text-5xl text-slate-600 text-center mx-auto '>Meals</h1>
      </div>
      <div className='absolute top-[141.5px] right-0 flex justify-center items-center'>
        {(!categoriesLoading && filterBtn?.length > 0) && (
          <div className=''>
            <FilterZone 
              btnData={filterBtn} 
              fn={handelCategory} 
              select={true} 
            />
          </div>
        )}
        <button
          className='px-2 bg-green-700 hover:bg-green-600 py-2 text-white rounded-tr-lg font-semibold'
          onClick={() => document.getElementById('categoryModal').showModal()}>
          Add Category +
        </button>
      </div>

      <div className='mt-12'>
        <ExportButton download={() => downloadMeals(sort, field, data?.count)} />
        <div className='flex justify-between'>
          <div className='text-center flex justify-start items-center relative'>
            <div onClick={() => document.getElementById('mealModal').showModal()}>
              <AddButton text='Add Meal +' />
            </div>

            <div className='w-72'>
              <SearchInput
                id={'searchMeal'}
                searchValue={'Meal'}
                setSearchInput={setSearchInput}
                suggestions={suggestions}
                showFromSuggestion={showMealFromSuggestion}
                keyName={'mealName'}
              />
            </div>
          </div>
        </div>
        
        {isLoading && <span className="loading loading-infinity loading-xs text-sky-700"></span>}
        {isError && (
          <div className="text-red-500">
            {error?.response?.data?.message || error.message || "An error occurred"}
          </div>
        )}
      </div>

      <div className=''>
        {data && <MealTable meals={data.data} sortFn={handelSort} />}
      </div>
      <div className='flex justify-center'>
        <Pagination CountOfItems={data?.count} changeState={setPage} page={page} limit={limit} />
      </div>
    </div>
  )
}

export default MealSection