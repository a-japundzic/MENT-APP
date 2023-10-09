import React, {useCallback, useState} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';

import { Auth } from 'aws-amplify';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Cabin_400Regular } from '@expo-google-fonts/cabin';

function login(email, password, navigation) {
    Auth.signIn(email, password)
        .then(user => {navigation.navigate('MainContainer', {screen: 'Profile', params: { user: user }})})
        .catch(err => {Alert.alert('Login Failed', err.message, [
            {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
            },
        ])});
}

SplashScreen.preventAutoHideAsync();

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState(true);
    const [password, setPassword] = useState(true);

    const [fontsLoaded] = useFonts({
        Cabin_400Regular
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
            <TouchableOpacity style={styles.logInButton} onPress={() => login(email, password, navigation)}>
                <Image 
                    source={require('../assets/SignInButton.png')}
                    style={styles.logInButtonImage}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.createAccountButton} onPress={() => {navigation.navigate('SignUp')}}>
                <Image 
                    source={require('../assets/CreateAccountButton.png')}
                    style={styles.createAccountButtonImage}
                />
            </TouchableOpacity>
            <Image 
                source={require('../assets/DHAA.png')}
                style={styles.dhaaImage}
            />
            <TouchableOpacity style={styles.fpButton} >
                <Image 
                    source={require('../assets/FPButton.png')}
                    style={styles.fpButtonImage}
                />
            </TouchableOpacity>
            <TextInput style = {styles.emailInput}
            underlineColorAndroid = "transparent"
            placeholder = "Email address"
            placeholderTextColor = "#89B6E0"
            autoCapitalize = "none"
            color = "#0C3F8D"
            onChangeText = {text => setEmail(text)}
            />
            
            <TextInput style = {styles.passwordInput}
            underlineColorAndroid = "transparent"
            placeholder = "Password"
            placeholderTextColor = "#89B6E0"
            autoCapitalize = "none"
            secureTextEntry = {true}
            color = "#0C3F8D"
            onChangeText = {text => setPassword(text)}
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
    logInButton: {
      position: 'absolute',
      alignSelf: 'center',
      width: '81.69%',
      height: '6.7%',
      top: '66.44%'
    },
    logInButtonImage: {
        resizeMode: 'cover',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
    },
    createAccountButton: {
        position: 'absolute',
        alignSelf: 'center',
        width: '81.69%',
        height: '6.7%',
        top: '83.77%'
    },
    createAccountButtonImage: {
        resizeMode: 'cover',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
    },
    dhaaImage: {
        position: 'absolute',
        alignSelf: 'center',
        width: '70%',
        height: '2.67%',
        top: '79.7%'
    },
    fpButton: {
        position: 'absolute',
        alignSelf: 'center',
        width: '34.93%',
        height: '2.79%',
        top: '59.71%'
    },
    fpButtonImage: {
        resizeMode: 'cover',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
    },
    emailInput: {
        width: '80.62%',
        height: '5.3%',
        top: '40%',
        alignSelf: 'center',
        borderBottomWidth: 3,
        borderColor: "#DDDFE5",
        textAlign: 'left',
        fontSize: 25,
        fontFamily: 'Cabin_400Regular'
    },
    passwordInput: {
        width: '80.62%',
        height: '5.13%',
        top: '45%',
        alignSelf: 'center',
        borderBottomWidth: 3,
        borderColor: "#DDDFE5",
        textAlign: 'left',
        fontSize: 25,
        fontFamily: 'Cabin_400Regular'
    },
});
