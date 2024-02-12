import { Keyboard } from "react-native";
import { BaconServiceFactory } from "../api/services/ServiceFactory";
import { useAppContext } from "../contexts/AppContext";
import { BaconActorOption, BaconMovieOption } from "../types/api";
import { MovieTMDB } from "../types/tmdb";

const ERR_MSG_CAST = "An unknown error occurred while attempting to get the cast, please try again. If this issue persists, please contact support, shel.programmer@gmail.com."

/**
 * @hook useGetData - get cast of movie and/or actors movies for the UI
 */
const useGetData = () => {
    const {
        setSquareState, setIsLoading, setCurrentCardCast,
        // setCurrentCardMovies, setCurrentActorName, setCurrentActorID,
        setSessionMap, sessionMap, setCurrentActorHref, setMovieDataContext, setActorDataContext
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
            await handleSetMovieInfoAndGetCast(feature_object.id, changeMap, {
                overview: feature_object.overview,
                title: feature_object.title,
                release_date: feature_object.releaseDate
            } as MovieTMDB);
        } catch (error) {
            return alert(ERR_MSG_CAST);
        }
        setIsLoading && setIsLoading(false);
    }

    /** 
     * used for a suggestion node query and does the same logic as getting it with title 
     * @param {number} movieId - the movie id to get the cast for
     * @param {boolean} changeMap - if the call should change the sessionMap, TRUE BY DEFAULT
     * */
    const getCastAndSetMovieInfoWithId = async (movieId: number, changeMap: boolean = true) => {
        Keyboard.dismiss();
        setIsLoading && setIsLoading(true);
        try {
            const movieInfo = await featureService.getFeatureInfo(movieId);
            if (!movieInfo) return alert('No Movie found with provided title, please try again.');
            await handleSetMovieInfoAndGetCast(movieId, changeMap, movieInfo);
        } catch (error) {
            return alert(ERR_MSG_CAST);
        }
        setIsLoading && setIsLoading(false);
    }

    /**
     * common logic for getting the cast and setting the movie info
     * @param movieId - the id of the movie to get the cast for 
     * @param changeMap - if the call should change the sessionMap
     * @param movie - the movie object to set the movie info with
     */
    async function handleSetMovieInfoAndGetCast(movieId: number, changeMap: boolean, movie: MovieTMDB) {
        setMovieDataContext!({
            overview: movie.overview,
            title: movie.title,
            releaseDate: movie.release_date
        })
        const featureCast = await featureService.getFeatureCastByMovieId(movieId);
        if (featureCast) {
            setCurrentCardCast!({ id: movieId, actors: featureCast });
            setSquareState!('movieCast');
            if (changeMap) handleChangeMap(movieId);
        }
    }

    /**
     * gets all the movies an actor has been in
     * @param {number} id - the id of the actor to get the movies for
     * @param {string} actorName - the name of the actor to get the movies for
     * @param {boolean} changeMap - if the call should change the sessionMap
     */
    const handleGetMoviesfromActorNode = async (id: number, actorName: string, changeMap: boolean) => {
        setIsLoading && setIsLoading(true);
        const featureListResult = await actorService.getFeaturesByActorId(id);
        if (!featureListResult) {
            return alert('cannot find any features for the requested actor. Please try again.');
        }
        setActorDataContext!(featureListResult, id, actorName);
        const imgSrc = await actorService.getActorImageSrc(id);
        setCurrentActorHref && setCurrentActorHref(imgSrc || '');
        if (changeMap) handleChangeMap(id);
        setIsLoading && setIsLoading(false);
    };

    const handleGetMoviesFromInput = (actorName: string, changeMap: boolean) => {
        Keyboard.dismiss();
        setIsLoading && setIsLoading(true);
        actorService.getActorFeaturesObject(actorName).then((resultObj) => {
            if (resultObj && resultObj.features && resultObj.id) {
                setActorDataContext!(resultObj.features, resultObj.id, actorName);
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