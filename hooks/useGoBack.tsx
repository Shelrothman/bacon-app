import { BaconServiceFactory } from "../api/services/ServiceFactory";
import { useAppContext } from "../contexts/AppContext";
import useGetData from "./useGetData";

const PERSISTANCE_MSG = 'If this issue persists, please contact support, shel.programmer@gmail.com.';


/**
 * @hook useGoBack - handles the back button press that brings the user back to the previous screen
 * and sets the states of the appContext accordingly
 */
const useGoBack = () => {

    const { setSquareState, squareState, sessionMap, setSessionMap, setInputTitle } = useAppContext();
    const { handleGetMoviesfromActorNode, getCastAndSetMovieInfoWithId } = useGetData();

    /** takes user back to the movieInput screen when they are on their first step */
    const handleLastGoBack = () => {
        setSessionMap && setSessionMap([]);
        if (squareState === 'actorsMovies') return setSquareState!('actorInput');
        return setSquareState!('movieInput');
    };
    /** takes user back to the actorsMovies of the actor-id of the sessionStep before the step where goBack is called from  */
    const handleGoBackFromMovieCast = async (sessionMap: number[]) => {
        const secondToLastId = sessionMap[ sessionMap.length - 2 ];
        const actorService = BaconServiceFactory.createActorService();
        const actorName = await actorService.getActorName(secondToLastId);
        if (!actorName) {
            return alert(`An unknown error occurred while attempting to get the last actors info, please try again. ${PERSISTANCE_MSG}`);
        }
        setSessionMap && setSessionMap(sessionMap.slice(0, sessionMap.length - 1)); // remove last item from sessionMap to stay in sync
        handleGetMoviesfromActorNode && handleGetMoviesfromActorNode(secondToLastId, actorName, false);
    };
    /** takes user back to the movieCast of the movie-id of the sessionStep before the step where goBack is called from  */
    const handleGoBackFromActorsMovies = async (sessionMap: number[]) => {
        const secondToLastId = sessionMap[ sessionMap.length - 2 ];
        setSessionMap && setSessionMap(sessionMap.slice(0, sessionMap.length - 1));
        return getCastAndSetMovieInfoWithId(secondToLastId, false);

    };
    /**
     * handles the back button press that brings the user back to the previous screen
     * and sets the states of the appContext accordingly
     */
    const handleGoBack = async () => {
        try {
            if (!sessionMap) return;
            if (sessionMap.length === 1) return handleLastGoBack();
            // setIsLoading && setIsLoading(true);
            if (squareState === 'movieCast') return handleGoBackFromMovieCast(sessionMap);
            else return handleGoBackFromActorsMovies(sessionMap);
        } catch (error) {
            // setIsLoading && setIsLoading(false);
            return alert(`An unknown error occurred while attempting to go back from ${squareState}, please try again. ${PERSISTANCE_MSG}`);
        }
    };
    /** resets the app to its initial state */
    const handleReset = () => {
        setInputTitle!('');
        setSessionMap!([]);
        setSquareState!('movieInput');
    }

    return { handleGoBack, handleReset };
}

export default useGoBack;