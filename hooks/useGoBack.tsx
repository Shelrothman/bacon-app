import { BaconServiceFactory } from "../api/services/ServiceFactory";
import { useAppContext } from "../contexts/AppContext";
import useGetData from "./useGetData";

// TODO: THIS NEEDS TESTING ALL OVER for cases.

/**
 * @hook useGoBack - handles the back button press that brings the user back to the previous screen
 * and sets the states of the appContext accordingly
 */
const useGoBack = () => {
    const {
        setSquareState,
        squareState,
        sessionMap,
        setSessionMap
    } = useAppContext();

    const { handleGetCast, handleGetMovies } = useGetData();
    

    // TODO: break apart into smaller functions

    /**
     * handles the back button press that brings the user back to the previous screen
     * and sets the states of the appContext accordingly
     */
    const handleGoBack = async () => {
        // TODO: make the button inactive on the input screen
        if (!sessionMap) return;
        if (sessionMap.length === 1) {
            setSquareState && setSquareState('movieInput');
            return;
        }
        if (squareState === 'movieCast') {
            // setSquareState && setSquareState('movieInput');
            const secondToLastId = sessionMap[ sessionMap.length - 2 ];
            const actorService = BaconServiceFactory.createActorService({ actor_id: secondToLastId });
            const actorName = await actorService.getActorName();
            if (!actorName) {
                return alert(
                    `An unknown error occurred while attempting to get the last actors info, please try again. If this issue persists, please contact support, shel.programmer@gmail.com.`
                );
            }
            setSessionMap && setSessionMap(sessionMap.slice(0, sessionMap.length - 1)); // remove last item from sessionMap to stay in sync
            handleGetMovies && handleGetMovies(secondToLastId, actorName, false);
            return;
        } else { // else its actorsMovies
            const secondToLastId = sessionMap[ sessionMap.length - 2 ];
            const featureService = BaconServiceFactory.createFeatureService();
            const lastMovieTitle = await featureService.getFeatureName(secondToLastId);
            if (!lastMovieTitle) {
                return alert(
                    `An unknown error occurred while attempting to get the last movie info, please try again. If this issue persists, please contact support, shel.programmer@gmail.com.`
                );
            }
            setSessionMap && setSessionMap(sessionMap.slice(0, sessionMap.length - 1));
            handleGetCast && handleGetCast(lastMovieTitle, true, false);
            return;
        }
    };

    return { handleGoBack };
}

export default useGoBack;