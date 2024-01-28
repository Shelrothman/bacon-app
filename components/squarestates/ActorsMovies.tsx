import { useState } from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import useGetData from '../../hooks/useGetData'
import { BaconFeatureList } from '../../types/api'
import { MovieButtonNode } from '../nodes/MovieButtonNode'
import { SquareHeader } from '../SquareHeader'
import { InfoModal } from '../InfoModal'
import { useAppContext } from '../../contexts/AppContext'
import { modal_styles } from '../../styles/Modal'

type ActorsMoviesProps = BaconFeatureList & { actorName: string; };

export function ActorsMovies(props: ActorsMoviesProps) {

    const [ modalVisible, setModalVisible ] = useState(false);
    const { currentActorHref } = useAppContext();
    const { handleGetCast } = useGetData();

    return (
        <View >
            {modalVisible && <InfoModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                innerContent={<><Image
                    source={{ uri: `https://image.tmdb.org/t/p/w185${currentActorHref}` }}
                    style={modal_styles.image} />
                    <Text style={modal_styles.movieOverview}>{props.actorName}</Text>
                </>}
            />}
            <SquareHeader
                title={`${props.actorName} Movies`}
                setModalVisible={setModalVisible}
            />
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