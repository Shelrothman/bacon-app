import { MovieActorStore } from "../data/MovieActorStore";

type FeatureServiceParams = { dataStore: MovieActorStore; }


/**
 * @class featureService
 * this class contains the logic     for working with the feature data
 * regardless of the source of that data 
 */

export class FeatureService {
    dataStore: MovieActorStore;

    constructor(featureServiceParams: FeatureServiceParams) {
        this.dataStore = featureServiceParams.dataStore;
    }

    getFeatureByTitle = async (feature_title: string) => await this.dataStore.getMovieByTitle(feature_title);

    getFeatureCastByMovieId = async (feature_id: number) => await this.dataStore.getBaconActorListByMovieId(feature_id);

    getListOfFeaturesByPrefix = async (feature_title: string) => await this.dataStore.getTenMoviesByPrefix(feature_title);

    getFeatureInfo = async (feature_id: number) => await this.dataStore.getMovieInfoById(feature_id);

}    