/**
 * @fileoverview TMDB types
 * types returned from TMDB api
 */



/**
 * @type MovieTMDB
 * TMDB movie type response from api when searching by movie title query
 */
export type MovieTMDB = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path?: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    media_type: string;
};


/**
 * @type MovieActorTMDB
 * TMDB movie type response from api when searching by person id, ?movie_credits
 */
export type MovieActorTMDB = MovieTMDB & {
    character: string;
    credit_id: string;
    order: number;
};

/**
 * @type ActorTMDB
 * TMDB actor type response from api when searching by movie id, ?credits
 */
export type ActorTMDB = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string;
    cast_id: number;
    character?: string;
    credit_id: string;
    order: number;
    known_for: MovieTMDB[];
};
