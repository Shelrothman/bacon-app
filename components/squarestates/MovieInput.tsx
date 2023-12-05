import { Fontisto } from '@expo/vector-icons';
import { useState } from 'react';
import { Keyboard,StyleSheet, Text, TextInput, View } from 'react-native'

import { useAppContext } from '../../contexts/AppContext';
// import { SquareHeader } from '../SquareHeader';

// TODO: more user friendly for the submit, like maybe when keyboard is dismissed, or when the user presses the 'done' button on the keyboard...

export function MovieInput() {

    const { setSquareState, getCast, setIsLoading, setCurrentCardCast, } = useAppContext();
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
        <>
            <Text style={styles.text}>What Movie has you Curious?</Text>
            <View style={styles.inputContainer}>
            <Fontisto name="film" size={24} color="white" />
                <TextInput
                    style={styles.input}
                    placeholder="Enter a Movie Title..."
                    onChangeText={(text) => text.length > 1 && setMovieInputTitle(text)}
                    keyboardType='default'
                    placeholderTextColor={'#8e8e8e'}
                    returnKeyType="search"
                    onBlur={() => handleGetCast()}
                />
            </View>
            {/* a list here of options if it cant be found.. TODO: handle it not being found on first search */}
            {/* <Button
                title="Get Cast"
                onPress={() => handleGetCast()}
            /> */}
        </>
    )
}

const styles = StyleSheet.create({
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