import { createContext, useContext, useState } from 'react';
import { BaconServiceFactory } from '../api/services/ServiceFactory';
import { BaconActorList, BaconFeatureList, BaconSquareState } from '../types/api';

type ContextProps = {
    /** can be one of 4: movieInput, actorInput, movieCast, actorsMovies */
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
    /** current actor href */
    currentActorHref: string;
    setCurrentActorHref: (actorHref: string) => void;
    /** 
     * array of entities for the user session in consecutive order FOR navigation 
     * the [0] will always be the cast of the first movie the user entered in input
     */
    sessionMap: number[];
    setSessionMap: (sessionMap: number[]) => void;
    /** active text in inputSearch */
    inputTitle: string;
    setInputTitle: (inputTitle: string) => void;
};

const AppContext = createContext<Partial<ContextProps>>({});

interface Props { children: React.ReactNode; }

export function useAppContext() {
    return useContext(AppContext);
}

const ERR_MSG = (x: string) => `An unknown error occurred while attempting to get the ${x}, please try again. If this issue persists, please contact support, shel.programmer@gmail.com.`

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
    const [ inputTitle, setInputTitle ] = useState<string>('');
    const [ currentActorHref, setCurrentActorHref ] = useState<string>('');

    const featureService = BaconServiceFactory.createFeatureService();
    const actorService = BaconServiceFactory.createActorService();


    // TODO: these functions are only used in one place, so move them there.
    /** gets the cast and sets the currentMovieTitle with official title */
    async function getCastAndSetMovieInfo(movieName: string): Promise<BaconActorList | void> {
        try {
            const feature_object = await featureService.getFeatureByTitle(movieName);
            if (!feature_object) return alert('No Movie found with provided title, please try again.');
            setCurrentMovieOverview(feature_object.overview);
            setCurrentMovieTitle(feature_object.title);
            setCurrentMovieReleaseDate(feature_object.releaseDate);
            const featureCast = await featureService.getFeatureCastByMovieId(feature_object.id);
            if (!featureCast) {
                return alert(`No cast found for ${movieName}. Please try again.`);
            }
            return { id: feature_object.id, actors: featureCast };
        } catch (error) {
            return alert(ERR_MSG('cast'));
        }
    }
    /** the movie title will always exist for this since it comes from an existing actor entity */
    async function getMovies(actorID: number): Promise<BaconFeatureList | void> {
        try {
            const featureListResult = await actorService.getFeaturesByActorId(actorID);
            if (!featureListResult) {
                return alert('cannot find any features for the requested actor. Please try again.');
            }
            return { id: actorID, features: featureListResult };
        } catch (error) {
            return alert(ERR_MSG('movies'));
        }
    }

    return (
        <AppContext.Provider value={{
            squareState,
            setSquareState,
            sessionMap,
            setSessionMap,
            getCastAndSetMovieInfo,
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
            inputTitle,
            setInputTitle,
            currentActorHref,
            setCurrentActorHref,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };