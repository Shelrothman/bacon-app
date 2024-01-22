import { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { container_style, text_style } from '../../styles';

import { useAppContext } from '../../contexts/AppContext';


export function ActorMovieSwitch() {

    const { squareState, setSquareState } = useAppContext();
    const [ isEnabled, setIsEnabled ] = useState(squareState === 'actorInput');
    console.log('squareState: ', squareState)
    /* 
        isEnabled = true -> search by actor
        isEnabled = false -> search by movie
    */
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        if (squareState === 'movieInput') return setSquareState!('actorInput');
        return setSquareState!('movieInput');
    }

    return (
        <View style={container_style.switchContainer}>
            <Text style={text_style.switchText}>search by {isEnabled ? 'movie' : 'actor'}:</Text>
            <Switch
                trackColor={{ false: '#3e3e3e', true: '#bee9cc' }}
                thumbColor={isEnabled ? '#41be69' : '#BEA841'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}