

/**
 * @interface IDataInterface
 * abstraction layer for data access
 * @template A - the type of actor data
 * @template F - the type of feature data
 */

export default interface IDataInterface<A,F> {
    // logger: winston.Logger;
    // TODO: FUTURE: this will require a param of a key or something
    api_key: string;
    api_base: string;
    // these could change the data but the actual methods will be needed and staty bc that s this app..
    getMovieByTitle: (title: string) => Promise<F>;
    getCastByMovieId: (id: number) => Promise<A[]>;
    getMoviesByActorId: (id: number) => Promise<F[]>;
}  