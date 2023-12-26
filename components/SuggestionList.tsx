import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native'

import { useAppContext } from '../contexts/AppContext';
import { pressable_style } from '../styles/PressableNode';
import { BaconMovieOption } from '../types';
import { SuggestionNode } from './nodes/SuggestionNode';

type SuggestionListProps = {
    /** prob only need ~5... */
    // movieList: BaconMovieOption[];
    inputSearch: string;
}

// TODO: remove all web dependencies from this whole project/

// PICKUP: todo NEXT::: get this being REAL DATA from the api and all the logic for it

/** 
 * @component - SuggestionList
 * @description - the rendered list of movie titles and their release date
 * rendered as a clickable list of options 
 * after the user has entered a movie title
 * to ensure they select the one they meant...
 * and/or give them options if they perhaps arent spelling it right
 */
export function SuggestionList(props: SuggestionListProps) {

    const { inputSearch } = props;
    const { getSuggestions /* , setIsLoading  */ } = useAppContext();
    const [ suggestionList, setSuggestionList ] = useState<BaconMovieOption[]>([]);

    useEffect(() => {
        onLoad();
    }, [ inputSearch ]);

    const onLoad = () => {
        // setIsLoading && setIsLoading(true); ???:
        // if (inputSearch.length < 3) return; this is handed already in parent.
        // console.log('pressed');
        getSuggestions && getSuggestions(inputSearch).then((results) => {
            // console.log(results);
            setSuggestionList(results);

        }).finally(() => {
            // setIsLoading && setIsLoading(false);
        });
    }

    return (
        <ScrollView style={styles.container}
        // it just sucks that it doesnt work for areas outside of the scrollview... but i guess thats the point of the scrollview...
            keyboardDismissMode='on-drag'
            // keyboardDismissMode='interactive'
            // showsVerticalScrollIndicator={false}
        // keyboardShouldPersistTaps='handled' // the keyboard will not dismiss automatically, and the scroll view will not catch taps, but children of the scroll view can catch taps.
        >
            <Pressable
                style={({ pressed }) => [ {
                    opacity: pressed ? 0.5 : 1,
                    transform: [ { scale: pressed ? 0.95 : 1 } ]
                }, pressable_style.suggestionLst ]}
            >
                <Text style={styles.header}>Search for "{inputSearch}" </Text>
            </Pressable>
            {suggestionList.map((result) => {
                return (
                    <SuggestionNode
                        key={result.id}
                        release_date={result.release_date}
                        title={result.title}
                        handleOnPress={() => console.log('pressed')}
                    // handleOnPress={handlePress}
                    />
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        color: '#25292e',
        fontSize: 16,
        // fontWeight: 'bold',
        marginBottom: 5,
        // textAlign: 'center',
        // alignSelf: 'center',
        textAlign: 'right',
    },
    container: {
        // backgroundColor: '#25292e',
        backgroundColor: 'transparent',
        borderBottomEndRadius: 18,
        borderBottomStartRadius: 18,
        // alignItems: 'flex-start',
        width: 300,
    }
})