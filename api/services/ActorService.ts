import { MovieActorStore } from "../data/MovieActorStore";
import { BaconActorOption, FeatureListResponse } from "../../types/api";
import { MovieTMDB } from "../../types/tmdb";

export type ActorServiceParams = {
    dataStore: MovieActorStore;
}

// TODO: have it choose the known_for that is the most popular for the suggestion list

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

    getFeaturesByActorId = async (actor_id: number) => {
        const features = await this.dataStore.getMoviesByActorId(actor_id);
        return features;
    }

    getActorName = async (actor_id: number) => {
        const actorName = await this.dataStore.getActorNameById(actor_id);
        return actorName;
    }

    getActorImageSrc = async (poster_path: string) => {
        const url = await this.dataStore.getImageHref(poster_path);
        return url;
    }

    /** mainly used for initial search */
    getActorFeaturesObject = async (actor_name: string): Promise<FeatureListResponse | null> => {
        const actorFeatureList = await this.dataStore.getMoviesByActorName(actor_name);
        return actorFeatureList;
    }

    getFeatureName = async (feature_id: number) => {
        const featureName = await this.dataStore.getMovieTitleById(feature_id);
        return featureName;
    }

    getListOfActorsByPrefix = async (actor_name: string): Promise<BaconActorOption[]> => {
        const actors = await this.dataStore.getTenActorsByPrefix(actor_name);
        if (!actors) return [] as BaconActorOption[];
        const returnActors: BaconActorOption[] = [];
        // TODO: ensure this doesnt lag the performance
        for (let x = 0, max = actors.length; x < max; x++) {
            const actor = actors[ x ];
            if (actor.known_for && actor.known_for.length > 0) {
                const mostPopularFeature = actor.known_for.reduce((prev, current) => {
                    return (prev.popularity > current.popularity) ? prev : current;
                });
                const returnActor = this.convertToBaconActorOption(
                    actor.id, actor.name, mostPopularFeature
                );
                returnActors.push(returnActor);
            } else {
                const returnActor = this.convertToBaconActorOption(actor.id, actor.name);
                returnActors.push(returnActor);
            }
        }
        return returnActors;
    }

    private convertToBaconActorOption = (id: number, name: string, movieObJ?: MovieTMDB): BaconActorOption => {
        return { id, name, most_known_for: movieObJ };
    }

}    