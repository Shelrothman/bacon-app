import { MovieActorStore } from "../data/MovieActorStore";
import { ActorService } from "./ActorService";
import { FeatureService } from "./FeatureService";


/**
 * @class ServiceFactory
 * responsible for creating an instance of a service for the controllers.
 */
export class BaconServiceFactory {

    static createActorService() {
        const dataStore = MovieActorStore.init();
        return new ActorService({
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