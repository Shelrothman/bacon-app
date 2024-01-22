import { MovieActorStore } from "../data/MovieActorStore";
import { FeatureListResponse } from "../../types/api";

export type ActorServiceParams = {
    dataStore: MovieActorStore;
}

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

    /** mainly used for initial search */
    getActorFeaturesObject = async (actor_name: string): Promise<FeatureListResponse | null> => {
        const actorFeatureList = await this.dataStore.getMoviesByActorName(actor_name);
        return actorFeatureList;
    }

    getFeatureName = async (feature_id: number) => {
        const featureName = await this.dataStore.getMovieTitleById(feature_id);
        return featureName;
    }

    getListOfActorsByPrefix = async (actor_name: string) => {
        const actors = await this.dataStore.getTenActorsByPrefix(actor_name);
        return actors;
    }

}    