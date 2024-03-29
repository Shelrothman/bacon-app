import { MaterialCommunityIcons } from '@expo/vector-icons';

import { BaconMovie } from '../../types/api'
import { NodeWrapper } from './NodeWrapper';

type MovieButtonNodeProps = BaconMovie & {
    characterName: string | undefined;
    handleMovieNodePress: (id: number, movieName: string) => void;
}

export function MovieButtonNode(props: MovieButtonNodeProps) {

    const { handleMovieNodePress, id, title, characterName } = props;


    return (
        <NodeWrapper
            handleOnPress={handleMovieNodePress}
            id={id}
            nameOrTitle={title}
            backgrounds={[ '#e4d9ae', '#CBB967', '#BEA841', '#BA8E45' ]}
            characterName={characterName ? characterName : ''}
            innerIcon={<MaterialCommunityIcons name="theater" size={26} color="black" />}
        />
    )
}
