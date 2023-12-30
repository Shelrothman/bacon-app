import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native'

import useGetData from '../hooks/useGetData';
import { container_style } from '../styles';
import { BaconMovieOption } from '../types';
import { SearchInputNode } from './nodes/SearchInputNode';
import { SuggestionNode } from './nodes/SuggestionNode';

type SuggestionListProps = { inputSearch: string; };

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
    const [ suggestionList, setSuggestionList ] = useState<BaconMovieOption[]>([]);
    const { handleGetCast, getSuggestions } = useGetData();

    useEffect(() => {
        if (inputSearch.length < 3) setSuggestionList([]);
        else onLoad();
    }, [ inputSearch ]);

    const onLoad = () => {
        if (inputSearch.length < 3) setSuggestionList([]);
        getSuggestions && getSuggestions(inputSearch).then((results) => {
            setSuggestionList(results);
        }).finally(() => {
            return;
        });
    }

    return (
        <ScrollView style={container_style.suggestionListScrollView} keyboardDismissMode='on-drag' keyboardShouldPersistTaps='handled'>
            <SearchInputNode
                pressHandler={() => handleGetCast(inputSearch, false, true)}
                inputSearch={inputSearch} />
            {suggestionList.map((result) => {
                return (
                    <SuggestionNode
                        key={result.id + result.title + result.release_date}
                        release_date={result.release_date}
                        title={result.title}
                        handleOnPress={() => handleGetCast(result.title, true, true)}
                    />
                )
            })}
            {(suggestionList && suggestionList.length >= 3) && <SearchInputNode
                inputSearch={inputSearch} pressHandler={() => handleGetCast(inputSearch, false, true)}
            />}
        </ScrollView>
    )
}
