import { Pressable,ScrollView, Text, View } from 'react-native'

import { useAppContext } from '../../contexts/AppContext'
import { BaconFeatureList } from '../../types'

type ActorsMoviesProps = BaconFeatureList & {
    actorName: string;
}

export function ActorsMovies(props: ActorsMoviesProps) {

    const {
        getCast,
        setCurrentCardCast,
        setSquareState,
        setIsLoading,
        setCurrentMovieTitle
    } = useAppContext();

    const handleFeatureActorNodePress = (id: number, movieTitle: string) => {
        setIsLoading && setIsLoading(true);
        getCast && getCast(movieTitle).then((result) => {
            if (result) {
                setCurrentCardCast && setCurrentCardCast(result);
                setSquareState && setSquareState('movieCast');
                setCurrentMovieTitle && setCurrentMovieTitle(movieTitle);
            }
        }).finally(() => {
            setIsLoading && setIsLoading(false);
        });
    }

    return (
        <View >
            <Text>Movies for {props.actorName}</Text>
            <ScrollView>
                {/* TODO: a node component for each movie node */}
                {props.features.map((feature) => {
                    return (
                        <Pressable
                            onPress={() => handleFeatureActorNodePress(feature.id, feature.title)}
                            key={feature.id} id={feature.title} style={{ borderColor: 'blue', borderWidth: 1 }}
                        >

                            <Text key={feature.id}>{feature.title} {`\n`} {`\t`}
                                character: {feature.characterName || 'N/A'}
                            </Text>
                        </Pressable>
                    )
                })}
            </ScrollView>
        </View>
    )
}