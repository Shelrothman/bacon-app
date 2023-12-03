import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';


type NodeWrapperProps = {
    /** name of movie or actor at hand */
    handleOnPress: (id: number, name: string) => void;
    nameOrTitle: string;
    id: number;
    innerText: React.ReactNode;
    /** 4 colors for the gradient */
    backgrounds: string[];
    characterName?: string;
}


/**
 * @component
 * Wrapper for the nodes that are pressable from the squares
 */

export function NodeWrapper(props: NodeWrapperProps) {
    const { handleOnPress, nameOrTitle, id, innerText, backgrounds, characterName } = props;

    // TODO: maybe more to make it look like an its going in... like pressing the things in duolingo

    return (

        <Pressable
            onPress={() => handleOnPress(id, nameOrTitle)}
            id={nameOrTitle}
            style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1, transform: [ { scale: pressed ? 0.95 : 1 } ] }
            ]}
            onPressIn={() => console.log('pressed in')}
        >
            <LinearGradient style={styles.pressable} colors={backgrounds} >
                <Text>
                    {innerText}
                    {/* <MaterialCommunityIcons name="movie-open" size={24} color="black" /> */}
                    <Text style={{ fontFamily: 'Bacon-Bold', fontSize: 20 }}> {nameOrTitle}</Text> {`\n`}
                    <Text style={{ textAlign: 'right', fontFamily: 'Bacon-Light', fontSize: 20 }}>{characterName || 'unknown'}</Text>
                </Text>
            </LinearGradient>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 18,
        marginHorizontal: 10,
        padding: 5,
    },
});