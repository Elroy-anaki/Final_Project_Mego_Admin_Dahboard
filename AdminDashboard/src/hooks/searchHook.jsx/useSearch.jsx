import { useEffect, useState } from "react";
import { debounce } from "../../lib/debounce/debounce";
import axios from "axios";


export const useSearch = (url) => {
    // States
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState(null);

    // Function
    async function getSuggestions(source) {
        try {
            const { data } = await axios.get(`/${url}/auto-complete?query=${searchInput}`, {
                cancelToken: source.token
            })
            setSuggestions(data.data)

        } catch (error) {
            console.log(error);
        }
    };
    
    // Effects
    useEffect(() => {
        const source = axios.CancelToken.source();
        console.log(suggestions);

        const proccesChange = debounce(() => getSuggestions(source));
        proccesChange();

        return () => {
            source.cancel("Token Canceled");
        }
    }, [searchInput]);

    return [suggestions,setSearchInput]
}
