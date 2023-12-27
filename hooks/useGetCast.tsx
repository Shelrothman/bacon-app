import { Keyboard } from "react-native";

import { useAppContext } from "../contexts/AppContext";

/**
 * @hook useGetData - get cast of movie and/or actors movies for the UI
 */
const useGetData = () => {
    const { setSquareState, getCast, setIsLoading, setCurrentCardCast, setCurrentMovieTitle } = useAppContext();

    /** 
     * gets the cast of the movie
     * either from search or from an actorNode press
     * @param {string} movieTitle - the movie title to get the cast for
     * @param {boolean} isActorNodePress - if the call is from an actorNode press
     */
    const handleGetCast = (movieTitle: string, isActorNodePress: boolean) => {
        if (movieTitle.length < 1) return;
        if (!isActorNodePress) Keyboard.dismiss(); // pickup: is this redundant?
        setIsLoading && setIsLoading(true);
        getCast && getCast(movieTitle).then((result) => {
            if (result) {
                setCurrentCardCast && setCurrentCardCast(result);
                setSquareState && setSquareState('movieCast');
                // only set the global title if it came from the actor node since that holds the official title from the db
                if (isActorNodePress) setCurrentMovieTitle && setCurrentMovieTitle(movieTitle);
            }
        }).finally(() => {
            setIsLoading && setIsLoading(false);
        });
    };

    return {
        handleGetCast
    };

};

export default useGetData;