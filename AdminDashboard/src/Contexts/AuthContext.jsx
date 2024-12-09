import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const AuthContext = createContext()

function AuthProvider({ children }) {

    const [isAuth, setIsAuth] = useState(false);
    const [employee, setEmployee] = useState({})

    const isToken = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/auth/verify-token', { withCredentials: true })
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
            const response = await axios.get('http://localhost:3000/auth/log-Out',{ withCredentials: true });
    
            if (response.status === 200) {
              alert(`${employee.employeeName} logged out successfully!`  );
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
            {children}
        </AuthContext.Provider >
    )


};
export default AuthProvider;