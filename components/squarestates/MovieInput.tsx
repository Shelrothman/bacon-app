import { Fontisto } from '@expo/vector-icons';
import { /* useEffect, */ useState } from 'react';
import { Keyboard, Text, TextInput, View } from 'react-native'

import { useAppContext } from '../../contexts/AppContext';
import { container_style, text_style } from '../../styles';
import { SuggestionList } from '../SuggestionList';


export function MovieInput() {

    const { setSquareState, getCast, setIsLoading, setCurrentCardCast } = useAppContext();
    // TODO: and then a useEffect to render the suggestions list if it has a value greater than 3 and is not the same as the last one?... or based on like a few seconds of no typing?......
    const [ movieInputTitle, setMovieInputTitle ] = useState<string>('');
    const [ searchMode, setSearchMode ] = useState<boolean>(false);

    const handleGetCast = () => {
        if (movieInputTitle.length < 1) return;
        Keyboard.dismiss(); // fixme: i dont like how the coloring is seen as missing after hitting search...
        // maybe need it to be a dropdown list of valid movie titles to be picked from dynamically as the user types?
        // info: maybe look in App.tsx usage of KeyboardAvoidingView
        setIsLoading && setIsLoading(true);
        getCast && getCast(movieInputTitle).then((result) => {
            if (result) {
                setCurrentCardCast && setCurrentCardCast(result);
                setSquareState && setSquareState('movieCast');
            }
        }).finally(() => {
            setIsLoading && setIsLoading(false);
        });
    }

    return (
        <View style={searchMode ? container_style.containerWithSearch : container_style.containerNoSearch}>
            <Text style={text_style.movieInputHeader}>What Movie has you Curious?</Text>
            <View style={container_style.inputContainer}>
                <Fontisto name="film" size={24} color="white" />
                <TextInput
                    style={text_style.textInput}
                    placeholder="Enter Movie Title..."
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={(text) => setMovieInputTitle(text)}
                    keyboardType='default'
                    placeholderTextColor={'#8e8e8e'}
                    clearButtonMode='while-editing'
                    returnKeyType="search"
                    onSubmitEditing={handleGetCast}
                    // info: the user can click if they dont hit the search on the keyboard. this leave itup to them
                    onBlur={() => setSearchMode(false)}
                    onFocus={() => setSearchMode(true)}
                />
            </View>
            {movieInputTitle.length >= 3 && <SuggestionList
                inputSearch={movieInputTitle}
            />}
        </View>
    )
}