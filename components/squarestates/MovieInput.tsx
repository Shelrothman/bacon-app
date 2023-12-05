import { Fontisto } from '@expo/vector-icons';
import { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'

import { results } from '../../api/mocked/optionsExampleRes'
import { useAppContext } from '../../contexts/AppContext';
// import { SquareHeader } from '../SquareHeader';

// TODO: more user friendly for the submit, like maybe when keyboard is dismissed, or when the user presses the 'done' button on the keyboard...

const ResultList = () => {


    return (
        <View>
            {results.map((result) => {
                return (
                    <Text key={result.id+""}>{result.title}</Text>
                )
            })}
        </View>
    )
};

export function MovieInput() {

    const { setSquareState, getCast, setIsLoading, setCurrentCardCast, } = useAppContext();
    const [ movieInputTitle, setMovieInputTitle ] = useState<string>('');
    /**search mode is visible while the keyboard is open and user is finding their movie */
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
            {!searchMode && <Text style={styles.text}>What Movie has you Curious?</Text>}
            <View style={styles.inputContainer}>
                <Fontisto name="film" size={24} color="white" />
                <TextInput
                    style={styles.input}
                    placeholder="Enter a Movie Title..."
                    onChangeText={(text) => text.length > 1 && setMovieInputTitle(text)}
                    keyboardType='default'
                    placeholderTextColor={'#8e8e8e'}
                    returnKeyType="search"
                    onBlur={() => {
                        setSearchMode(false);
                        handleGetCast();
                    }}
                    onFocus={() => setSearchMode(true)}
                />
            </View>
            {searchMode && <ResultList />}

            {/* {searchMode && <FlatList
                    data={results}
                    renderItem={({ item }) => <Text>{item.title}--{item.release_date}</Text>}
                    keyExtractor={(item) => item.id.toString()}
                />} */}

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