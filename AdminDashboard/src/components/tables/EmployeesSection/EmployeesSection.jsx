import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import EmployeesTable from './EmployeesTable';
import { AddButton } from '../../common/Buttons/addButtons';
import Pagination from '../../common/Pagination/Pagination';
import axios from 'axios';
import SearchInput from '../../common/SearchInput/SearchInput';
import { debounce } from '../../../lib/debounce/debounce';
import { EmployeeContext } from '../../../Contexts/EmployeeContext';
import { useSearch } from '../../../hooks/searchHook.jsx/useSearch';



function EmployeesSection() {
    const {setEmployee} = useContext(EmployeeContext)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [suggestions, setSearchInput] = useSearch('employees');



    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['getAllemployees', page],
        queryFn: async () => {
            const { data } = await axios.get(`/employees/get-all-employees?page=${page}&limit=${limit}`);
            console.log("DATADATADATA:", data)
            return data;
        },

    });
      
   

    function showEmployeeFromSuggestion(item) {
        setEmployee(item);
        document.getElementById('addEmployeeModal').showModal();

    }
    return (
        <div className='w-[75%] relative mt-10'>
            <div>
                <h1 className='text-5xl text-slate-600 text-center mx-auto'>Employees</h1>
            </div>
            <div className='mt-12'>

                <div className='flex justify-between'>

                    <div
                        className=' text-center flex justify-start items-center'>
                        <div
                            onClick={() => document.getElementById('addEmployeeModal').showModal()}
                            className=''
                        >
                            <AddButton text='Add Meal +' />
                        </div>

                        <div className='w-72'>
                            <SearchInput
                                id={'searchEmployee'}
                                searchValue={'Employee'}
                                setSearchInput={setSearchInput}
                                suggestions={suggestions}
                                showFromSuggestion={showEmployeeFromSuggestion}
                                keyName={'employeeName'}
                            />
                        </div>

                        <Pagination CountOfItems={data?.count} changeState={setPage} page={page} limit={limit} />
                    </div>

                </div>
                {isLoading && <span className="loading loading-infinity loading-xs text-sky-700"></span>}
                {isError && <div>{error}</div>}
            </div>
            <div className=''>
                {data && <EmployeesTable employees={data.data} />} </div>
        </div>
    )
}

export default EmployeesSection
