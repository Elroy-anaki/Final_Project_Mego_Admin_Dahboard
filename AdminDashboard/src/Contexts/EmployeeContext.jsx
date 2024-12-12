import { createContext, useState, useEffect } from "react";


export const EmployeeContext = createContext();

function EmployeeProvider ({children}){
    const [employee, setEmployee] = useState(null)

    useEffect(() => {
        setEmployee(null)
    }, []);
    useEffect(() => {
        console.log(employee)
    }, 
    [employee])


    const employeeGloblaState = {
        employee,
        setEmployee
    }

    return (
        <EmployeeContext.Provider value={employeeGloblaState}>
            {children}
        </EmployeeContext.Provider >
    )
}



export default EmployeeProvider;