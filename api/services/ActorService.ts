import { MovieActorStore } from "../data/MovieActorStore";

export type ActorServiceParams = {
    actor_id: number;
    dataStore: MovieActorStore;
}

/**
 * @class ActorService
 * this class contains the logic for working with the actor data
 * regardless of the source of that data 
 */
export class ActorService {
    actor_id: number;
    dataStore: MovieActorStore

    constructor(actorServiceParams: ActorServiceParams) {
        this.actor_id = actorServiceParams.actor_id;
        this.dataStore = actorServiceParams.dataStore;
    }

    async getFeaturesForActor() {
        const features = await this.dataStore.getMoviesByActorId(this.actor_id);
        return features;
    }

    async getActorName() {
        const actorName = await this.dataStore.getActorNameById(this.actor_id);
        return actorName;
    }

}    