import { MovieActorStore } from "../data/MovieActorStore";

type FeatureServiceParams = {
    // feature_title: string;
    dataStore: MovieActorStore;
}



/**
 * @class featureService
 * this class contains the logic     for working with the feature data
 * regardless of the source of that data 
 */

export class FeatureService {
    // feature_title: string;
    dataStore: MovieActorStore;

    constructor(featureServiceParams: FeatureServiceParams) {
        // this.feature_title = featureServiceParams.feature_title;
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