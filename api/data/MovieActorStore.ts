import { config } from '../config';
import { BaconActor, BaconFeature } from '../../types';
import { ActorTMDB, MovieActorTMDB, MovieTMDB } from '../../types/tmdb';
import IDataInterface from './DataInterface';

// FUTURE: an abstracted repository layer if the complexity grows

const apiKey = config.TMDB_API_KEY.v3;
const urlSuffix = `&page=1&api_key=${apiKey}`;


/**
 * @class MovieActorDataStore
 * fetches data from the TMDB API
 */
export class MovieActorStore implements IDataInterface<BaconActor, BaconFeature> {
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
    async getMovieByTitle(title: string): Promise<BaconFeature> {
        const url = `${this.api_base}/search/movie?query=${title}${this.url_suffix}`;
        const response = await fetch(url);
        const data = await response.json() as { results: MovieTMDB[] };
        if (data && data.results && data.results.length > 0) {
            // info: likely it is the top one
            const firstFeature = data.results[ 0 ];
            const movieObject: BaconFeature = {
                id: firstFeature.id,
                title: firstFeature.original_title || firstFeature.title
            };
            return movieObject;
        } else {
            throw new Error('no movie found');
        }
    }

    /**
     * @method getCastByMovieId
     * @param id - the TMDB defined id of the movie to get the cast for
     * @returns {BaconActor[]} list of actors
     */
    async getCastByMovieId(id: number): Promise<BaconActor[]> {
        // only try catch in the route/controller bc that is what makes sense dug
        const url = `${this.api_base}/movie/${id}/credits?api_key=${this.api_key}`;
        const response = await fetch(url);
        const data = await response.json() as { cast: ActorTMDB[] };
        if (data && data.cast && data.cast.length > 0) {
            const actors = data.cast.map((actor) => this.convertToBaconActor(actor));
            return actors;
        } else {
            throw new Error('invalid movie ID');
        }
    }

    /**
     * @method getMoviesByActorId
     * gets a list of every movie feature an actor has been in
     * @returns 
     */
    async getMoviesByActorId(id: number): Promise<BaconFeature[]> {
        const url = `${this.api_base}/person/${id}/movie_credits?api_key=${this.api_key}`;
        const response = await fetch(url);
        const data = await response.json() as { cast: MovieActorTMDB[] };
        if (data && data.cast && data.cast.length > 0) {
            const movies = data.cast.map((movie) => this.convertToBaconFeature(movie));
            // console.log(movies)
            return movies;
        } else {
            throw new Error('invalid actor ID');
        }
    }


    /** converts response to @type {BaconFeature} */
    private convertToBaconFeature(data: MovieActorTMDB): BaconFeature {
        const movieObject: BaconFeature = {
            id: data.id,
            title: data.original_title || data.title,
            characterName: data.character || 'unknown',
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






