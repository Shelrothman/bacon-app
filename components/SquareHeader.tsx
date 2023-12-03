import { StyleSheet, Text, View } from 'react-native'

// import React from 'react'

type SquareHeaderProps = {
    title: string;
}


export function SquareHeader(props: SquareHeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
    },
    text: {
        fontFamily: 'Bacon-Stencil',
        // fontFamily: 'Bacon-Script',
        fontSize: 26,

    },


})