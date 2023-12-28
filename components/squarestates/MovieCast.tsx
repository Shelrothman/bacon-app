import { ScrollView, View } from 'react-native'

import useGetData from '../../hooks/useGetData'
import { BaconActorList } from '../../types'
import { ActorButtonNode } from '../nodes/ActorButtonNode'
import { SquareHeader } from '../SquareHeader'

type MovieCastProps = BaconActorList & {
    title: string;
}

// TODO: option at bottom or somewhere for user to say this is not the movie they meant. ???: maybe future thing if requested by my testers.. aka my mom.. lol

export function MovieCast(props: MovieCastProps) {
    const { handleGetMovies } = useGetData();

    return (
        <View>
            <SquareHeader title={`Cast of ${props.title}`} />
            <ScrollView showsVerticalScrollIndicator={true}>
                {props.actors.map((actor) => {
                    return (
                        <ActorButtonNode
                            key={actor.id+actor.name+actor.characterName}
                            id={actor.id}
                            name={actor.name}
                            characterName={actor.characterName}
                            handleActorNodePress={() => handleGetMovies(actor.id, actor.name)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}