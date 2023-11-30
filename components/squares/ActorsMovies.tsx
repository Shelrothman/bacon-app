import { View, Text, ScrollView } from 'react-native'
import { BaconFeatureList } from '../../types'

type ActorsMoviesProps = BaconFeatureList & {
    actorName: string;
}

export function ActorsMovies(props: ActorsMoviesProps) {

    // console.log('in actorsMovies comp', props)

    return (
        <View style={{ backgroundColor: 'orange' }}>
            <Text>Movies for {props.actorName}</Text>
            <ScrollView>
                {props.features.map((feature) => {
                    return (
                        <Text key={feature.id}>{feature.title} {`\n`} {`\t`}
                            character: {feature.characterName || 'N/A'}
                        </Text>
                    )
                })}
            </ScrollView>
        </View>
    )
}