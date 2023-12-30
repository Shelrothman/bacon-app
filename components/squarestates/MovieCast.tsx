import { useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'

import useGetData from '../../hooks/useGetData'
import { BaconActorList } from '../../types'
import { InfoModal } from '../InfoModal'
import { ActorButtonNode } from '../nodes/ActorButtonNode'
import { SquareHeader } from '../SquareHeader'
type MovieCastProps = BaconActorList & { title: string; };

export function MovieCast(props: MovieCastProps) {
    const { handleGetMovies } = useGetData();
    const [ modalVisible, setModalVisible ] = useState(false);


    // if (modalVisible) return 
    return (
        <View>
            {modalVisible && <InfoModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
            <Pressable
                onLongPress={() => setModalVisible(true)}
                // onPress={() => Alert.alert('TODO: add info modal')}
            >
                <SquareHeader title={`Cast of ${props.title}`} />
            </Pressable>
            <ScrollView showsVerticalScrollIndicator={true}>
                {props.actors.map((actor) => {
                    return (
                        <ActorButtonNode
                            key={actor.id + actor.name + actor.characterName}
                            id={actor.id}
                            name={actor.name}
                            characterName={actor.characterName}
                            handleActorNodePress={() => handleGetMovies(actor.id, actor.name, true)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}