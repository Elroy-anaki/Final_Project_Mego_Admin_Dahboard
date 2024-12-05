import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const AuthContext = createContext()

function AuthProvider({ children }) {

    const [isAuth, setIsAuth] = useState(false);

    const isToken = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/employees/is-token-exist')
            setIsAuth(data.success)
            console.log("DDDDDD", data)
        } catch (error) {
            console.log("DDDD",error)
        }

    }

    const authGloblaState = {
        isAuth,
        setIsAuth
    }


    useEffect(() => {
        console.log("work on token")
        isToken()
    }, [])

    return (
        <AuthContext.Provider value={authGloblaState}>
            {children}
        </AuthContext.Provider >
    )


};
export default AuthProvider;