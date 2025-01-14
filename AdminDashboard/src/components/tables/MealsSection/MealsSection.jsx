// Import Hooks + Network utils
import React, { useContext, useState } from 'react'
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
import {downloadMeals} from "../../../lib/exportXL/exportXL";
import FilterZone from '../../common/FilterZone/FilterZone';

function MealSection() {

  const [field, setField] =  useState('mealName')
  const [sort, setSort] = useState('1') 

  const {setMeal} = useContext(MealContext)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [suggestions, setSearchInput] = useSearch('meals');

  
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['getAllMeals', page, field, sort],
    queryFn: async () => {
      const { data } = await axios.get(`/meals/get-all-meals?page=${page}&search=${field}&sortBy=${sort}&limit=${limit}`)
      return data;
    },
    staleTime: 1000 * 6,
    retry: 2,
    refetchOnWindowFocus: false
  });

  function showMealFromSuggestion(item){
      setMeal(item);
      document.getElementById('mealDetails').showModal();
  };

  function handelSort(field, sort){
    setField(field)
    setSort(sort)
  }

  return (
    <div className='w-[75%] relative mt-10 '>
      <div>
        <h1 className='text-5xl text-slate-600 text-center mx-auto '>Meals</h1>
      </div>
      <div className='mt-12'>
      <ExportButton download={() => downloadMeals(sort, field, data.count)} />
        <div className='flex justify-between'>

          <div
            className=' text-center flex justify-start items-center'>
            <div
              onClick={() => document.getElementById('mealModal').showModal()}
              className=''
            >
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

            <Pagination CountOfItems={data?.count} changeState={setPage} page={page} limit={limit} />
            <FilterZone />
          </div>
          


        </div>
        {isLoading && <span className="loading loading-infinity loading-xs text-sky-700"></span>}
        {isError && <div>{error}</div>}
      </div>

      <div className=''>
        {data && <MealTable meals={data.data} sortFn={handelSort} />} </div>

    </div>
  )
};

export default MealSection
