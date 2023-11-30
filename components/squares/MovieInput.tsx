import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import { useAppContext } from '../../contexts/AppContext';

export function MovieInput() {

    const {
        // squareState,
        setSquareState,
        getCast,
        // getMovies,
        // isLoading,
        setIsLoading,
        // currentCardCast,
        setCurrentCardCast,
    } = useAppContext();


    const handleGetCast = () => {
        // console.log('get cast');
        setIsLoading && setIsLoading(true);
        getCast && getCast('The Matrix').then((result) => {
            if (result) {
                // console.log(result);
                // TODO: the result to send to the next square....
                setCurrentCardCast && setCurrentCardCast(result);
                setSquareState && setSquareState('movieCast');
            }
        }).finally(() => {
            setIsLoading && setIsLoading(false);
        });
    }

    return (
        <View>
            <Text>Enter Movie Name: </Text>
            <TextInput
                style={styles.input}
                placeholder="Movie Name"
                // onChangeText={onChangeText}
                keyboardType='default'
                placeholderTextColor={'#fff'}
                returnKeyType="done"
            />
            <Button
                title="Get Cast"
                onPress={() => handleGetCast()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#25292e',
        borderRadius: 18,
        width: 300,
        height: 40,
        color: 'white',
        paddingLeft: 10,
    }
});