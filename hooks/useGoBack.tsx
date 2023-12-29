import { BaconServiceFactory } from "../api/services/ServiceFactory";
import { useAppContext } from "../contexts/AppContext";
import useGetData from "./useGetData";

const PERSISTANCE_MSG = 'If this issue persists, please contact support, shel.programmer@gmail.com.';

/**
 * @hook useGoBack - handles the back button press that brings the user back to the previous screen
 * and sets the states of the appContext accordingly
 */
const useGoBack = () => {
    const { setIsLoading, setSquareState, squareState, sessionMap, setSessionMap } = useAppContext();

    const { handleGetCast, handleGetMovies } = useGetData();

    // TODO: break apart into smaller functions

    /** takes user back to the actorsMovies of the actor-id of the sessionStep before the step where goBack is called from  */
    const handleGoBackFromMovieCast = async (sessionMap: number[]) => {
        const secondToLastId = sessionMap[ sessionMap.length - 2 ];
        const actorService = BaconServiceFactory.createActorService({ actor_id: secondToLastId });
        const actorName = await actorService.getActorName();
        if (!actorName) {
            return alert(
                `An unknown error occurred while attempting to get the last actors info, please try again. ${PERSISTANCE_MSG}`
            );
        }
        setSessionMap && setSessionMap(sessionMap.slice(0, sessionMap.length - 1)); // remove last item from sessionMap to stay in sync
        handleGetMovies && handleGetMovies(secondToLastId, actorName, false);
    };

    /** takes user back to the movieCast of the movie-id of the sessionStep before the step where goBack is called from  */
    const handleGoBackFromActorsMovies = async (sessionMap: number[]) => {
        const secondToLastId = sessionMap[ sessionMap.length - 2 ];
        const featureService = BaconServiceFactory.createFeatureService();
        const lastMovieTitle = await featureService.getFeatureName(secondToLastId);
        if (!lastMovieTitle) {
            return alert(
                `An unknown error occurred while attempting to get the last movie info, please try again. ${PERSISTANCE_MSG}`
            );
        }
        setSessionMap && setSessionMap(sessionMap.slice(0, sessionMap.length - 1));
        handleGetCast && handleGetCast(lastMovieTitle, true, false);
    };

    /** takes user back to the movieInput screen when they are on their first step */
    const handleLastGoBack = async () => {
        setSquareState && setSquareState('movieInput');
        setSessionMap && setSessionMap([]);
    };

    /**
     * handles the back button press that brings the user back to the previous screen
     * and sets the states of the appContext accordingly
     */
    const handleGoBack = async () => {
        try {
            if (!sessionMap) return;
            if (sessionMap.length === 1) return handleLastGoBack;
            setIsLoading && setIsLoading(true);
            if (squareState === 'movieCast') return handleGoBackFromMovieCast(sessionMap);
            else return handleGoBackFromActorsMovies(sessionMap);
        } catch (error) {
            setIsLoading && setIsLoading(false);
            return alert(
                `An unknown error occurred while attempting to go back, please try again. ${PERSISTANCE_MSG}`
            );
        }
    };

    return { handleGoBack };
}

export default useGoBack;