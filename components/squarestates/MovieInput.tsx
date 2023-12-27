import { Fontisto } from '@expo/vector-icons';
import { /* useEffect, */ useState } from 'react';
import { Text, TextInput, View } from 'react-native'

import useGetData from '../../hooks/useGetCast';
import { container_style, text_style } from '../../styles';
import { SuggestionList } from '../SuggestionList';


// fixme: i dont like how the coloring is seen as missing after hitting search...
// maybe need it to be a dropdown list of valid movie titles to be picked from dynamically as the user types?
// info: maybe look in App.tsx usage of KeyboardAvoidingView

export function MovieInput() {

    // const { setSquareState, getCast, setIsLoading, setCurrentCardCast, setCurrentMovieTitle } = useAppContext();
    const [ movieInputTitle, setMovieInputTitle ] = useState<string>('');
    const [ searchMode, setSearchMode ] = useState<boolean>(false);

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
                    autoCapitalize='none'
                    onChangeText={(text) => setMovieInputTitle(text)}
                    // keyboardType='default'
                    placeholderTextColor={'#8e8e8e'}
                    clearButtonMode='while-editing'
                    returnKeyType="search"
                    onSubmitEditing={() => handleGetCast(movieInputTitle, false)}
                    // info: the user can click if they dont hit the search on the keyboard. this leave itup to them
                    onBlur={() => setSearchMode(false)}
                    onFocus={() => setSearchMode(true)}
                />
            </View>
            {/* todo future: perhaps also will need a list for the user if their movie isnt found, will wait on feedback for if this way just with swuggestions is intuitive enough */}
            {movieInputTitle.length >= 3 && <SuggestionList
                inputSearch={movieInputTitle}
            />}
        </View>
    )
}