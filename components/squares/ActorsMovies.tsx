import { View, Text, ScrollView, Pressable } from 'react-native'
import { BaconFeatureList } from '../../types'
import { useAppContext } from '../../contexts/AppContext'

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
        <View style={{ backgroundColor: 'orange' }}>
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