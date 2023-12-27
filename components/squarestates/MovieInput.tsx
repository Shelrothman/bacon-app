import { Fontisto } from '@expo/vector-icons';
import { /* useEffect, */ useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'

// import { results } from '../../api/mocked/optionsExampleRes'
import { useAppContext } from '../../contexts/AppContext';
// import { SquareHeader } from '../SquareHeader';
import { SuggestionList } from '../SuggestionList';

// TODO: [BUG] its not disappearing the list when input is less than 3...
// But only sometimes, so figure out the situation its happening in and fix it.

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
            <Text style={searchMode ? styles.textWithSearch : styles.text}>What Movie has you Curious?</Text>
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
                    onSubmitEditing={handleGetCast} // ok this solves that but now thereis like nothing when clicked out of input.
                    onBlur={() => {
                        setSearchMode(false); 
                        // info: the user can click if they dont hit the search on the keyboard. this leave itup to them
                    }}
                    onFocus={() => setSearchMode(true)}
                />
            </View>
            {movieInputTitle.length >= 3 && <SuggestionList
                // movieList={results}
                inputSearch={movieInputTitle}
            />}
            {/* TODO: */}
            {/* a list here of options if it cant be found.. TODO: handle it not being found on first search */}
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
        // vertically align the text to the top:
        // justifyContent: 'space-between',
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
    textWithSearch: {
        fontFamily: 'Bacon-Limelight',
        fontSize: 18,
        textAlign: 'center',
        // lineHeight: 20,
    },
});