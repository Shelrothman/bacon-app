import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet } from 'react-native';


type NodeWrapperProps = {
    /** name of movie or actor at hand */
    handleOnPress: (id: number, name: string) => void;
    nameOrTitle: string;
    id: number;
    innerText: React.ReactNode;
    // backgroundColors: string[];
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
                { opacity: pressed ? 0.5 : 1 }, // , backgroundColor: backgroundColors 
                // styles.pressable
            ]}
        >
            <LinearGradient
                // style={{ borderRadius: 18, padding: 5 }
                style={styles.pressable}
                colors={[ '#e4d9ae', '#CBB967', '#BEA841', '#BA8E45' ]}
            // start={{ x: 0.1, y: 0.2 }}
            // end={{ x: 1, y: 0.2 }}
            >
                {innerText}
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
        // #BEA841
        // backgroundColor: '#41be69',
        marginHorizontal: 10,
        padding: 5,
    },
});