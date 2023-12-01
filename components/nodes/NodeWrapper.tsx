import { Pressable, StyleSheet } from 'react-native';


type NodeWrapperProps = {
    /** name of movie or actor at hand */
    handleOnPress: (id: number, name: string) => void;
    nameOrTitle: string;
    id: number;
    innerText: React.ReactNode;
}


/**
 * @component
 * Wrapper for the nodes that are pressable from the squares
 */

export function NodeWrapper(props: NodeWrapperProps) {
    const { handleOnPress, nameOrTitle, id, innerText } = props;


    return (
        <Pressable
            onPress={() => handleOnPress(id, nameOrTitle)}
            id={nameOrTitle}
            style={({ pressed }) => [
                // TODO: maybe more to make it look like an its going in...
                { opacity: pressed ? 0.5 : 1 },
                styles.pressable
            ]}
        >
            {innerText}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 18,
        backgroundColor: '#41be69',
        marginHorizontal: 10,
        padding: 5,
    },
});