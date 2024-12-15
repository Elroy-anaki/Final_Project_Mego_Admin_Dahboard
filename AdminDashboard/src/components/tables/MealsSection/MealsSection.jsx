import React, { useContext, useEffect, useState } from 'react'
import MealTable from './MealTable'
import { AddButton } from '../../common/Buttons/addButtons'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Pagination from '../../common/Pagination/Pagination';
import SearchInput from '../../common/SearchInput/SearchInput';
import { debounce } from '../../../lib/debounce/debounce'
import { MealContext } from '../../../Contexts/MealContext';



function MealSection() {

  const {setMeal} = useContext(MealContext)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState(null);


  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['getAllMeals', page],
    queryFn: async () => {
      const { data } = await axios.get(`/meals/get-all-meals?page=${page}&limit=${limit}`)
      return data;
    },
    staleTime: 1000 * 6
  });

  async function getSuggestions(source) {
    try {
      const { data } = await axios.get(`/meals/auto-complete?query=${searchInput}`, {
        cancelToken: source.token
      })
      setSuggestions(data.data)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    console.log(suggestions);
    
    const proccesChange = debounce(() => getSuggestions(source));
    proccesChange();

    return () => {
      source.cancel("Token Canceled");
    }
  }, [searchInput]);

  function showMealFromSuggestion(item){
      setMeal(item);
      document.getElementById('mealDatails').showModal();
  
  }


  return (
    <div className='w-[75%] relative mt-10 '>
      <div>
        <h1 className='text-5xl text-slate-600 text-center mx-auto '>Meals</h1>
      </div>
      <div className='mt-12'>

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
          </div>

        </div>
        {isLoading && <span className="loading loading-infinity loading-xs text-sky-700"></span>}
        {isError && <div>{error}</div>}
      </div>

      <div className=''>
        {data && <MealTable meals={data.data} />} </div>

    </div>
  )
};

export default MealSection
