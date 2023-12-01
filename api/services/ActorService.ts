import { BaconActor, BaconFeature } from "../../types";
import IDataInterface from "../data/DataInterface";

export type ActorServiceParams = {
    actor_id: number;
    dataStore: IDataInterface<BaconActor, BaconFeature>;
}



/**
 * @class ActorService
 * this class contains the logic for working with the actor data
 * regardless of the source of that data 
 */

export class ActorService {
    actor_id: number;
    // movie_id: number;
    dataStore: IDataInterface<BaconActor, BaconFeature>;



    constructor(actorServiceParams: ActorServiceParams) {
        this.actor_id = actorServiceParams.actor_id;
        // this.movie_id = actorServiceParams.movie_id;
        this.dataStore = actorServiceParams.dataStore;
    }

    async getFeaturesForActor() {
        const features = await this.dataStore.getMoviesByActorId(this.actor_id);
        return features;
    }

    


}    