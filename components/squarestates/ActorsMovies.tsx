import { ScrollView, View } from 'react-native'

import useGetData from '../../hooks/useGetData'
import { BaconFeatureList } from '../../types'
import { MovieButtonNode } from '../nodes/MovieButtonNode'
import { SquareHeader } from '../SquareHeader'

type ActorsMoviesProps = BaconFeatureList & {
    actorName: string;
}

export function ActorsMovies(props: ActorsMoviesProps) {

    const { handleGetCast } = useGetData();

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
                            handleMovieNodePress={() => handleGetCast(feature.title, true)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}