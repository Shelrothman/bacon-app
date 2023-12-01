import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native'

import { BaconFeature } from '../../types'

type MovieButtonNodeProps = BaconFeature & {
    handleMovieNodePress: (id: number, movieName: string) => void;
}


export function MovieButtonNode(props: MovieButtonNodeProps) {

    const { handleMovieNodePress, id, title, characterName } = props;


    return (
        <Pressable
            onPress={() => handleMovieNodePress(id, title)}
            id={title}
            style={({ pressed }) => [
                // TODO: maybe more to make it look like an its going in...
                { opacity: pressed ? 0.5 : 1 },
                styles.pressable
            ]}
        >
            <Text>
                <Ionicons name="person-circle-outline" size={24} color="black" />
                {title}
                {`\n`}
                character: {characterName}
            </Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 18,
        backgroundColor: '#41be69',
        marginHorizontal: 10,
        padding: 5,
    },
});