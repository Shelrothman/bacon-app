import { ScrollView, Text, View } from 'react-native'

import { useAppContext } from '../../contexts/AppContext'
import { BaconFeatureList } from '../../types'
import { MovieButtonNode } from '../nodes/MovieButtonNode'

type ActorsMoviesProps = BaconFeatureList & {
    actorName: string;
}

export function ActorsMovies(props: ActorsMoviesProps) {

    const { getCast, setCurrentCardCast, setSquareState, setIsLoading, setCurrentMovieTitle } = useAppContext();

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
            <Text>Movies for {props.actorName}</Text>
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