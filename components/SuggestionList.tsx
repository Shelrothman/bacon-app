import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native'

import useGetData from '../hooks/useGetData';
import { container_style } from '../styles';
import { BaconMovieOption, BaconActorOption } from '../types/api';
import { SearchInputNode } from './nodes/SearchInputNode';
import { SuggestionNode } from './nodes/SuggestionNode';
// import { useQuery } from "@tanstack/react-query"; TODO: apply tanstack-query if needed after first release feedback.

type SuggestionListProps = {
    inputSearch: string;
    /** either movieInput or actorInput */
    inputMode: string;
};

/** 
 * @component - SuggestionList
 * @description - the rendered list of movie titles and their release date
 * rendered as a clickable list of options 
 * after the user has entered a movie title
 * to ensure they select the one they meant...
 * and/or give them options if they perhaps arent spelling it right
 */
export function SuggestionList(props: SuggestionListProps) {

    const { inputSearch, inputMode } = props;
    const [ movieSuggestionList, setMovieSuggestionList ] = useState<BaconMovieOption[]>([]);
    const [ actorSuggestionList, setActorSuggestionList ] = useState<BaconActorOption[]>([]);
    const {
        handleGetCastAndSetMovieInfoWithTitle,
        getCastAndSetMovieInfoWithId,
        getMovieSuggestions,
        getActorSuggestions,
        handleGetMoviesfromActorNode
    } = useGetData();

    useEffect(() => {
        if (inputSearch.length < 3) setMovieSuggestionList([]);
        else onLoad();
    }, [ inputSearch ]);

    const onLoad = () => {
        if (inputSearch.length < 3) return setMovieSuggestionList([]);
        if (inputMode === 'movieInput') {
            getMovieSuggestions && getMovieSuggestions(inputSearch).then((results) => {
                setMovieSuggestionList(results);
            }).finally(() => void 0);
            // if (suggestions) setMovieSuggestionList(suggestions);
        }
        getActorSuggestions && getActorSuggestions(inputSearch).then((results) => {
            setActorSuggestionList(results);
        }).finally(() => void 0);
    }

    const renderSearchInputNode = () => <SearchInputNode
        inputSearch={inputSearch}
        pressHandler={() => handleGetCastAndSetMovieInfoWithTitle(inputSearch, true)}
    />

    return (
        <ScrollView style={container_style.suggestionListScrollView} keyboardDismissMode='on-drag' keyboardShouldPersistTaps='handled'>
            {renderSearchInputNode()}
            {inputMode === 'movieInput' ? movieSuggestionList.map(result => <SuggestionNode
                key={result.id + result.title}
                release_date={result.release_date}
                title={result.title}
                inputMode={0}
                handleOnPress={() => getCastAndSetMovieInfoWithId(result.id)}
            />) : actorSuggestionList.map(result => <SuggestionNode
                key={result.id + result.name}
                title={result.name}
                inputMode={1}
                known_for={result.most_known_for}
                handleOnPress={() => handleGetMoviesfromActorNode(result.id, result.name, true)}
            />)}
            {((movieSuggestionList && movieSuggestionList.length >= 3)
                || (actorSuggestionList && actorSuggestionList.length >= 3))
                && renderSearchInputNode()}
        </ScrollView>
    )
}
