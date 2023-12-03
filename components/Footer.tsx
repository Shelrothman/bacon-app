import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppContext } from '../contexts/AppContext'
import { FooterButton } from './FooterButton';

export default function Footer() {

    const { setSquareState } = useAppContext();
    // TODO: the settings thing into pull up menu


    return (
        <>
            <FooterButton
                icon={<FontAwesome name="fast-backward" size={24} color="white" />}
                text='Back'
                handlePress={() => console.log('go back to previous square state')}
            />
            <FooterButton
                icon={<MaterialCommunityIcons name="restart" size={24} color="white" />}
                text='Reset'
                handlePress={() => setSquareState && setSquareState('movieInput')}
            />
            <FooterButton
                icon={<Ionicons name="menu" size={24} color="white" />}
                text='Info'
                handlePress={() => console.log('hi this to take option to get info for current actor/movie')}
            />
        </>
    )
}
