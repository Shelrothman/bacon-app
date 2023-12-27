import { Fontisto } from '@expo/vector-icons';
import { /* useEffect, */ useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'

import { useAppContext } from '../../contexts/AppContext';
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
        <View style={searchMode ? styles.containerWithSearch : styles.containerNoSearch}>
            <Text style={styles.text}>What Movie has you Curious?</Text>
            <View style={styles.inputContainer}>
                <Fontisto name="film" size={24} color="white" />
                <TextInput
                    style={styles.input}
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

const styles = StyleSheet.create({
    containerNoSearch: {
        justifyContent: 'space-evenly',
        flex: 1,
    },
    containerWithSearch: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    input: {
        width: 219,
        color: '#fff',
        paddingLeft: 10,
        fontFamily: 'Bacon-Script',
    },
    inputContainer: {
        backgroundColor: '#25292e',
        flexDirection: 'row',
        width: 300,
        height: 60,
        padding: 14,
        borderBottomWidth: 2,
        borderRadius: 18,
        marginTop: 15,
    },
    inputIcon: {
        alignSelf: 'center',
        marginRight: 12,
        width: 30,
    },
    text: {
        fontFamily: 'Bacon-Limelight',
        fontSize: 24,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});