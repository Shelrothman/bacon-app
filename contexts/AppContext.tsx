import { createContext, useContext, useState } from 'react';

import * as mockedCast from '../api/mocked/mockedCast.json';
import * as mockedFeatures from '../api/mocked/mockedFeatures.json';
import { BaconServiceFactory } from '../api/services/ServiceFactory';
import { BaconActorList, BaconFeature, BaconFeatureList, BaconMovie, BaconMovieOption } from '../types';


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
    /** current actor selected by user onPress */
    currentActorName: string;
    setCurrentActorName: (actorName: string) => void;
    /** gets the suggestionList based on current value of searchInput */
    getSuggestions: (prefix: string) => Promise<BaconMovieOption[]>;
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
    const [ currentActorName, setCurrentActorName ] = useState<string>('');


    async function getCast(movieName: string): Promise<BaconActorList | void> {
        try {
            // PICKUP: delete this before shipped.. 
            // just need it so don't use too much API calls while developing.
            if (process.env.EXPO_PUBLIC_MOCK_MODE === 'true') {
                console.log('MOCK MODE ON, returning fake data...');
                console.log('---------------------------------');
                // setTimeout(() => {
                    return {
                        id: 12345,
                        actors: mockedCast.cast,
                    }
                // }, 5000);
            }
            const feature_object = await getMovieID(movieName);
            const featureService = BaconServiceFactory.createFeatureService();
            if (!feature_object) {
                return alert('No Movie found with provided title, please try again.');
            }
            const featureCast = await featureService.getFeatureCastByMovieId(feature_object?.id);
            if (!featureCast) {
                return alert('cannot find cast for the requested feature ID.');
            }
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
            // PICKUP: delete this before shipped.. 
            // just need it so don't use too much API calls while developing.
            if (process.env.EXPO_PUBLIC_MOCK_MODE === 'true') {
                console.log('MOCK MODE ON, returning fake data...');
                console.log('---------------------------------');
                // setTimeout(() => {
                return {
                    id: 12345,
                    features: mockedFeatures.features,
                }
                // }, 5000);
            }
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

    async function getSuggestions(prefix: string): Promise<BaconMovieOption[]> {
        try {
            const featureService = BaconServiceFactory.createFeatureService();
            const suggestions = await featureService.getListOfFeaturesByPrefix(prefix);
            if (suggestions) {
                return suggestions;
            }
            return [];
        } catch (error) {
            // handleCaughtError(error as Error, 'getSuggestions');
            console.log('---------------------------------');
            console.error(error);
            return [];
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
            currentActorName,
            setCurrentActorName,
            getSuggestions
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };