import { Pressable, StyleSheet, Text, View } from 'react-native'

import { pressable_style } from '../styles/PressableNode';
import { BaconMovieOption } from '../types';

type ResultListProps = {
    /** prob only need ~5... */
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
export function SuggestionList(props: ResultListProps) {

    const { movieList } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Movie Suggestions: </Text>
            {movieList!.map((result) => {
                return (
                    // PICKUP: use similar to this node compoenernt but make a new component for the list item thats more custom that ussesd the same icon but like looks more clean like on reddit mobile search..
                    <Pressable key={result.id + ""}
                        // style={styles.pressable}
                        onPress={() => {
                            console.log('suggestion pressed');
                        }}
                        style={({ pressed }) => [ { opacity: pressed ? 0.5 : 1, transform: [ { scale: pressed ? 0.95 : 1 } ] }, pressable_style.suggestionLst ]}

                    >
                        <Text>
                            <Text style={styles.text}>{result.title} {`\n`}</Text>
                            <Text style={styles.releaseYear}>{`\t\t`}{result.release_date}</Text>
                        </Text>
                    </Pressable>
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
    },
    text: {
        color: '#25292e',
        fontWeight: 'bold',
    },
    releaseYear: {
        color: '#2d3557',
    },
})