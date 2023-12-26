import { Pressable, StyleSheet, Text, View } from 'react-native'

import { BaconMovieOption } from '../types'
// import { MovieButtonNode } from './nodes/MovieButtonNode'

type ResultListProps = {
    /** prob only need 5 - 7 at a time... */
    movieList: BaconMovieOption[];

}

/** 
 * @component - ResultList
 * @description - the rendered list of movie titles and their release date
 * rendered as a clickable list of options 
 * after the user has entered a movie title
 * to ensure they select the one they meant...
 * and/or give them options if they perhaps arent spelling it right
 */
export function ResultList(props: ResultListProps) {

    const { movieList } = props;

    return (
        <View style={styles.container}>
            <Text>Movie Suggestions: </Text>
            {movieList!.map((result) => {
                return (
                    // PICKUP: use similar to this node compoenernt but make a new component for the list item thats more custom that ussesd the same icon but like looks more clean like on reddit mobile search..
                    <Pressable key={result.id + ""} style={styles.pressable}>
                    {/* <MovieButtonNode
                        key={result.id}
                        id={result.id}
                        title={result.title}
                        characterName={result.release_date}
                        handleMovieNodePress={() => console.log('pressed')}
                    /> */}
                    <Text style={styles.text}>{result.title} -- {result.release_date}</Text>
                    </Pressable>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // position: 'absolute', // this should make it so pointer events dont go through it
        // backgroundColor: '#25292e',
        // width: '100%',
        // top: 0,
        // left: 0,
        // width: 100,
        // color: '#fff',
    },
    text: {
        color: '#bdb9ae',
    },
    pressable: {
        // paddingVertical: 5,
        borderWidth: .2,
    }
})