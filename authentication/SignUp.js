import React, {useCallback, useState} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import CheckBox from 'expo-checkbox';

import { Auth } from 'aws-amplify';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Cabin_400Regular, Cabin_700Bold } from '@expo-google-fonts/cabin';



function createAccount(email, password, phoneNumber, firstName, lastName, isTermsSelected, navigation) {
    if (!isTermsSelected) {
        Alert.alert('SignUp Failed', 'Please accept the terms and conditions.', [
            {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
            },
        ]);

        return;
    }

    Auth.signUp({
        username: email,
        password: password,
        attributes: {
            phone_number: '+1' + phoneNumber,
            given_name: firstName,
            family_name: lastName,
        },
        autoSignIn: {
            enable: true,
        }
    })
        .then(data => {
            navigation.navigate('Confirmation', data);
        })
        .catch(err => {Alert.alert('SignUp Failed', err.message, [
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
    const [firstName, setFirstName] = useState(true);
    const [lastName, setLastName] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState(true);
    const [isTermsSelected, setTermsSelected] = useState(false);
    const [isEmailSelected, setEmailSelected] = useState(false);

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
    
    return <>
        <Image
            source={require('../assets/FullLogo.png')}
            style={styles.logo}
        />
        <KeyboardAvoidingView style={styles.background} onLayout={onLayoutRootView} behavior={Platform.OS === "ios" ? "padding" : "height"} 
            keyboardVerticalOffset={Platform.select({
                ios: () => -240,
                android: () => -240
            })()
        }>
            <Image 
                source={require('../assets/SignUpBackground.png')}
                style={styles.signUpBackground}
            />

            <TouchableOpacity style={styles.continueButton} onPress={() => createAccount(email, password, phoneNumber, firstName, lastName, isTermsSelected, navigation)}>
                <Image 
                    source={require('../assets/ContinueButton.png')}
                    style={styles.continueButtonImage}
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

            <TextInput style = {styles.firstNameInput}
            underlineColorAndroid = "transparent"
            placeholder = "First Name"
            placeholderTextColor = "#89B6E0"
            autoCapitalize = "none"
            color = "#0C3F8D"
            onChangeText = {text => setFirstName(text)}
            />

            <TextInput style = {styles.lastNameInput}
            underlineColorAndroid = "transparent"
            placeholder = "Last Name"
            placeholderTextColor = "#89B6E0"
            autoCapitalize = "none"
            color = "#0C3F8D"
            onChangeText = {text => setLastName(text)}
            />

            <TextInput style = {styles.phoneNumberInput}
            underlineColorAndroid = "transparent"
            placeholder = "Phone Number"
            placeholderTextColor = "#89B6E0"
            autoCapitalize = "none"
            color = "#0C3F8D"
            onChangeText = {text => setPhoneNumber(text)}
            />

            <View style = {styles.termsCheckBoxContainer}>
                <Text style={styles.checkBoxText}>I AGREE TO THE TERMS & CONDITIONS</Text>
                <CheckBox
                    value={isTermsSelected}
                    color="#89B6E0"
                    onValueChange={setTermsSelected}
                    style={styles.checkBox}
                />
            </View>

            <View style = {styles.emailCheckBoxContainer}>
                <Text style={styles.checkBoxText}>EMAIL ME ABOUT ACCOUNTS AND PROMOS</Text>
                <CheckBox
                    value={isEmailSelected}
                    color="#89B6E0"
                    onValueChange={setEmailSelected}
                    style={styles.checkBox}
                />
            </View>
        </KeyboardAvoidingView >
        </>
    
    
}


const styles = StyleSheet.create({
    background: {
      height: '100%',
      width: '100%',
      backgroundColor: '#BCDFFB',
    },
    signUpBackground: {
      position: 'absolute',
      top: '27.8%',
      height: '73.22%',
      width: '100%',
    },
    logo: {
      position: 'absolute',
      top: '11%',
      alignSelf: 'center',
      height: '11%',
      width: '70%',
      zIndex: 999,
    },
    continueButton: {
      position: 'absolute',
      alignSelf: 'center',
      width: '81.69%',
      height: '6.7%',
      top: '87.6%'
    },
    continueButtonImage: {
        resizeMode: 'cover',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
    },
    firstNameInput: {
        position: 'absolute',
        width: '28%',
        height: '5%',
        top: '35%',
        left: '9.6%',
        borderBottomWidth: 3,
        borderColor: "#DDDFE5",
        textAlign: 'left',
        fontSize: 25,
        fontFamily: 'Cabin_400Regular'
    },
    lastNameInput: {
        position: 'absolute',
        width: '44%',
        height: '5%',
        top: '35%',
        left: '46.49%',
        alignSelf: 'center',
        borderBottomWidth: 3,
        borderColor: "#DDDFE5",
        textAlign: 'left',
        fontSize: 25,
        fontFamily: 'Cabin_400Regular'
    },
    emailInput: {
        position: 'absolute',
        width: '80.98%',
        height: '5%',
        top: '45%',
        alignSelf: 'center',
        borderBottomWidth: 3,
        borderColor: "#DDDFE5",
        textAlign: 'left',
        fontSize: 25,
        fontFamily: 'Cabin_400Regular'
    },
    phoneNumberInput: {
        position: 'absolute',
        width: '80.98%',
        height: '5%',
        top: '55%',
        alignSelf: 'center',
        borderBottomWidth: 3,
        borderColor: "#DDDFE5",
        textAlign: 'left',
        fontSize: 25,
        fontFamily: 'Cabin_400Regular'
    },
    passwordInput: {
        position: 'absolute',
        width: '80.98%',
        height: '5%',
        top: '65%',
        alignSelf: 'center',
        borderBottomWidth: 3,
        borderColor: "#DDDFE5",
        textAlign: 'left',
        fontSize: 25,
        fontFamily: 'Cabin_400Regular'
    },
    termsCheckBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        width: '62%',
        height: '2%',
        top: '76.4%',
        left: '22%',
    },
    checkBox: {
        left: '50%'
    },
    checkBoxText: {
        color: "#89B6E0",
        fontFamily: 'Cabin_700Bold',
        fontSize: 15
    },
    emailCheckBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        width: '70%',
        height: '2%',
        top: '81.4%',
        left: '13.8%',
    },
});
