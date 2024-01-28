import { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import useGetData from '../../hooks/useGetData'
import { BaconActorList } from '../../types/api'
import { InfoModal } from '../InfoModal'
import { ActorButtonNode } from '../nodes/ActorButtonNode'
import { SquareHeader } from '../SquareHeader'
import { useAppContext } from '../../contexts/AppContext'
import { modal_styles } from '../../styles/Modal'

type MovieCastProps = BaconActorList & { title: string; };

export function MovieCast(props: MovieCastProps) {
    const [ modalVisible, setModalVisible ] = useState(false);
    const { currentMovieTitle, currentMovieOverview, currentMovieReleaseDate } = useAppContext();
    const { handleGetMoviesfromActorNode } = useGetData();


    return (
        <View>
            {modalVisible && <InfoModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                innerContent={<>
                    <Text style={modal_styles.movieTitle}>{currentMovieTitle}</Text>
                    <Text style={modal_styles.releaseDate}>{currentMovieReleaseDate}</Text>
                    <Text style={modal_styles.movieOverview}>{currentMovieOverview}</Text>
                </>}
            />}
            <SquareHeader title={props.title} setModalVisible={setModalVisible} />
            <ScrollView showsVerticalScrollIndicator={true}>
                {props.actors.map((actor) => {
                    return (
                        <ActorButtonNode
                            key={actor.id + actor.name + actor.characterName}
                            id={actor.id}
                            name={actor.name}
                            characterName={actor.characterName}
                            handleActorNodePress={() => handleGetMoviesfromActorNode(actor.id, actor.name, true)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}