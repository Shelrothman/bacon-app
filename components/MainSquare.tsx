import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

// import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { ActorsMovies } from './squares/ActorsMovies';
import { MovieCast } from './squares/MovieCast';
import { MovieInput } from './squares/MovieInput';
import LoadingOverlay from './utils/LoadingOverlay';


/**
 * @component - MainSquare
 * the square that will hold one of the three states.
 */
export function MainSquare() {

    const { squareState, isLoading, currentCardCast, currentCardMovies, currentMovieTitle, currentActorName } = useAppContext();

    return (
        <KeyboardAvoidingView style={styles.square} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.square}>
                {isLoading ? <LoadingOverlay /> : (
                    squareState === 'actorsMovies' ? <ActorsMovies
                        id={currentCardMovies?.id || 0}
                        features={currentCardMovies?.features || []}
                        actorName={currentActorName || ''}
                    /> : squareState === 'movieCast' ? <MovieCast
                        id={currentCardCast?.id || 0}
                        actors={currentCardCast?.actors || []}
                        title={currentMovieTitle || ''}
                    /> : <MovieInput />
                )}
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    square: {
        width: 320,
        height: 440,
        borderRadius: 18,
        backgroundColor: '#4157be',
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