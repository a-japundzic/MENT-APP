import * as React from 'react';
import { View, StyleSheet, Image } from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Scresns
import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';

// Screen names
const homeName = "Home";
const exploreName = "Explore";
const messageName = "Messages";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return(
                <Tab.Navigator 
                    initialRouteName={homeName}
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;
                            let rn = route.name;

                            if (rn === homeName) {
                                iconName = focused ? require('../assets/homeButtonFocused.png') : require('../assets/homeButton.png');
                            } else if (rn === exploreName) {
                                iconName = focused ? require('../assets/searchButtonFocused.png') : require('../assets/searchButton.png');
                            } else if (rn == messageName) {
                                iconName = focused ? require('../assets/messageButtonFocused.png') : require('../assets/messagesButton.png');
                            } else if (rn === profileName) {
                                iconName = focused ? require('../assets/profileButtonFocused.png') : require('../assets/profileButton.png');
                            }

                            return <Image resizeMode='contain' style={{ width: '50%', height: "50%", top: "20%"}} source={iconName}/>
                        },

                        tabBarStyle: { 
                            position: 'absolute',
                            backgroundColor: "#0C3F8D",
                            height: '10%',
                            borderTopWidth: 0,
                        },
                        tabBarShowLabel: false,
                        tabBarInactiveTintColor: "#FFFFFF",
                        tabBarActiveTintColor: "#2281CE"
                    })}

                    >

                    <Tab.Screen name={homeName} component={HomeScreen} options={{headerShown: false}}/>
                    <Tab.Screen name={exploreName} component={ExploreScreen} options={{headerShown: false}}/>
                    <Tab.Screen name={messageName} component={MessagesScreen} options={{headerShown: false}}/>
                    <Tab.Screen name={profileName} component={ProfileScreen} options={{headerShown: false}}/>


                </Tab.Navigator>

    );
}
