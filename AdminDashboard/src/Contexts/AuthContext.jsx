import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { notifySuccess } from "../lib/Toasts/Toasts";
import MealProvider from "./MealContext";
import EmployeeProvider from "./EmployeeContext";
import MealsForOrderProvider from "./MealsForOrderContext";


export const AuthContext = createContext()

function AuthProvider({ children }) {

    const [isAuth, setIsAuth] = useState(false);
    const [employee, setEmployee] = useState({})

    const isToken = async () => {
        try {
            const { data } = await axios.get('/auth/verify-token')
            setIsAuth(data.success)
            setEmployee(data.data.data)
            console.log("Data", data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        console.log("work on token")
        isToken()
        
    }, [])

    const singOut = async () => {
        try {
            alert("Log out")
            const response = await axios.get('http://localhost:3000/auth/sign-out',{ withCredentials: true });
            console.log(response)
    
            if (response.status === 200) {
              notifySuccess(`${employee.employeeName} logged out successfully!`  );
              setIsAuth(false);
              setEmployee({});
            } else {
              alert("Failed to log out.");
            }
          } catch (error) {
            console.error("Error during log out:", error);
            alert("An error occurred.");
          }
}
    
    const authGloblaState = {
        isAuth,
        employee,
        setIsAuth,
        setEmployee,
        singOut
        
    };
    return (
        <AuthContext.Provider value={authGloblaState}>
            <MealProvider>
              <EmployeeProvider>
                <MealsForOrderProvider>
            {children}
            </MealsForOrderProvider>
               </EmployeeProvider>
            </MealProvider>
        </AuthContext.Provider >
    )


};
export default AuthProvider;