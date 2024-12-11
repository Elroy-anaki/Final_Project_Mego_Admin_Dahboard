import { createContext, useEffect, useState } from "react";


export const MealContext = createContext();

function MealProvider({children}) {

    const [meal, setMeal] = useState(null)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setMeal(null)
    }, []);
    
    useEffect(() => {
        console.log("useEffect", meal)
        setCategories(meal?.mealCategories || [])
    }, [meal])

    const mealGlobalState = {
        meal,
        categories,
        setMeal,
        setCategories
    }

    return (
        <MealContext.Provider value={mealGlobalState}>
            {children}
        </MealContext.Provider >
    )

}
export default MealProvider;

