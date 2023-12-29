import { Fontisto, Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native'

import { useAppContext } from '../../contexts/AppContext';
import useGetData from '../../hooks/useGetData';
import { container_style, pressable_style, text_style } from '../../styles';
import { SuggestionList } from '../SuggestionList';

export function MovieInput() {

    const [ searchMode, setSearchMode ] = useState<boolean>(false);
    const { movieInputTitle, setMovieInputTitle } = useAppContext();
    const { handleGetCast } = useGetData();

    return (
        <View style={searchMode ? container_style.containerWithSearch : container_style.containerNoSearch}>
            <Text style={text_style.movieInputHeader}>What Movie has You Curious?</Text>
            <View style={container_style.inputContainer}>
                <Fontisto name="film" size={24} color="white" />
                <TextInput
                    style={text_style.textInput}
                    placeholder="Enter Movie Title..."
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(text) => setMovieInputTitle!(text)}
                    value={movieInputTitle}
                    placeholderTextColor={'#8e8e8e'}
                    returnKeyType="search"
                    // TODO fixme: the extra tap the user has top do if clicking on one of the suggestions or clicking on the x.
                    onSubmitEditing={() => handleGetCast(movieInputTitle!, false, true)}
                    // info: the user can click if they dont hit the search on the keyboard. this leave itup to them
                    onBlur={() => setSearchMode(false)}
                    onFocus={() => setSearchMode(true)}
                />
                {movieInputTitle!.length >= 1 && <Pressable
                    onPress={() => setMovieInputTitle!('')}
                    style={pressable_style.clearButtonParent}
                >
                    <Octicons name="x-circle-fill" size={20} color={"#8e8e8e"} />
                </Pressable>}
            </View>
            {/* todo future: perhaps also will need a list for the user if their movie isnt found, will wait on feedback for if this way just with swuggestions is intuitive enough */}
            {movieInputTitle!.length >= 3 && <SuggestionList
                inputSearch={movieInputTitle!}
            />}
        </View>
    )
}