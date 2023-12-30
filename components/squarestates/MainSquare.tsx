import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

import { useAppContext } from '../../contexts/AppContext';
import { container_style } from '../../styles';
import LoadingOverlay from '../utils/LoadingOverlay';
import { ActorsMovies } from './ActorsMovies';
import { MovieCast } from './MovieCast';
import { MovieInput } from './MovieInput';

/**
 * @component - MainSquare
 * the square that will hold one of the three states.
 */
export function MainSquare() {

    const { squareState, isLoading, currentCardCast, currentCardMovies, currentMovieTitle, currentActorName } = useAppContext();

    return (
        <View style={container_style.shadowProp}>
            <LinearGradient
                colors={[ '#6779cb', '#4157be', '#4158BE' ]}
                style={container_style.mainSquare}
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
                    /> : squareState === 'movieInput' ? <MovieInput /> : null
                )}
            </LinearGradient>
        </View>
    );
}
