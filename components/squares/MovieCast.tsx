import { View, Text, ScrollView, Button, Pressable } from 'react-native'
import { BaconActorList } from '../../types'
import { useAppContext } from '../../contexts/AppContext'

type MovieCastProps = BaconActorList & {
    title: string;
}

export function MovieCast(props: MovieCastProps) {
    const {
        getMovies,
        setCurrentCardMovies,
        setSquareState,
        setIsLoading,
        setCurrentActorName
    } = useAppContext();

    const handleActorNodePress = (id: number, actorName: string) => {
        // console.log(event.target.id)
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
        <View style={{ backgroundColor: 'pink' }}>
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