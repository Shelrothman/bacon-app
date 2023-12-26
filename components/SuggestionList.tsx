import { StyleSheet, Text, View } from 'react-native'

import { BaconMovieOption } from '../types';
import { SuggestionNode } from './nodes/SuggestionNode';

type ResultListProps = {
    /** prob only need ~5... */
    movieList: BaconMovieOption[];
}

// PICKUP: todo NEXT::: get this being REAL DATA from the api and all the logic for it

/** 
 * @component - ResultList
 * @description - the rendered list of movie titles and their release date
 * rendered as a clickable list of options 
 * after the user has entered a movie title
 * to ensure they select the one they meant...
 * and/or give them options if they perhaps arent spelling it right
 */
export function SuggestionList(props: ResultListProps) {

    const { movieList } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Movie Suggestions: </Text>
            {movieList!.map((result) => {
                return (
                    <SuggestionNode 
                        key={result.id}
                        release_date={result.release_date}
                        title={result.title}
                        handleOnPress={() => console.log('pressed')}
                    />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        color: '#25292e',
        fontSize: 16,
        // fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        alignSelf: 'center',
    },
    container: {
        // backgroundColor: '#25292e',
        backgroundColor: 'transparent',
        borderBottomEndRadius: 18,
        borderBottomStartRadius: 18,
        alignItems: 'flex-start',
        width: 300,
    }
})