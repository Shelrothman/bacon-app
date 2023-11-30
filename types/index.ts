/**
 * @fileoverview typescript types for the bacon api
 */


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
export type BaconFeature = {
    /** unique defined from db */
    id: number;
    /** user friendly official title returned from db */
    title: string;
    /** character that the requested actor played */
    characterName?: string;
};

/**
 * @type BaconMovie
 * just a movie thats been looked up by title
 */
export type BaconMovie = {
    /** unique defined from db */
    id: number;
    /** user friendly official title returned from db */
    title: string;
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