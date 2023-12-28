import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native'

import { useAppContext } from '../contexts/AppContext';
import useGetData from '../hooks/useGetData';
import { container_style } from '../styles';
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
    const { getSuggestions } = useAppContext();
    const [ suggestionList, setSuggestionList ] = useState<BaconMovieOption[]>([]);
    const { handleGetCast } = useGetData();

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

    return (
        <ScrollView style={container_style.suggestionListScrollView} keyboardDismissMode='on-drag'>
            <SearchInputNode
                pressHandler={() => handleGetCast(inputSearch, false)}
                inputSearch={inputSearch} />
            {suggestionList.map((result) => {
                return (
                    <SuggestionNode
                        key={result.id+result.title+result.release_date}
                        release_date={result.release_date}
                        title={result.title}
                        handleOnPress={() => handleGetCast(result.title, true)}
                    />
                )
            })}
            {(suggestionList && suggestionList.length >= 3) && <SearchInputNode
                inputSearch={inputSearch} pressHandler={() => handleGetCast(inputSearch, false)} 
            />}
        </ScrollView>
    )
}
