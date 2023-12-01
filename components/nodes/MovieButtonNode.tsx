import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native';

import { BaconFeature } from '../../types'
import { NodeWrapper } from './NodeWrapper';

type MovieButtonNodeProps = BaconFeature & {
    handleMovieNodePress: (id: number, movieName: string) => void;
}


export function MovieButtonNode(props: MovieButtonNodeProps) {

    const { handleMovieNodePress, id, title, characterName } = props;


    return (
        <NodeWrapper
            handleOnPress={handleMovieNodePress}
            id={id}
            nameOrTitle={title}
            innerText={
                <Text>
                    <MaterialCommunityIcons name="movie-open" size={24} color="black" />
                    {title} {`\n`}
                    <Text style={{ textAlign: 'right' }}>character: {characterName || 'unknown'}</Text>
                </Text>
            }
        />
    )
}
