import { View, Text, ScrollView, Pressable } from 'react-native'
import { BaconActorList } from '../../types'
import { useAppContext } from '../../contexts/AppContext'

type MovieCastProps = BaconActorList & {
    title: string;
}

// TODO: option at bottom or somewhere for user to say this is not the movie they meant. ???:

export function MovieCast(props: MovieCastProps) {
    const { getMovies, setCurrentCardMovies, setSquareState, setIsLoading, setCurrentActorName } = useAppContext();

    const handleActorNodePress = (id: number, actorName: string) => {
        setIsLoading && setIsLoading(true);
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
            <Text>Cast of {props.title} </Text>
            <ScrollView>
                {/* TODO: a node component for each actor node */}
                {props.actors.map((actor) => {
                    return (
                        <Pressable
                            onPress={() => handleActorNodePress(actor.id, actor.name)}
                            key={actor.id} id={actor.name} style={{ borderColor: 'blue', borderWidth: 1 }}
                        >
                            <Text>{actor.name} {`\n`} {`\t`}
                                character: {actor.characterName}
                            </Text>
                        </Pressable>
                    )
                })}
            </ScrollView>
        </View>
    )
}