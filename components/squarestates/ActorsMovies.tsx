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
    const { handleGetCastAndSetMovieInfoWithTitle } = useGetData();

    const uriSource = currentActorHref
        ? { uri: `https://image.tmdb.org/t/p/w185${currentActorHref}`, cache: 'force-cache' }
        : require('../../assets/unavailablecon.jpg');

    return (
        <View >
            {modalVisible && <InfoModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                innerContent={<View style={modal_styles.actorModalContainer}>
                    <Image
                        source={uriSource}
                        style={modal_styles.image}
                        defaultSource={require('../../assets/loadcon.png')}
                    />
                    <Text style={modal_styles.actorName}>{'\n'}{props.actorName}</Text>
                </View>}
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
                            handleMovieNodePress={() => handleGetCastAndSetMovieInfoWithTitle(feature.title, true)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}