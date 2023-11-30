import { /*View*/ Button, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';

import { useAppContext } from '../contexts/AppContext';
import { MovieInput } from './squares/MovieInput';
import { MovieCast } from './squares/MovieCast';
import { ActorsMovies } from './squares/ActorsMovies';



/**
 * @component - MainSquare
 * the square that will hold one of the three states.
 */
export function MainSquare() {
    const { squareState, isLoading, currentCardCast, currentCardMovies, currentMovieTitle } = useAppContext();

    return (
        <KeyboardAvoidingView style={styles.square} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {/* <View style={styles.square} /> */}
            {squareState === 'movieInput' ? <MovieInput />
                : squareState === 'movieCast' ? <MovieCast
                    id={currentCardCast?.id || 0}
                    actors={currentCardCast?.actors || []}
                    title={currentMovieTitle || ''}
                />
                    : <ActorsMovies />}
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    square: {
        width: 320,
        height: 440,
        borderRadius: 18,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center', // vertically
    },
    input: {
        backgroundColor: '#25292e',
        borderRadius: 18,
        width: 300,
        height: 40,
        color: 'white',
        paddingLeft: 10,
    }
});