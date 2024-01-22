import { MovieTMDB } from "./tmdb";

/**
 * @fileoverview typescript types for the bacon api
 */


/**
 * @type BaconMovie
 * just a movie thats been looked up by title
 */
export type BaconMovie = {
    /** unique defined from db */
    id: number;
    /** user friendly official title returned from db */
    title: string;
    /** name if it happens to be of different media */
    name?: string;
};

/**
 * @type BaconMovieOption
 * type for list of optional titles to search for
 */
export type BaconMovieOption = BaconMovie & {
    release_date: string;
    /** use overview for onHover events for the suggestionList for user to see */
    overview: string;
};

/**
 * @type BaconActorOption
 * type for list of optional actors to search for when user is in actorInput mode
 */
export type BaconActorOption = BaconActor & {
    /** use known_for for onHover/slide/tbd events for the suggestionList for user to see */
    most_known_for?: MovieTMDB;
};

/**
 * @type BaconActor
 * actor return type
 */
export type BaconActor = {
    /** unique defined from db */
    id: number;
    /** user friendly name */
    name: string;
    /** do we want the character name */
    characterName?: string;
};

/**
 * @type BaconFeature
 * feature return type
 * a feature is any movie an actor has a credit in.
 */
export type BaconFeature = BaconMovie & {
    /** character that the requested actor played */
    characterName?: string;
    overview: string;
    releaseDate: string;
};

/**
 * @type BaconFeatureList
 * feature list return type that a requested actor has been in
 */
export type BaconFeatureList = {
    /** the id of the actor assigned by db  */
    id: number;
    features: BaconFeature[];
};

/**
 * @type BaconActorList
 * actor list return type
 */
export type BaconActorList = {
    /** the id of the movie assigned by db  */
    id: number;
    actors: BaconActor[];
};


export type FeatureListResponse = {
    /** the id of the actor assigned by db  */
    id: number,
    features: BaconFeature[]
}

export type BaconSquareState = 'movieInput' | 'actorInput' | 'movieCast' | 'actorsMovies';