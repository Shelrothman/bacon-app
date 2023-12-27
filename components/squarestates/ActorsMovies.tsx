import { ScrollView, View } from 'react-native'

import { useAppContext } from '../../contexts/AppContext'
import { BaconFeatureList } from '../../types'
import { MovieButtonNode } from '../nodes/MovieButtonNode'
import { SquareHeader } from '../SquareHeader'


type ActorsMoviesProps = BaconFeatureList & {
    actorName: string;
}

export function ActorsMovies(props: ActorsMoviesProps) {

    const { getCast, setCurrentCardCast, setSquareState, setIsLoading, setCurrentMovieTitle } = useAppContext();

    // TODO: get this in its own service file...
    const handleFeatureActorNodePress = (id: number, movieTitle: string) => {
        setIsLoading && setIsLoading(true);
        getCast && getCast(movieTitle).then((result) => {
            if (result) {
                setCurrentCardCast && setCurrentCardCast(result);
                setSquareState && setSquareState('movieCast');
                setCurrentMovieTitle && setCurrentMovieTitle(movieTitle);
            }
        }).finally(() => {
            setIsLoading && setIsLoading(false);
        });
    }

    return (
        <View >
            <SquareHeader title={`${props.actorName} Movies`} />
            <ScrollView showsVerticalScrollIndicator={true}>
                {props.features.map((feature) => {
                    return (
                        <MovieButtonNode
                            key={feature.id}
                            id={feature.id}
                            title={feature.title}
                            characterName={feature.characterName}
                            handleMovieNodePress={handleFeatureActorNodePress}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}