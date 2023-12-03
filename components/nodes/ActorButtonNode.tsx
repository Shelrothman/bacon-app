import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// import { FontAwesome5 } from '@expo/vector-icons';
// <FontAwesome5 name="theater-masks" size={24} color="black" />
// import { MaterialIcons } from '@expo/vector-icons';
//  import { FontAwesome } from '@expo/vector-icons'; 
//<FontAwesome name="star-o" size={24} color="black" />
//  <MaterialIcons name="theater-comedy" size={24} color="black" />
// import { LinearGradient } from 'expo-linear-gradient';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Text } from 'react-native'
import { BaconActor } from '../../types'
import { NodeWrapper } from './NodeWrapper';

type ActorButtonNodeProps = BaconActor & {
    handleActorNodePress: (id: number, actorName: string) => void;
}


export function ActorButtonNode(props: ActorButtonNodeProps) {

    const { handleActorNodePress, id, name, characterName } = props;
    //#BEA841

    return (

        <NodeWrapper
            handleOnPress={handleActorNodePress}
            id={id}
            nameOrTitle={name}
            // backgrounds={[ '#e4d9ae', '#CBB967', '#BEA841', '#BA8E45' ]}
            backgrounds={[ '#bee9cc', '#67CB87', '#41be69', '#4EA83A' ]}
            characterName={characterName}
            innerText={<MaterialCommunityIcons name="movie-star-outline" size={24} color="black" />}
        />
    )
}
