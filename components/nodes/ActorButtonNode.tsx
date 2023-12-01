import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native'

import { BaconActor } from '../../types'

type ActorButtonNodeProps = BaconActor & {
    handleActorNodePress: (id: number, actorName: string) => void;
}


export function ActorButtonNode(props: ActorButtonNodeProps) {

    const { handleActorNodePress, id, name, characterName } = props;


    return (
        <Pressable
            onPress={() => handleActorNodePress(id, name)}
            id={name}
            style={({ pressed }) => [
                // { backgroundColor: pressed ? 'blue' : '#8a8686' },
                // { boxShadow: pressed ? '0 0 0 2px blue' : null },
                { opacity: pressed ? 0.5 : 1 },
                styles.pressable
            ]}
        >
            <Text>
                <Ionicons name="person-circle-outline" size={24} color="black" />
                {name}
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
        backgroundColor: '#bea841',
        marginHorizontal: 10,
        padding: 5,
    },
});