import { MaterialCommunityIcons } from '@expo/vector-icons';

import { BaconFeature } from '../../types'
import { NodeWrapper } from './NodeWrapper';

type MovieButtonNodeProps = BaconFeature & {
    handleMovieNodePress: (id: number, movieName: string) => void;
}

// TODO: in here a link for opetion to open the movie in tmdb.com and in actor one too
// maybe u hold it down and it gives u the option to open it in a browser

export function MovieButtonNode(props: MovieButtonNodeProps) {

    const { handleMovieNodePress, id, title, characterName } = props;


    return (
        <NodeWrapper
            handleOnPress={handleMovieNodePress}
            id={id}
            nameOrTitle={title}
            backgrounds={[ '#e4d9ae', '#CBB967', '#BEA841', '#BA8E45' ]}
            characterName={characterName}
            innerText={<MaterialCommunityIcons name="theater" size={24} color="black" />}
        />
    )
}
