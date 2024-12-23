import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import EmployeesTable from './EmployeesTable';
import { AddButton } from '../../common/Buttons/addButtons';
import Pagination from '../../common/Pagination/Pagination';
import axios from 'axios';
import SearchInput from '../../common/SearchInput/SearchInput';
import { EmployeeContext } from '../../../Contexts/EmployeeContext';
import { useSearch } from '../../../hooks/searchHook.jsx/useSearch';
import ExportButton from '../../common/Buttons/ExportButton';
import { downloadEmployees } from '../../../lib/exportXL/exportXL';
import { Plus, Users, Download, Search } from 'lucide-react';

const filterBtn = [
    { title: "Employee", value: "employee" },
    { title: "Admin", value: "admin" },
    { title: "All", value: "all" }
];

function EmployeesSection() {
    const { setEmployee } = useContext(EmployeeContext);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [premission, setPremission] = useState('all');
    const [suggestions, setSearchInput] = useSearch('employees');

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['getAllemployees', page, premission],
        queryFn: async () => {
            const { data } = await axios.get(`/employees/get-all-employees?page=${page}&search=${premission}&limit=${limit}`);
            return data;
        },
    });

    function handelFilter(pre) {
        setPremission(pre);
    }

    function showEmployeeFromSuggestion(item) {
        setEmployee(item);
        document.getElementById('addEmployeeModal').showModal();
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
                                <p className="text-sm text-gray-500">
                                    Manage your team members and their access levels
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => document.getElementById('addEmployeeModal').showModal()}
                            className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Employee
                        </button>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <SearchInput
                                    id={'searchEmployee'}
                                    searchValue={'Employee'}
                                    setSearchInput={setSearchInput}
                                    suggestions={suggestions}
                                    showFromSuggestion={showEmployeeFromSuggestion}
                                    keyName={'employeeName'}
                                />
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex gap-2">
                                {filterBtn.map((btn) => (
                                    <button
                                        key={btn.value}
                                        onClick={() => handelFilter(btn.value)}
                                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                                            premission === btn.value
                                                ? 'bg-gray-900 text-white shadow-md'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {btn.title}
                                    </button>
                                ))}
                            </div>
                            
                            <ExportButton 
                                download={() => downloadEmployees(premission, data?.count)}
                                className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors duration-200"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </ExportButton>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-[300px]">
                            <div className="relative">
                                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                                <div className="mt-4 text-sm text-gray-500 text-center">Loading...</div>
                            </div>
                        </div>
                    ) : isError ? (
                        <div className="flex justify-center items-center min-h-[300px]">
                            <div className="text-center">
                                <div className="text-red-500 text-lg font-medium mb-2">Error</div>
                                <div className="text-gray-500">{error?.message || 'An error occurred'}</div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <div className="inline-block min-w-full align-middle">
                                    {data && <EmployeesTable employees={data.data} />}
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-center">
                                <Pagination 
                                    CountOfItems={data?.count} 
                                    changeState={setPage} 
                                    page={page} 
                                    limit={limit}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EmployeesSection;