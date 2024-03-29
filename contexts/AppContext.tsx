import { createContext, useContext, useState } from 'react';
import { BaconActorList, BaconFeature, BaconFeatureList, BaconSquareState } from '../types/api';

type MovieInfo = { overview: string, title: string, releaseDate: string };

type ContextProps = {
    /** can be one of 4: movieInput, actorInput, movieCast, actorsMovies */
    squareState: BaconSquareState;
    setSquareState: (squareState: BaconSquareState) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    /** cast of actors for the current movie */
    currentCardCast: BaconActorList | null;
    setCurrentCardCast: (baconActorList: BaconActorList) => void;
    /** movies of the current actor */
    currentCardMovies: BaconFeatureList | null;
    /** current title requested by user */
    currentMovieTitle: string;
    /** current actor selected by user onPress */
    currentActorName: string;
    /** id of the currentActor */
    currentActorID: number;
    /** the overview for the current movie */
    currentMovieOverview: string;
    /** release date of current movie */
    currentMovieReleaseDate: string;
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
    /** sets the states for movie data */
    setMovieDataContext: (feature_object: MovieInfo) => void;
    /** sets the states for actor data */
    setActorDataContext: (baconFeatureList: BaconFeature[], actorId: number, actorName: string) => void;
};

const AppContext = createContext<Partial<ContextProps>>({});

interface Props { children: React.ReactNode; }

export function useAppContext() {
    return useContext(AppContext);
}

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

    function setMovieDataContext(feature: MovieInfo) {
        setCurrentMovieOverview(feature.overview);
        setCurrentMovieTitle(feature.title);
        setCurrentMovieReleaseDate(feature.releaseDate);
    }

    function setActorDataContext(baconFeatureList: BaconFeature[], actorId: number, actorName: string) {
        setCurrentCardMovies({ id: actorId, features: baconFeatureList });
        setSquareState('actorsMovies');
        setCurrentActorName(actorName);
        setCurrentActorID(actorId);
    }

    return (
        <AppContext.Provider value={{
            squareState,
            setSquareState,
            sessionMap,
            setSessionMap,
            isLoading,
            setIsLoading,
            currentCardCast,
            setCurrentCardCast,
            currentCardMovies,
            currentMovieTitle,
            currentActorName,
            currentActorID,
            currentMovieOverview,
            currentMovieReleaseDate,
            inputTitle,
            setInputTitle,
            currentActorHref,
            setCurrentActorHref,
            setMovieDataContext,
            setActorDataContext
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };