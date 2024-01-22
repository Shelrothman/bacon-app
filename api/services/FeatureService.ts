import { MovieActorStore } from "../data/MovieActorStore";

type FeatureServiceParams = {
    // feature_title: string;
    dataStore: MovieActorStore;
}

// TODO: check here and other files around here and ensure i dont have anything thats unused

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

    getFeatureByTitle = async (feature_title: string) => {
        const feature = await this.dataStore.getMovieByTitle(feature_title);
        return feature;
    }

    getFeatureCastByMovieId = async (feature_id: number) => {
        const cast = await this.dataStore.getBaconActorListByMovieId(feature_id);
        return cast;
    }

    getListOfFeaturesByPrefix = async (feature_title: string) => {
        const features = await this.dataStore.getTenMoviesByPrefix(feature_title);
        return features;
    }

    getFeatureName = async (feature_id: number) => {
        const featureName = await this.dataStore.getMovieTitleById(feature_id);
        return featureName;
    }

}    