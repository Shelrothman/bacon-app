import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native'

import { BaconActor } from '../../types'
import { NodeWrapper } from './NodeWrapper';

type ActorButtonNodeProps = BaconActor & {
    handleActorNodePress: (id: number, actorName: string) => void;
}


export function ActorButtonNode(props: ActorButtonNodeProps) {

    const { handleActorNodePress, id, name, characterName } = props;


    return (
        <NodeWrapper
            handleOnPress={handleActorNodePress}
            id={id}
            nameOrTitle={name}
            innerText={
                <Text>
                    <Ionicons name="person-circle-outline" size={24} color="black" />
                    {name} {`\n`}
                    <Text style={{ textAlign: 'right' }}>character: {characterName || 'unknown'}</Text>
                </Text>
            }
        />
    )
}
