import React from 'react';
import EmployeesTable from './EmployeesTable';
import { AddButton } from '../../common/Buttons/addButtons';




function EmployeesSection() {
    return (
        <div className='w-[75%]'>
            <div>
                <h1 className='text-5xl text-slate-600 text-center mx-auto mt-5'>Employees</h1>
            </div>
            <div className='mt-20'>
            <EmployeesTable />
            </div>
            <div className='mt-7'>
        <AddButton text='Add Employee +' />
      </div>
        </div>
    )
}

export default EmployeesSection
