import { Keyboard } from "react-native";
import { BaconServiceFactory } from "../api/services/ServiceFactory";
import { useAppContext } from "../contexts/AppContext";
import { BaconActorOption, BaconMovieOption } from "../types/api";

// TODO: this and app context really need to be refactored for performance

/**
 * @hook useGetData - get cast of movie and/or actors movies for the UI
 */
const useGetData = () => {
    const {
        setSquareState, getCastAndSetMovieInfo, setIsLoading, setCurrentCardCast,
        getMovies, setCurrentCardMovies, setCurrentActorName, setCurrentActorID,
        setSessionMap, sessionMap, setCurrentActorHref
    } = useAppContext();
    const actorService = BaconServiceFactory.createActorService();

    /** appends new session step to tree */
    const handleChangeMap = (id: number) => {
        const newSessionMap = [ ...sessionMap!, id ];
        setSessionMap!(newSessionMap);
    };

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
        getCastAndSetMovieInfo && getCastAndSetMovieInfo(movieTitle, changeMap).then((result) => {
            if (result) {
                setCurrentCardCast && setCurrentCardCast(result);
                setSquareState && setSquareState('movieCast');
                if (changeMap) handleChangeMap(result.id);
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
    const handleGetMoviesfromActorNode = async (id: number, actorName: string, changeMap: boolean) => {
        setIsLoading && setIsLoading(true);
        const result = await getMovies!(id, changeMap);
        if (result) {
            setCurrentCardMovies && setCurrentCardMovies(result);
            setSquareState && setSquareState('actorsMovies');
            setCurrentActorName && setCurrentActorName(actorName);
            setCurrentActorID && setCurrentActorID(id);
            const imgSrc = await actorService.getActorImageSrc(id);
            setCurrentActorHref && setCurrentActorHref(imgSrc || '');
            if (changeMap) handleChangeMap(id);
        }
        setIsLoading && setIsLoading(false);
    };

    const handleGetMoviesFromInput = (actorName: string, changeMap: boolean) => {
        Keyboard.dismiss();
        setIsLoading && setIsLoading(true);
        actorService.getActorFeaturesObject(actorName).then((resultObj) => {
            if (resultObj && resultObj.features && resultObj.id) {
                setCurrentCardMovies && setCurrentCardMovies(resultObj);
                setSquareState && setSquareState('actorsMovies');
                setCurrentActorName && setCurrentActorName(actorName);
                setCurrentActorID && setCurrentActorID(resultObj.id);
                if (changeMap) handleChangeMap(resultObj.id);
            }
        }).finally(() => {
            setIsLoading && setIsLoading(false);
        });
    };

    /** gets the suggestionList based on current value of searchInput in movieInput mode */
    async function getMovieSuggestions(prefix: string): Promise<BaconMovieOption[]> {
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

    /** gets the suggestionList based on current value of searchInput in actorInput mode */
    async function getActorSuggestions(prefix: string): Promise<BaconActorOption[]> {
        try {
            const actorService = BaconServiceFactory.createActorService();
            const suggestions = await actorService.getListOfActorsByPrefix(prefix);
            if (suggestions) return suggestions;
            return [];
        } catch (error) {
            console.log('---------------------------------');
            console.error(error);
            return [];
        }
    }

    return {
        handleGetCast,
        handleGetMoviesfromActorNode,
        getMovieSuggestions,
        getActorSuggestions,
        handleGetMoviesFromInput
    };

};

export default useGetData;