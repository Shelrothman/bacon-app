import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

import useGetData from '../../hooks/useGetData'
import { container_style, pressable_style, text_style } from '../../styles'
import { BaconActorList } from '../../types/api'
import { InfoModal } from '../InfoModal'
import { ActorButtonNode } from '../nodes/ActorButtonNode'

type MovieCastProps = BaconActorList & { title: string; };

export function MovieCast(props: MovieCastProps) {
    const { handleGetMoviesfromActorNode } = useGetData();
    const [ modalVisible, setModalVisible ] = useState(false);


    return (
        <View>
            {modalVisible && <InfoModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
            <View style={container_style.squareHeaderContainer}>
                <Pressable
                    style={({ pressed }) => [ {
                        opacity: pressed ? 0.5 : 1,
                        transform: [ { scale: pressed ? 0.95 : 1 } ],
                    }, pressable_style.titleInfoPressable
                    ]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={text_style.squareHeader}>{props.title}</Text>
                </Pressable>
            </View>
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