import { ScrollView, View } from 'react-native'

import useGetData from '../../hooks/useGetData'
import { BaconActorList } from '../../types'
import { ActorButtonNode } from '../nodes/ActorButtonNode'
import { SquareHeader } from '../SquareHeader'

type MovieCastProps = BaconActorList & { title: string; };

export function MovieCast(props: MovieCastProps) {
    const { handleGetMovies } = useGetData();

    return (
        <View>
            <SquareHeader title={`Cast of ${props.title}`} />
            <ScrollView showsVerticalScrollIndicator={true}>
                {props.actors.map((actor) => {
                    return (
                        <ActorButtonNode
                            key={actor.id + actor.name + actor.characterName}
                            id={actor.id}
                            name={actor.name}
                            characterName={actor.characterName}
                            handleActorNodePress={() => handleGetMovies(actor.id, actor.name, true)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}