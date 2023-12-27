import { useAppContext } from "../contexts/AppContext";
import useGetData from "./useGetData";

/**
 * @hook useGoBack - handles the back button press that brings the user back to the previous screen
 * and sets the states of the appContext accordingly
 */
const useGoBack = () => {
    const {
        // setSquareState, setCurrentCardCast, setCurrentCardMovies, setCurrentMovieTitle, setCurrentActorName, 
        squareState,
        // currentCardCast, currentCardMovies,
        currentMovieTitle, currentActorID,
        currentActorName,
        // setCurrentMovieTitle,
    } = useAppContext();

    const { handleGetCast, handleGetMovies } = useGetData();

    /**
     * handles the back button press that brings the user back to the previous screen
     * and sets the states of the appContext accordingly
     */
    const handleGoBack = () => {
        switch (squareState) {
            case 'movieCast':
                // if (currentActorID && currentActorName) {
                handleGetMovies && handleGetMovies(currentActorID!, currentActorName!);
                // }
                break;
            case 'actorsMovies':
                // if (currentMovieTitle) {
                handleGetCast && handleGetCast(currentMovieTitle!, true);
                // }
                break;
            default:
                // do nothing if on the movieInput screen.. todo: maybe inactivate the button?
                break;
        }
    };

    return { handleGoBack };
}

export default useGoBack;