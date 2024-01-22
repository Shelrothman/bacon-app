import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

import { useAppContext } from '../contexts/AppContext'
import useGoBack from '../hooks/useGoBack';
import { FooterButton } from './FooterButton';
import CustomActionSheet from './menu/CustomActionSheet';




export default function Footer() {
    const [ actionSheetVisible, setActionSheetVisible ] = useState(false);
    const {
        setSquareState, setSessionMap, sessionMap, setInputTitle, isLoading
    } = useAppContext()
    const { handleGoBack } = useGoBack();



    return (
        <>
            <CustomActionSheet
                visible={actionSheetVisible}
                onClose={() => setActionSheetVisible(false)}
            />
            <FooterButton
                icon={<FontAwesome name="fast-backward" size={24}
                    color={(sessionMap && sessionMap.length > 0) && !isLoading ? "white" : "#8e8e8e"}
                />}
                text='Back'
                disabled={(sessionMap && sessionMap.length > 0) && !isLoading ? false : true}
                handlePress={() => handleGoBack()}
            />
            <FooterButton
                icon={<MaterialCommunityIcons name="restart" size={24} color="white" />}
                text='Reset'
                handlePress={() => {
                    setInputTitle && setInputTitle('');
                    setSessionMap && setSessionMap([]);
                    setSquareState && setSquareState('movieInput');
                    return;
                }}
            />
            <FooterButton
                icon={<Ionicons name="menu" size={24} color="white" />}
                text='Menu'
                handlePress={() => setActionSheetVisible(true)}
            />
        </>
    )
}
