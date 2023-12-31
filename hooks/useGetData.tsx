import { Keyboard } from "react-native";

import { BaconServiceFactory } from "../api/services/ServiceFactory";
import { useAppContext } from "../contexts/AppContext";
import { BaconMovieOption } from "../types";

/**
 * @hook useGetData - get cast of movie and/or actors movies for the UI
 */
const useGetData = () => {
    const {
        setSquareState, getCastAndSetMovieInfo: getCastAndSetTitle, setIsLoading, setCurrentCardCast,
        getMovies, setCurrentCardMovies, setCurrentActorName, setCurrentActorID
    } = useAppContext();

    /** 
     * gets the cast of the movie
     * either from search or from an actorNode press
     * @param {string} movieTitle - the movie title to get the cast for
     * @param {boolean} isActorNodePress - if the call is from an actorNode press
     * @param {boolean} changeMap - if the call should change the sessionMap
     */
    const handleGetCast = (movieTitle: string, isActorNodePress: boolean, changeMap: boolean) => {
        if (movieTitle.length < 1) return;
        if (!isActorNodePress) Keyboard.dismiss(); // pickup: is this redundant?
        setIsLoading && setIsLoading(true);
        getCastAndSetTitle && getCastAndSetTitle(movieTitle, changeMap).then((result) => {
            if (result) {
                setCurrentCardCast && setCurrentCardCast(result);
                setSquareState && setSquareState('movieCast');
            }
        }).finally(() => {
            setIsLoading && setIsLoading(false);
        });
    };

    /**
     * gets all the movies an actor has been in
     * @param {number} id - the id of the actor to get the movies for
     * @param {string} actorName - the name of the actor to get the movies for
     * @param {boolean} changeMap - if the call should change the sessionMap
     */
    const handleGetMovies = (id: number, actorName: string, changeMap: boolean) => {
        setIsLoading && setIsLoading(true);
        getMovies && getMovies(id, changeMap).then((result) => {
            if (result) {
                setCurrentCardMovies && setCurrentCardMovies(result);
                setSquareState && setSquareState('actorsMovies');
                setCurrentActorName && setCurrentActorName(actorName);
                setCurrentActorID && setCurrentActorID(id);
            }
        }).finally(() => {
            setIsLoading && setIsLoading(false);
        });
    };


    /** gets the suggestionList based on current value of searchInput */
    async function getSuggestions(prefix: string): Promise<BaconMovieOption[]> {
        try {
            const featureService = BaconServiceFactory.createFeatureService();
            const suggestions = await featureService.getListOfFeaturesByPrefix(prefix);
            if (suggestions) return suggestions;
            return [];
        } catch (error) {
            console.log('---------------------------------');
            console.error(error);
            return [];
        }
    }

    return { handleGetCast, handleGetMovies, getSuggestions };

};

export default useGetData;