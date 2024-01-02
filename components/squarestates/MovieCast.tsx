import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

import useGetData from '../../hooks/useGetData'
import { container_style, pressable_style, text_style } from '../../styles'
import { BaconActorList } from '../../types'
import { InfoModal } from '../InfoModal'
import { ActorButtonNode } from '../nodes/ActorButtonNode'
// import { SquareHeader } from '../SquareHeader'

type MovieCastProps = BaconActorList & { title: string; };

// PICKUP:::: here.
// BUG: when the title of the movie is long, it like overflows and looks bad and looks like its zoomed in
// FIXME:

export function MovieCast(props: MovieCastProps) {
    const { handleGetMovies } = useGetData();
    const [ modalVisible, setModalVisible ] = useState(false);


    return (
        <View>
            {modalVisible && <InfoModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
            <View style={container_style.squareHeaderContainer}>
                {/* <Text style={text_style.squareHeader}>Cast of&nbsp;</Text> */}
                {/* <Text style={text_style.squareHeader}>Cast of {`/n`} </Text> */}
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
            {/* <SquareHeader title={`Cast of ${props.title}`} /> */}
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