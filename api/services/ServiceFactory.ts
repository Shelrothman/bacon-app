import { MovieActorStore } from "../data/MovieActorStore";
import { ActorService } from "./ActorService";
import { FeatureService } from "./FeatureService";

type ActorServiceFactoryParams = {
    actor_id: number;
}

/**
 * @class ServiceFactory
 * responsible for creating an instance of a service for the controllers.
 */
export class BaconServiceFactory {



    static createActorService(actorServiceParams: ActorServiceFactoryParams) {
        const dataStore = MovieActorStore.init();
        return new ActorService({
            actor_id: actorServiceParams.actor_id,
            // movie_id: actorServiceParams.movie_id,
            dataStore: dataStore
        });
    }

    static createFeatureService() {
        const dataStore = MovieActorStore.init();
        return new FeatureService({
            dataStore: dataStore
        });
    }
}