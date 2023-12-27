import { MaterialCommunityIcons } from '@expo/vector-icons'; 

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
            backgrounds={[ '#bee9cc', '#67CB87', '#41be69', '#4EA83A' ]}
            characterName={characterName}
            innerIcon={<MaterialCommunityIcons name="movie-open-star" size={26} color="black" />}
        />
    )
}
