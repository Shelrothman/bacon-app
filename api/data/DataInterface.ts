

/**
 * @interface IDataInterface
 * abstraction layer for data access
 * @template A - the type of actor data
 * @template F - the type of feature data
 */

import { BaconMovieOption } from "../../types";

export default interface IDataInterface<A,F> {
    // logger: winston.Logger;
    // TODO: FUTURE: this will require a param of a key or something
    api_key: string;
    api_base: string;
    // these could change the data but the actual methods will be needed and staty bc that s this app..
    getMovieByTitle: (title: string) => Promise<F|null>;
    getCastByMovieId: (id: number) => Promise<A[]|null>;
    getMoviesByActorId: (id: number) => Promise<F[]|null>;
    getTenMoviesByPrefix: (title: string) => Promise<BaconMovieOption[]|null>;
}  