import { useContext, createContext, useState, useEffect } from 'react';
import { BaconMovie, BaconFeature, BaconActor, BaconFeatureList, BaconActorList } from '../types';
import { BaconServiceFactory } from '../api/services/ServiceFactory';

type ContextProps = {
    /** can be one of 3: movieInput, movieCast, actorsMovies */
    squareState: string;
    setSquareState: (squareState: string) => void;

    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    /** gets the cast of the user-entered movie */
    getCast: (movieName: string) => Promise<BaconActorList | void>;
    /** gets the movies of the user-selected actor */
    getMovies: (actorID: number) => Promise<BaconFeatureList | void>;
    /** cast of actors for the current movie */
    currentCardCast: BaconActorList | null;
    setCurrentCardCast: (baconActorList: BaconActorList) => void;
    /** movies of the current actor */
    currentCardMovies: BaconFeatureList | null;
    setCurrentCardMovies: (baconFeatures: BaconFeatureList) => void;
    /** current title requested by user */
    currentMovieTitle: string;
    setCurrentMovieTitle: (movieTitle: string) => void;

};

const AppContext = createContext<Partial<ContextProps>>({});

interface Props { children: React.ReactNode; }

export function useAppContext() {
    return useContext(AppContext);
}

/** Helpers */
const handleCaughtError = (error: Error, method: string) => {
    console.error(`Error in ${method} call`);
    console.log('---------------------------------');
    console.error(error);
    // TODO: a maybe more user-friendly error message.
    if (error.message) {
        return alert(error.message);
    }
    return alert('Internal Server Error, please try again later.');
};
async function getMovieID(movieName: string): Promise<BaconMovie | void> {
    try {
        const featureService = BaconServiceFactory.createFeatureService();
        const featureResult: BaconFeature = await featureService.getFeatureByTitle(movieName);
        if (!featureResult) return alert('Movie not found with provided title, please try again.');
        return featureResult;
    } catch (error) {
        handleCaughtError(error as Error, 'getMovieID');
    }
}


const AppProvider = (props: Props) => {
    const [ squareState, setSquareState ] = useState<string>('movieInput');
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const [ currentCardCast, setCurrentCardCast ] = useState<BaconActorList | null>(null);
    const [ currentCardMovies, setCurrentCardMovies ] = useState<BaconFeatureList | null>(null);
    const [ currentMovieTitle, setCurrentMovieTitle ] = useState<string>('');

    async function getCast(movieName: string): Promise<BaconActorList | void> {
        try {
            const feature_object = await getMovieID(movieName);
            const featureService = BaconServiceFactory.createFeatureService();
            if (!feature_object) return; // the alert is handled in getMovieID
            const featureCast = await featureService.getFeatureCastByMovieId(feature_object?.id);
            if (!featureCast) return alert('cannot find cast for the requested feature ID.');
            // then set the movie title
            setCurrentMovieTitle(feature_object.title);
            return {
                id: feature_object.id,
                actors: featureCast,
            };
        } catch (error) {
            handleCaughtError(error as Error, 'getCast');
        }
    }

    async function getMovies(actorID: number): Promise<BaconFeatureList | void> {
        try {
            const actorService = BaconServiceFactory.createActorService({ actor_id: actorID });
            const featureListResult = await actorService.getFeaturesForActor();
            if (!featureListResult) {
                return alert('cannot find any features for the requested actor ID.');
            }
            return {
                id: actorID,
                features: featureListResult,
            };
        } catch (error) {
            handleCaughtError(error as Error, 'getMovies');
        }
    }


    return (
        <AppContext.Provider value={{
            squareState,
            setSquareState,
            getCast,
            getMovies,
            isLoading,
            setIsLoading,
            currentCardCast,
            setCurrentCardCast,
            currentCardMovies,
            setCurrentCardMovies,
            currentMovieTitle,
            setCurrentMovieTitle,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };