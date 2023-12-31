import { createContext, useContext, useState } from 'react';

// import * as mockedCast from '../api/mocked/mockedCast.json';
// import * as mockedFeatures from '../api/mocked/mockedFeatures.json';
import { BaconServiceFactory } from '../api/services/ServiceFactory';
import { BaconActorList, BaconFeatureList, BaconSquareState } from '../types';

type ContextProps = {
    /** can be one of 3: movieInput, movieCast, actorsMovies */
    squareState: BaconSquareState;
    setSquareState: (squareState: BaconSquareState) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    /** gets the cast of the user-entered movie */
    getCastAndSetMovieInfo: (movieName: string, changeMap: boolean) => Promise<BaconActorList | void>;
    /** gets the movies of the user-selected actor */
    getMovies: (actorID: number, changeMap: boolean) => Promise<BaconFeatureList | void>;
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
    /** id of the currentActor */
    currentActorID: number;
    setCurrentActorID: (actorID: number) => void;
    /** the overview for the current movie */
    currentMovieOverview: string;
    setCurrentMovieOverview: (movieOverview: string) => void;
    /** release date of current movie */
    currentMovieReleaseDate: string;
    setCurrentMovieReleaseDate: (movieReleaseDate: string) => void;
    /** 
     * array of entities for the user session in consecutive order FOR navigation 
     * the [0] will always be the cast of the first movie the user entered in input
     */
    sessionMap: number[];
    setSessionMap: (sessionMap: number[]) => void;
    /** active text in inputSearch */
    movieInputTitle: string;
    setMovieInputTitle: (movieInputTitle: string) => void;
};

const AppContext = createContext<Partial<ContextProps>>({});

interface Props { children: React.ReactNode; }

export function useAppContext() {
    return useContext(AppContext);
}

// PICKUP: delete this and everything using it before shipped.. 
// just need it so don't use too much API calls while developing.
// const isMocked = process.env.EXPO_PUBLIC_MOCK_MODE === 'true';
// const isMocked = false;

const AppProvider = (props: Props) => {
    const [ squareState, setSquareState ] = useState<BaconSquareState>('movieInput');
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ currentCardCast, setCurrentCardCast ] = useState<BaconActorList | null>(null);
    const [ currentCardMovies, setCurrentCardMovies ] = useState<BaconFeatureList | null>(null);
    const [ currentMovieTitle, setCurrentMovieTitle ] = useState<string>('');
    const [ currentActorName, setCurrentActorName ] = useState<string>('');
    const [ currentMovieOverview, setCurrentMovieOverview ] = useState<string>('');
    const [ currentMovieReleaseDate, setCurrentMovieReleaseDate ] = useState<string>('');
    const [ currentActorID, setCurrentActorID ] = useState<number>(0);
    const [ sessionMap, setSessionMap ] = useState<number[]>([]);
    const [ movieInputTitle, setMovieInputTitle ] = useState<string>('');

    const featureService = BaconServiceFactory.createFeatureService();

    /** appends new session step to tree */
    const handleChangeMap = (id: number) => {
        const newSessionMap = [ ...sessionMap, id ];
        setSessionMap(newSessionMap);
    };

    /** gets the cast and sets the currentMovieTitle with official title */
    async function getCastAndSetMovieInfo(movieName: string, changeMap: boolean): Promise<BaconActorList | void> {
        try {
            // if (isMocked) {
            //     console.log('MOCK MODE ON, returning fake data...');
            //     console.log('---------------------------------');
            //     return { id: 12345, actors: mockedCast.cast, }
            // }
            const feature_object = await featureService.getFeatureByTitle(movieName);
            if (!feature_object) return alert('No Movie found with provided title, please try again.');
            setCurrentMovieOverview(feature_object.overview);
            setCurrentMovieTitle(feature_object.title);
            setCurrentMovieReleaseDate(feature_object.releaseDate);
            const featureCast = await featureService.getFeatureCastByMovieId(feature_object.id);
            if (!featureCast) {
                return alert(`No cast found for ${movieName}. Please try again.`);
            }
            if (changeMap) handleChangeMap(feature_object.id)
            return { id: feature_object.id, actors: featureCast };
        } catch (error) {
            return alert(
                `An unknown error occurred while attempting to get the cast, please try again. If this issue persists, please contact support, shel.programmer@gmail.com.`
            );
        }
    }
    /** the movie title will always exist for this since it comes from an existing actor entity */
    async function getMovies(actorID: number, changeMap: boolean): Promise<BaconFeatureList | void> {
        try {
            // if (isMocked) {
            //     console.log('MOCK MODE ON, returning fake data...');
            //     console.log('---------------------------------');
            //     return { id: 12345, features: mockedFeatures.features, }
            // }
            const actorService = BaconServiceFactory.createActorService({ actor_id: actorID });
            const featureListResult = await actorService.getFeaturesForActor();
            if (!featureListResult) {
                return alert('cannot find any features for the requested actor. Please try again.');
            }
            if (changeMap) handleChangeMap(actorID);
            return { id: actorID, features: featureListResult };
        } catch (error) {
            return alert(
                `An unknown error occurred while attempting to get the movies, please try again. If this issue persists, please contact support, shel.programmer@gmail.com.`
            );
        }
    }


    return (
        <AppContext.Provider value={{
            squareState,
            setSquareState,
            sessionMap,
            setSessionMap,
            getCastAndSetMovieInfo: getCastAndSetMovieInfo,
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
            currentActorID,
            setCurrentActorID,
            currentMovieOverview,
            setCurrentMovieOverview,
            currentMovieReleaseDate,
            setCurrentMovieReleaseDate,
            movieInputTitle,
            setMovieInputTitle,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };