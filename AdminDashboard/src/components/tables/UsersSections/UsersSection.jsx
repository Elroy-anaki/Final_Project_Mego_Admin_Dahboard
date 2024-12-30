import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import UsersTable from './UsersTable';
// import { AddButton } from '../../common/Buttons/addButtons';
import Pagination from '../../common/Pagination/Pagination';
import axios from 'axios';
import SearchInput from '../../common/SearchInput/SearchInput';
import { UserContext } from '../../../Contexts/UserContext';
import { useSearch } from '../../../hooks/searchHook.jsx/useSearch';
import FilterZone from '../../common/FilterZone/FilterZone';
// import ExportButton from '../../common/Buttons/ExportButton';
// import { downloadEmployees } from '../../../lib/exportXL/exportXL'; 

const filterBtn = [
    {title: "User", value: "user"},
    {title: "Admin", value: "admin"},
    {title:"All", value: "all"}
]

function UsersSection() {
    const { setUser } = useContext(UserContext)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [premission, setPremission] = useState('all');
    const [suggestions, setSearchInput] = useSearch('users');



    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['getAllemployees', page, premission],
        queryFn: async () => {
            const { data } = await axios.get(`/users/get-all-users`);
            // const { data } = await axios.get(`/users/get-all-users?page=${page}&search=${premission}&limit=${limit}`);
            return data;
        },

    });

    function handelFilter(pre) {
        setPremission(pre)
    }

    function showUserFromSuggestion(item) {
        setUser(item);
        // document.getElementById('addEmployeeModal').showModal();
    }
    useEffect(() => {
        console.log(premission)
    }
        , [premission])

    return (
        <div className='w-[75%] relative mt-10'>
            <div>
                <h1 className='text-5xl text-slate-600 text-center mx-auto'>Users</h1>
            </div>
            <div className='mt-12'>
            {/* <ExportButton download={() => downloadEmployees(premission, data?.count)} /> */}
                <div className='flex justify-between'>
                        
                    <div
                        className=' text-center flex justify-start items-center'>
                        {/* <div
                            onClick={() => document.getElementById('addEmployeeModal').showModal()}
                            className=''
                        >
                            <AddButton text='Add User +' />
                        </div> */}

                        <div className='w-72'>
                            <SearchInput
                                id={'searchUser'}
                                searchValue={'User'}
                                setSearchInput={setSearchInput}
                                suggestions={suggestions}
                                showFromSuggestion={showUserFromSuggestion}
                                keyName={'userName'}
                            />
                        </div>

                        {/* <Pagination CountOfItems={data?.count} changeState={setPage} page={page} limit={limit} /> */}
                    </div>
                    <div>
                        {/* <FilterZone fn={handelFilter} btnData={filterBtn} /> */}
                    </div>

                </div>
                {isLoading && <span className="loading loading-infinity loading-xs text-sky-700"></span>}
                {isError && <div>{error.message}</div>}
            </div>
            <div className='z-10'>
                {data && <UsersTable users={data.data} />} </div>
        </div>
    )
}

export default UsersSection
