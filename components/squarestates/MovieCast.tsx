import { ScrollView, View } from 'react-native'

import { useAppContext } from '../../contexts/AppContext'
import { BaconActorList } from '../../types'
import { ActorButtonNode } from '../nodes/ActorButtonNode'
import { SquareHeader } from '../SquareHeader'

type MovieCastProps = BaconActorList & {
    title: string;
}

// TODO: option at bottom or somewhere for user to say this is not the movie they meant. ???: maybe future thing if requested by my testers.. aka my mom.. lol

export function MovieCast(props: MovieCastProps) {
    const { getMovies, setCurrentCardMovies, setSquareState, setIsLoading, setCurrentActorName } = useAppContext();

    const handleActorNodePress = (id: number, actorName: string) => {
        setIsLoading && setIsLoading(true);
        // console.log('actorPressed:', actorName)
        getMovies && getMovies(id).then((result) => {
            if (result) {
                setCurrentCardMovies && setCurrentCardMovies(result);
                setSquareState && setSquareState('actorsMovies');
                setCurrentActorName && setCurrentActorName(actorName);
            }
        }).finally(() => {
            setIsLoading && setIsLoading(false);
        });
    }

    return (
        <View>
            {/* <Text>Cast of {props.title} </Text> */}
            <SquareHeader title={`Cast of ${props.title}`} />
            <ScrollView showsVerticalScrollIndicator={true}>
                {props.actors.map((actor) => {
                    return (
                        <ActorButtonNode
                            key={actor.id}
                            id={actor.id}
                            name={actor.name}
                            characterName={actor.characterName}
                            handleActorNodePress={handleActorNodePress}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}