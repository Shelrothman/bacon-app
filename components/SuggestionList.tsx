import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native'

import { useAppContext } from '../contexts/AppContext';
import { pressable_style } from '../styles/PressableNode';
import { BaconMovieOption } from '../types';
import { SearchInputNode } from './nodes/SearchInputNode';
import { SuggestionNode } from './nodes/SuggestionNode';

type SuggestionListProps = {
    // movieList: BaconMovieOption[];
    inputSearch: string;
}

// TODO: remove all web dependencies from this whole project/

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
    const { getSuggestions, setIsLoading, getCast, setCurrentCardCast, setSquareState, setCurrentMovieTitle } = useAppContext();
    const [ suggestionList, setSuggestionList ] = useState<BaconMovieOption[]>([]);

    useEffect(() => {
        if (inputSearch.length < 3) setSuggestionList([]);
        else onLoad();
    }, [ inputSearch ]);

    const onLoad = () => {
        if (inputSearch.length < 3) setSuggestionList([]);
        getSuggestions && getSuggestions(inputSearch).then((results) => {
            setSuggestionList(results);
        }).finally(() => {
            // TODO: figure out if this is needed or not
            // setIsLoading && setIsLoading(false);
            return;
        });
    }

    // TODO: MUSt move this function that gets used in other places, to its own servicey file
    const handleSearchPress = (searchTitle: string) => {
        setIsLoading && setIsLoading(true);
        getCast && getCast(searchTitle).then((result) => {
            if (result) {
                setCurrentCardCast && setCurrentCardCast(result);
                setSquareState && setSquareState('movieCast');
                setCurrentMovieTitle && setCurrentMovieTitle(searchTitle);
            }
        }).finally(() => {
            setIsLoading && setIsLoading(false);
        });
    }

    return (
        <ScrollView style={styles.container} keyboardDismissMode='on-drag'>
            {/* <Text style={styles.header}>Search for "{inputSearch}" </Text> */}
            <SearchInputNode pressHandler={handleSearchPress} inputSearch={inputSearch} />
            {suggestionList.map((result) => {
                return (
                    <SuggestionNode
                        key={result.id}
                        release_date={result.release_date}
                        title={result.title}
                        handleOnPress={() => handleSearchPress(result.title)}
                    />
                )
            })}
            {(suggestionList && suggestionList.length >= 3) && <SearchInputNode
                inputSearch={inputSearch} pressHandler={handleSearchPress}
            />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#25292e',
        backgroundColor: 'transparent',
        borderBottomEndRadius: 18,
        borderBottomStartRadius: 18,
        // alignItems: 'flex-start',
        width: 300,
    }
})