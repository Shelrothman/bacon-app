import { View, Text, ScrollView } from 'react-native'
import { BaconActorList } from '../../types'

type MovieCastProps = BaconActorList & {
    title: string;
}

export function MovieCast(props: MovieCastProps) {

    //  TODO: change the type and all other spots to also hold the title
    // or just have a movieTitle state in the context holding that.
    return (
        <View>
            <Text>Cast of {props.title} </Text>
            <ScrollView>
                {/* TODO: a node component for each actor node */}
                {props.actors.map((actor) => {
                    return (
                        <Text key={actor.id}>{actor.name} {`\n`} {`\t`}
                            character: {actor.characterName}
                        </Text>
                         
                    )
                })}
            </ScrollView>
        </View>
    )
}