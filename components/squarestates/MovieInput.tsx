import { Fontisto } from '@expo/vector-icons';
import { /* useEffect, */ useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'

import { results } from '../../api/mocked/optionsExampleRes'
import { useAppContext } from '../../contexts/AppContext';
// import { SquareHeader } from '../SquareHeader';
import { SuggestionList } from '../SuggestionList';


export function MovieInput() {

    const { setSquareState, getCast, setIsLoading, setCurrentCardCast, searchMode, setSearchMode } = useAppContext();
    const [ movieInputTitle, setMovieInputTitle ] = useState<string>('');


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
            {!searchMode && <Text style={styles.text}>What Movie has you Curious?</Text>}
            <View style={styles.inputContainer}>
                <Fontisto name="film" size={24} color="white" />
                <TextInput
                    style={styles.input}
                    placeholder="Enter a Movie Title..."
                    onChangeText={(text) => text.length > 1 && setMovieInputTitle(text)}
                    keyboardType='default'
                    placeholderTextColor={'#8e8e8e'}
                    clearButtonMode='while-editing'
                    returnKeyType="search"
                    onSubmitEditing={handleGetCast} // ok this solves that but now thereis like nothing when clicked out of input.
                    onBlur={() => {
                        setSearchMode!(false); // Dont let it blur?
                        // ???: maybe consider turning this on OR just having a buttton for if they blur without srarching?/choosing a suggestion...
                        // handleGetCast();
                    }}
                    onFocus={() => setSearchMode!(true)}
                />
            </View>
            {(searchMode && movieInputTitle.length >= 3) && <SuggestionList
                movieList={results}
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
    }
});