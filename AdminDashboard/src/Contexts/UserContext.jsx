import { createContext, useState, useEffect } from "react";


export const UserContext = createContext();

function UserProvider ({children}){
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(null)
    }, []);
    useEffect(() => {
        console.log(user)
    }, 
    [user])


    const userGloblaState = {
        user,
        setUser
    }

    return (
        <UserContext.Provider value={userGloblaState}>
            {children}
        </UserContext.Provider >
    )
}



export default UserProvider;