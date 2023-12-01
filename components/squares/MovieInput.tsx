import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'

import { useAppContext } from '../../contexts/AppContext';

export function MovieInput() {

    const { setSquareState, getCast, setIsLoading, setCurrentCardCast, } = useAppContext();
    const [ movieInputTitle, setMovieInputTitle ] = useState<string>('');

    const handleGetCast = () => {
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
            <Text>Enter Movie Name: </Text>
            <TextInput
                style={styles.input}
                placeholder="Movie Name"
                onChangeText={(text) => setMovieInputTitle(text)}
                keyboardType='default'
                placeholderTextColor={'#8e8e8e'}
                returnKeyType="done"
            />
            <Button
                title="Get Cast"
                onPress={() => handleGetCast()}
            />
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#25292e',
        borderRadius: 18,
        width: 300,
        height: 40,
        color: '#fff',
        paddingLeft: 10,
    }
});