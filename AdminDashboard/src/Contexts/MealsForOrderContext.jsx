import { createContext, useEffect, useState } from "react";

export const MealsForOrderContext = createContext();

function MealsForOrderProvider({ children }) {
    const [mealsForOrder, setMealsForOrder] = useState()


    const mealsForOrderGlobalState = {
        mealsForOrder,
        setMealsForOrder
    }

    useEffect(() => {
        console.log(mealsForOrder)
    }, [mealsForOrder])

    return (
        <MealsForOrderContext.Provider value={mealsForOrderGlobalState}>
            {children}
        </MealsForOrderContext.Provider>
    )

}

export default MealsForOrderProvider