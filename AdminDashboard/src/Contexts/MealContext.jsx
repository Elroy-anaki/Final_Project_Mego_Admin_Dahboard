import { createContext, useEffect, useState } from "react";


export const MealContext = createContext();

function MealProvider({children}) {

    const [meal, setMeal] = useState(null)

    useEffect(() => {
        setMeal(null)
    }, []);

    const mealGlobalState = {
        meal
    }

    return (
        <MealContext.Provider value={mealGlobalState}>
            {children}
        </MealContext.Provider >
    )

}
export default MealProvider;

