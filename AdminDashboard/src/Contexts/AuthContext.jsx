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
            setEmployee(data.data.employee)
            console.log("Data", data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        console.log("work on token")
        isToken()
        
    }, [])
    
    const authGloblaState = {
        isAuth,
        employee,
        setIsAuth,
    };
    return (
        <AuthContext.Provider value={authGloblaState}>
            {children}
        </AuthContext.Provider >
    )


};
export default AuthProvider;