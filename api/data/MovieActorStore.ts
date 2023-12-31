import { BaconActor, BaconFeature, BaconMovieOption } from '../../types';
import { ActorTMDB, MovieActorTMDB, MovieTMDB } from '../../types/tmdb';
import { config } from '../config';

const apiKey = config.TMDB_API_KEY.v3;
const urlSuffix = `&page=1&api_key=${apiKey}`;


/**
 * @class MovieActorDataStore
 * fetches data from the TMDB API
 */
export class MovieActorStore {
    api_key: string;
    api_base: string;
    url_suffix: string;

    constructor() {
        this.api_key = apiKey;
        this.api_base = config.API_BASE_URL;
        this.url_suffix = urlSuffix;
    }

    static init = () => new MovieActorStore();

    /**
     * 
     * @param title - the title of the movie to search for
     * @returns {Promise<BaconFeature>} movie data
     */
    async getMovieByTitle(title: string): Promise<BaconFeature | null> {
        const url = `${this.api_base}/search/movie?query=${title}${this.url_suffix}`;
        const response = await fetch(url);
        const data = await response.json() as { results: MovieTMDB[] };
        if (data && data.results && data.results.length > 0) {
            // info: we force the top one, user can always search again or use a suggestion.
            const firstFeature = data.results[ 0 ];
            const movieObject: BaconFeature = {
                id: firstFeature.id,
                title: firstFeature.original_title || firstFeature.title,
                overview: firstFeature.overview || 'unknown',
                releaseDate: firstFeature.release_date || 'unknown',
            };
            return movieObject;
        } else {
            return null;
        }
    }

    async getTenMoviesByPrefix(prefix: string): Promise<BaconMovieOption[] | null> {
        const url = `${this.api_base}/search/movie?query=${prefix}${this.url_suffix}`;
        const response = await fetch(url);
        const data = await response.json() as { results: MovieTMDB[] };
        if (data && data.results && data.results.length > 0) {
            const firstTenFeatures = data.results.slice(0, 10);
            return firstTenFeatures;
        } else {
            return [];
        }
    }

    /**
     * @method getCastByMovieId
     * @param id - the TMDB defined id of the movie to get the cast for
     * @returns {BaconActor[]} list of actors
     */
    async getBaconActorListByMovieId(id: number): Promise<BaconActor[] | null> {
        // only try catch in the route/controller bc that is what makes sense dug
        const url = `${this.api_base}/movie/${id}/credits?api_key=${this.api_key}`;
        const response = await fetch(url);
        const data = await response.json() as { cast: ActorTMDB[] };
        if (data && data.cast && data.cast.length > 0) {
            const actors = data.cast.map((actor) => this.convertToBaconActor(actor));
            return actors;
        } else {
            return null;
        }
    }

    /**
     * @method getMoviesByActorId
     * gets a list of every movie feature an actor has been in
     * @returns 
     */
    async getMoviesByActorId(id: number): Promise<BaconFeature[] | null> {
        const url = `${this.api_base}/person/${id}/movie_credits?api_key=${this.api_key}`;
        const response = await fetch(url);
        const data = await response.json() as { cast: MovieActorTMDB[] };
        if (data && data.cast && data.cast.length > 0) {
            return data.cast.map((movie) => this.convertToBaconFeature(movie));
        } else {
            return null;
        }
    }


    /**
     * @method getActorNameById
     * gets the actor name by id
     */
    async getActorNameById(id: number): Promise<string | null> {
        const url = `${this.api_base}/person/${id}?api_key=${this.api_key}`;
        const response = await fetch(url);
        const data = await response.json() as { name: string };
        if (data && data.name) {
            return data.name;
        } else {
            return null;
        }
    }

    /** 
     * @method getMovieTitleById
     * gets the movie title by id
     */
    async getMovieTitleById(id: number): Promise<string | null> {
        const url = `${this.api_base}/movie/${id}?api_key=${this.api_key}`;
        const response = await fetch(url);
        const data = await response.json() as { title: string, original_title: string };
        if (data && (data.title || data.original_title)) {
            return data.title || data.original_title;
        } else {
            return null;
        }
    }

    /** converts response to @type {BaconFeature} */
    private convertToBaconFeature(data: MovieActorTMDB): BaconFeature {
        const movieObject: BaconFeature = {
            id: data.id,
            title: data.original_title || data.title,
            characterName: data.character || 'unknown',
            overview: data.overview || 'unknown',
            releaseDate: data.release_date || 'unknown',
        };
        return movieObject;
    }

    /** converts response to @type {BaconActor} */
    private convertToBaconActor(data: ActorTMDB): BaconActor {
        const actorObject: BaconActor = {
            id: data.id,
            name: data.name || data.original_name,
            characterName: data.character || 'unknown',
        };
        return actorObject;
    }

}






