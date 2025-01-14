import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import EmployeesTable from './EmployeesTable';
import { AddButton } from '../../common/Buttons/addButtons';
import Pagination from '../../common/Pagination/Pagination';
import axios from 'axios';
import SearchInput from '../../common/SearchInput/SearchInput';
import { EmployeeContext } from '../../../Contexts/EmployeeContext';
import { useSearch } from '../../../hooks/searchHook.jsx/useSearch';
import FilterZone from '../../common/FilterZone/FilterZone';
import ExportButton from '../../common/Buttons/ExportButton';
import { downloadEmployees } from '../../../lib/exportXL/exportXL'; 

const filterBtn = [
    {title: "Employee", value: "employee"},
    {title: "Admin", value: "admin"},
    {title:"All", value: "all"}
]

function EmployeesSection() {
    const { setEmployee } = useContext(EmployeeContext)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [premission, setPremission] = useState('all')
    const [suggestions, setSearchInput] = useSearch('employees');



    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['getAllemployees', page, premission],
        queryFn: async () => {
            const { data } = await axios.get(`/employees/get-all-employees?page=${page}&search=${premission}&limit=${limit}`);
            return data;
        },

    });

    function handelFilter(pre) {
        setPremission(pre)
    }

    function showEmployeeFromSuggestion(item) {
        setEmployee(item);
        document.getElementById('addEmployeeModal').showModal();
    }
    useEffect(() => {
        console.log(premission)
    }
        , [premission])

    return (
        <div className='w-[75%] relative mt-10'>
            <div>
                <h1 className='text-5xl text-slate-600 text-center mx-auto'>Employees</h1>
            </div>
            <div className='mt-12'>
            <ExportButton download={() => downloadEmployees(premission, data?.count)} />
                <div className='flex justify-between'>
                        
                    <div
                        className=' text-center flex justify-start items-center'>
                        <div
                            onClick={() => {
                                setEmployee(null)
                                document.getElementById('addEmployeeModal').showModal()}}
                            className=''
                        >
                            <AddButton text='Add Employee +' />
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
                    <div>
                        <FilterZone fn={handelFilter} btnData={filterBtn} />
                    </div>

                </div>
                {isLoading && <span className="loading loading-infinity loading-xs text-sky-700"></span>}
                {isError && <div>{error}</div>}
            </div>
            <div className='z-10'>
                {data && <EmployeesTable employees={data.data} />} </div>
        </div>
    )
}

export default EmployeesSection
