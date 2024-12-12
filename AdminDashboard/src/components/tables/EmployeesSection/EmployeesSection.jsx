import React, { useContext } from 'react';
import EmployeesTable from './EmployeesTable';
import { AddButton } from '../../common/Buttons/addButtons';
import { EmployeeContext } from '../../../Contexts/EmployeeContext';




function EmployeesSection() {
    const {setEmployee} = useContext(EmployeeContext)
    return (
        <div className='w-[75%]'>
            <div>
                <h1 className='text-5xl text-slate-600 text-center mx-auto mt-5'>Employees</h1>
            </div>
            <div className='mt-20'>
            <EmployeesTable />
            </div>
            <div className='mt-7'>
        <AddButton text='Add Employee +' 
        functionHandler={() => {
            setEmployee(null)
            document.getElementById('addEmployeeModal').showModal()}}/>
        
      </div>
        </div>
    )
}

export default EmployeesSection
