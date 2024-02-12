import { MovieActorStore } from "../data/MovieActorStore";
import { BaconActorOption, FeatureListResponse } from "../../types/api";
import { ActorTMDB, MovieTMDB } from "../../types/tmdb";

export type ActorServiceParams = { dataStore: MovieActorStore; }

/**
 * @class ActorService
 * this class contains the logic for working with the actor data
 * regardless of the source of that data 
 */
export class ActorService {
    private dataStore: MovieActorStore

    constructor(actorServiceParams: ActorServiceParams) {
        this.dataStore = actorServiceParams.dataStore;
    }

    getFeaturesByActorId = async (actor_id: number) => await this.dataStore.getMoviesByActorId(actor_id);

    getActorName = async (actor_id: number) => await this.dataStore.getActorNameById(actor_id);

    getActorImageSrc = async (actor_id: number) => await this.dataStore.getActorImageById(actor_id);

    /** mainly used for initial search */
    getActorFeaturesObject = async (actor_name: string): Promise<FeatureListResponse | null> => await this.dataStore.getMoviesByActorName(actor_name);

    getListOfActorsByPrefix = async (actor_name: string): Promise<BaconActorOption[]> => {
        const actors = await this.dataStore.getTenActorsByPrefix(actor_name);
        if (!actors) return [] as BaconActorOption[];
        const returnActors: BaconActorOption[] = [];
        // TODO: ensure this doesnt lag the performance after first release
        for (let x = 0, max = actors.length; x < max; x++) {
            const actor = this.handleActorSuggestion(actors[ x ]);
            returnActors.push(actor);
        }
        return returnActors;
    }

    private handleActorSuggestion = (actor: ActorTMDB): BaconActorOption => {
        if (actor.known_for && actor.known_for.length > 0) {
            const mostPopularFeature = actor.known_for.reduce((prev, current) => {
                return (prev.popularity > current.popularity) ? prev : current;
            });
            return this.convertToBaconActorOption(actor.id, actor.name, mostPopularFeature);
        } else {
            const returnActor = this.convertToBaconActorOption(actor.id, actor.name);
            return returnActor;
        }
    }

    private convertToBaconActorOption = (id: number, name: string, movieObJ?: MovieTMDB): BaconActorOption => {
        return { id, name, most_known_for: movieObJ };
    }

}    