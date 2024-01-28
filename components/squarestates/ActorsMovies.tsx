import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import useGetData from '../../hooks/useGetData'
import { BaconFeatureList } from '../../types/api'
import { MovieButtonNode } from '../nodes/MovieButtonNode'
import { SquareHeader } from '../SquareHeader'
import { InfoModal } from '../InfoModal'

type ActorsMoviesProps = BaconFeatureList & { actorName: string; };

export function ActorsMovies(props: ActorsMoviesProps) {
    const [ modalVisible, setModalVisible ] = useState(false);

    const { handleGetCast } = useGetData();

    return (
        <View >
            {modalVisible && <InfoModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
            <SquareHeader title={`${props.actorName} Movies`} setModalVisible={setModalVisible} />
            <ScrollView showsVerticalScrollIndicator={true}>
                {props.features.map((feature) => {
                    return (
                        <MovieButtonNode
                            key={feature.id + feature.title + feature.characterName}
                            id={feature.id}
                            title={feature.title}
                            characterName={feature.characterName}
                            handleMovieNodePress={() => handleGetCast(feature.title, true, true)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}