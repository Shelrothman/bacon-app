import { useState } from 'react'
import { ScrollView, View } from 'react-native'

import useGetData from '../../hooks/useGetData'
import { BaconActorList } from '../../types/api'
import { InfoModal } from '../InfoModal'
import { ActorButtonNode } from '../nodes/ActorButtonNode'
import { SquareHeader } from '../SquareHeader'

type MovieCastProps = BaconActorList & { title: string; };

export function MovieCast(props: MovieCastProps) {
    const { handleGetMoviesfromActorNode } = useGetData();
    const [ modalVisible, setModalVisible ] = useState(false);


    return (
        <View>
            {modalVisible && <InfoModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
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