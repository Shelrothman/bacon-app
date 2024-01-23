import { View, Text, Switch } from 'react-native';
import { container_style, text_style } from '../../styles';
import { useAppContext } from '../../contexts/AppContext';


export function ActorMovieSwitch() {
    const { squareState: mode, setSquareState } = useAppContext();

    const toggleSwitch = () => {
        if (mode === 'movieInput') return setSquareState!('actorInput');
        return setSquareState!('movieInput');
    }

    return (
        <View style={container_style.switchContainerWrapper}>
            <Text style={text_style.switchTextBold}>searching by {mode === 'actorInput' ? 'actor' : 'movie'}{'\n'}</Text>
            <View style={container_style.switchContainer}>
                <Text style={text_style.switchText}>search by {mode === 'actorInput' ? 'movie' : 'actor'}:</Text>
                <Switch
                    trackColor={{ false: '#3e3e3e', true: '#bee9cc' }}
                    thumbColor={mode === 'actorInput' ? '#41be69' : '#BEA841'}
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={toggleSwitch}
                    value={mode === 'actorInput'}
                />
            </View>
        </View>
    )
}