import * as React from 'react';

import MainContainer from './navigation/MainContainer';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';
import Confirmation from './authentication/Confirmation';

import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

Amplify.configure(awsconfig)


function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="Confirmation" component={Confirmation} options={{headerShown: false}}/>
        <Stack.Screen name="MainContainer" component={MainContainer} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>

    //<MainContainer/>
  );
}

export default App;



