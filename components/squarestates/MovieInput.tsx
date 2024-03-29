import { Fontisto, Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native'

import { useAppContext } from '../../contexts/AppContext';
import useGetData from '../../hooks/useGetData';
import { container_style, pressable_style, text_style } from '../../styles';
import { SuggestionList } from '../SuggestionList';
import { ActorMovieSwitch } from '../utils/ActorMovieSwitch';

export function MovieInput() {

    const [ searchMode, setSearchMode ] = useState<boolean>(false);
    const { inputTitle, setInputTitle, squareState } = useAppContext();
    const { handleGetCastAndSetMovieInfoWithTitle: handleGetCast, handleGetMoviesFromInput } = useGetData();

    const handleSubmit = () => {
        if (squareState === 'movieInput') return handleGetCast(inputTitle!, true);
        return handleGetMoviesFromInput(inputTitle!, true);
    }

    return (
        <View style={searchMode ? container_style.containerWithSearch : container_style.containerNoSearch}>
            <Text style={text_style.movieInputHeader}>
                {squareState === 'movieInput'
                    ? 'What Movie has You Curious?'
                    : 'Who is in the Movie?'
                }
            </Text>
            <View style={container_style.inputContainer}>
                <Fontisto name="film" size={24} color="white" />
                <TextInput
                    style={text_style.textInput}
                    placeholder={`Enter ${squareState === 'movieInput' ? 'Movie Title' : 'Actor Name'}...`}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(text) => setInputTitle!(text)}
                    value={inputTitle}
                    placeholderTextColor={'#8e8e8e'}
                    returnKeyType="search"
                    onSubmitEditing={() => handleSubmit()}
                    /* info: the user can click if they dont hit the search on the keyboard. this leave itup to them */
                    onBlur={() => setSearchMode(false)}
                    onFocus={() => setSearchMode(true)}
                />
                {inputTitle!.length >= 1 && <Pressable
                    onPress={() => setInputTitle!('')}
                    style={pressable_style.clearButtonParent}
                >
                    <Octicons name="x-circle-fill" size={20} color={"#8e8e8e"} />
                </Pressable>}
            </View>
            <ActorMovieSwitch />
            {inputTitle!.length >= 3 && <SuggestionList inputSearch={inputTitle!} inputMode={squareState!} />}
        </View>
    )
}