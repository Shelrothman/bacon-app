import { StyleSheet, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

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
            // style={{ borderColor: 'blue', borderWidth: 1 }}
            style={styles.pressable}
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
    },
});