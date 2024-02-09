import { Keyboard } from "react-native";
import { BaconServiceFactory } from "../api/services/ServiceFactory";
import { useAppContext } from "../contexts/AppContext";
import { BaconActorOption, BaconMovieOption } from "../types/api";

// TODO: this and app context really need to be refactored for performance
const ERR_MSG_CAST = "An unknown error occurred while attempting to get the cast, please try again. If this issue persists, please contact support, shel.programmer@gmail.com."

/**
 * @hook useGetData - get cast of movie and/or actors movies for the UI
 */
const useGetData = () => {
    const {
        setSquareState, setIsLoading, setCurrentCardCast,
        getMovies, setCurrentCardMovies, setCurrentActorName, setCurrentActorID,
        setSessionMap, sessionMap, setCurrentActorHref, setMovieInfo
    } = useAppContext();
    const actorService = BaconServiceFactory.createActorService();
    const featureService = BaconServiceFactory.createFeatureService();

    /** appends new session step to tree */
    const handleChangeMap = (id: number) => {
        const newSessionMap = [ ...sessionMap!, id ];
        setSessionMap!(newSessionMap);
    };

    /** 
     * gets the cast of the movie
     * either from search or from an actorNode press
     * @param {string} movieTitle - the movie title to get the cast for
     * @param {boolean} changeMap - if the call should change the sessionMap
     */
    const handleGetCastAndSetMovieInfoWithTitle = async (movieTitle: string, changeMap: boolean) => {
        if (movieTitle.length < 1) return;
        Keyboard.dismiss();
        setIsLoading && setIsLoading(true);
        try {
            const feature_object = await featureService.getFeatureByTitle(movieTitle);
            if (!feature_object) return alert('No Movie found with provided title, please try again.');
            setMovieInfo!({
                overview: feature_object.overview,
                title: feature_object.title,
                releaseDate: feature_object.releaseDate
            })
            const featureCast = await featureService.getFeatureCastByMovieId(feature_object.id);
            if (featureCast) {
                setCurrentCardCast!({ id: feature_object.id, actors: featureCast });
                setSquareState!('movieCast');
                if (changeMap) handleChangeMap(feature_object.id);
            }
        } catch (error) {
            return alert(ERR_MSG_CAST);
        }
        setIsLoading && setIsLoading(false);
    }

    /** used for a suggestion node query and does the same logic as getting it with title */
    const getCastAndSetMovieInfoWithId = async (movieId: number) => {
        Keyboard.dismiss();
        setIsLoading && setIsLoading(true);
        try {
            const movieInfo = await featureService.getFeatureInfo(movieId);
            if (!movieInfo) return alert('No Movie found with provided title, please try again.');
            setMovieInfo!({
                overview: movieInfo.overview,
                title: movieInfo.title || movieInfo.original_title,
                releaseDate: movieInfo.release_date
            })
            const featureCast = await featureService.getFeatureCastByMovieId(movieId);
            if (featureCast) {
                setCurrentCardCast!({ id: movieId, actors: featureCast });
                setSquareState!('movieCast');
                handleChangeMap(movieId);
            }
        } catch (error) {
            return alert(ERR_MSG_CAST);
        }
        setIsLoading && setIsLoading(false);
    }

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
        handleGetCastAndSetMovieInfoWithTitle,
        getCastAndSetMovieInfoWithId,
        handleGetMoviesfromActorNode,
        getMovieSuggestions,
        getActorSuggestions,
        handleGetMoviesFromInput
    };

};

export default useGetData;