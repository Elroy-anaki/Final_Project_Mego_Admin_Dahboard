import { createContext, useEffect, useState } from "react";


export const MealContext = createContext();

function MealProvider({children}) {

    const [meal, setMeal] = useState(null)

    useEffect(() => {
        setMeal(null)
    }, []);
    
    useEffect(() => {
        console.log("useEffect", meal)
    }, [meal])

    const mealGlobalState = {
        meal,
        setMeal
    }

    return (
        <MealContext.Provider value={mealGlobalState}>
            {children}
        </MealContext.Provider >
    )

}
export default MealProvider;

