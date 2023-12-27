import { Keyboard } from "react-native";

import { useAppContext } from "../contexts/AppContext";

/**
 * @hook useGetCast - get cast of movie for the UI
 */
const useGetCast = () => {
    const { setSquareState, getCast, setIsLoading, setCurrentCardCast } = useAppContext();  


    /** gets the cast from the searchInput */
    const handleGetCastForSearch = (movieInputTitle: string) => {
        console.log('handleGetCastForSearch', movieInputTitle);
        if (movieInputTitle.length < 1) return;
        Keyboard.dismiss();
        setIsLoading && setIsLoading(true);
        getCast && getCast(movieInputTitle).then((result) => {
            if (result) {
                setCurrentCardCast && setCurrentCardCast(result);
                setSquareState && setSquareState('movieCast');
            }
        }).finally(() => {
            setIsLoading && setIsLoading(false);
        });
    };


    return {
        handleGetCastForSearch
    };

};

export default useGetCast;