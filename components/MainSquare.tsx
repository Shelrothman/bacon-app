import { LinearGradient } from 'expo-linear-gradient';
// import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

// import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { ActorsMovies } from './squarestates/ActorsMovies';
import { MovieCast } from './squarestates/MovieCast';
import { MovieInput } from './squarestates/MovieInput';
import LoadingOverlay from './utils/LoadingOverlay';

/**
 * @component - MainSquare
 * the square that will hold one of the three states.
 */
export function MainSquare() {

    const { squareState, isLoading, currentCardCast, currentCardMovies, currentMovieTitle, currentActorName } = useAppContext();

    return (
        <View style={styles.shadowProp}>
            <LinearGradient
                colors={[ '#6779cb', '#4157be', '#4158BE' ]}
                style={styles.square}
            >
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
            </LinearGradient>
        </View>
    );
}


const styles = StyleSheet.create({
    square: {
        // width: "95%",
        width: 350,
        height: 540,
        borderRadius: 18,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 10,
        flexDirection: 'column',

    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 7 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
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