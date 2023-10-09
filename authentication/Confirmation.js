import React, {useCallback, useState} from 'react';
import { View, StyleSheet, Image, Text, Alert, LogBox } from 'react-native';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';

import { Auth } from 'aws-amplify';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Cabin_400Regular, Cabin_700Bold  } from '@expo-google-fonts/cabin';

SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

function confirmSignUp(email, confirmationCode, navigation) {
    Auth.confirmSignUp(email, confirmationCode)
        .then(() => {
            navigation.navigate('SignIn')
        })
        .catch(err => {Alert.alert('Confirmation Failed', err.message, [
            {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
            },
        ])});
}

export default function Confirmation({ route, navigation }) {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: 6});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const _setValue = (value) => {
        if (value.length == 6) {
            confirmSignUp(route.params.user.username, value, navigation);
        }
    }

    const [fontsLoaded] = useFonts({
        Cabin_400Regular,
        Cabin_700Bold 
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    
    return (
        <View style={styles.background} onLayout={onLayoutRootView}>
            <Image 
                source={require('../assets/SignInBackground.png')}
                style={styles.signInBackground}
            />
            <Image
                source={require('../assets/FullLogo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>CONFIRMATION CODE</Text>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                onEndEditing={_setValue(value)}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                <View
                    // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    style={[styles.cellRoot, isFocused && styles.focusCell]}>
                    <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                </View>
                )}
            />
        </View>
    );
    
}


const styles = StyleSheet.create({
    background: {
      height: '100%',
      width: '100%',
      backgroundColor: '#BCDFFB',
    },
    signInBackground: {
      position: 'absolute',
      top: '33%',
      height: '67%',
      width: '100%',
    },
    logo: {
      position: 'absolute',
      top: '11%',
      alignSelf: 'center',
      height: '11%',
      width: '70%',
    },
    title: {
        color: "#89B6E0",
        fontFamily: 'Cabin_400Regular',
        fontSize: 35,
        height: '5.3%',
        top: '50%',
        textAlign: 'center',
    },
    codeFieldRoot: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 20,
        width: '90%',
        top: '55%',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      cellRoot: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#89B6E0',
        borderBottomWidth: 2,
      },
      cellText: {
        color: '#0C3F8D',
        fontFamily: 'Cabin_400Regular',
        fontSize: 36,
        textAlign: 'center',
      },
      focusCell: {
        borderBottomColor: '#0C3F8D',
        borderBottomWidth: 3,
      },

});
