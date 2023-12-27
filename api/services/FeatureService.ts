import { MovieActorStore } from "../data/MovieActorStore";

type FeatureServiceParams = {
    // feature_title: string;
    dataStore: MovieActorStore;
}



/**
 * @class featureService
 * this class contains the logic for working with the feature data
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
        const cast = await this.dataStore.getCastByMovieId(feature_id);
        return cast;
    }

    getListOfFeaturesByPrefix = async (feature_title: string) => {
        // console.log('in getListOfFeaturesByPrefix');
        // PICKUP: some kind of algorithm or logic that based on the letters provided...
        // some way of combining them into making the search more specific... ???:
        const features = await this.dataStore.getTenMoviesByPrefix(feature_title);
        return features;
    }

}    