import IDataInterface from "../data/DataInterface";
import { BaconActor, BaconFeature } from "../../types";

type FeatureServiceParams = {
    // feature_title: string;
    dataStore: IDataInterface<BaconActor, BaconFeature>;
}



/**
 * @class featureService
 * this class contains the logic for working with the feature data
 * regardless of the source of that data 
 */

export class FeatureService {
    // feature_title: string;
    dataStore: IDataInterface<BaconActor, BaconFeature>;




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



    // TODO: handle it not being the first one. in service layer
    


}    