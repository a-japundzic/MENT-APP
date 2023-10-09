import { CognitoUser } from 'amazon-cognito-identity-js';
import React, {useCallback, useState, useEffect} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Text, FlatList, SafeAreaView, Pressable} from 'react-native';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Cabin_400Regular, Cabin_700Bold } from '@expo-google-fonts/cabin';
import { ScrollView } from 'react-native-gesture-handler';

import { DataStore } from '@aws-amplify/datastore';
import { Profile } from '../../src/models';
import Auth from "@aws-amplify/auth";

import { Storage } from 'aws-amplify';
import * as Clipboard from "expo-clipboard";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";

SplashScreen.preventAutoHideAsync();

export default function ProfileScreen({ route }) {
    const data = route.params.user.attributes;

    const [profile, setProfile] = useState();
    const [image, setImage] = useState(null);
    const [percentage, setPercentage] = useState(0);
  
    async function onCreateProfile() {
      const __profile = await DataStore.save(
        new Profile({
          "userId": data.sub,
          "name": data.given_name + " " + data.family_name,
        })
      );

      setProfile(__profile);
    }

    
    useEffect(() => {
      (async () => {
        if (Constants.platform.ios) {
          const cameraRollStatus =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
          if (
            cameraRollStatus.status !== "granted" ||
            cameraStatus.status !== "granted"
          ) {
            alert("Sorry, we need these permissions to make this work!");
          }
        }
      })();
    }, []);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
        aspect: [4, 3],
        quality: 1,
      });
  
      handleImagePicked(result);
    };

    handleImagePicked = async (pickerResult) => {
      try {
        if (pickerResult.cancelled) {
          alert("Upload cancelled");
          return;
        } else {
          setPercentage(0);
          const img = await fetchImageFromUri(pickerResult.uri);
          const uploadUrl = await uploadImage("demo.jpg", img);
          downloadImage(uploadUrl);
        }
      } catch (e) {
        console.log(e);
        alert("Upload failed");
      }
    };

    uploadImage = (filename, img) => {
      Auth.currentCredentials();
      return Storage.put(filename, img, {
        level: "public",
        contentType: "image/jpeg",
        progressCallback(progress) {
          setLoading(progress);
        },
      })
        .then((response) => {
          return response.key;
        })
        .catch((error) => {
          console.log(error);
          return error.response;
        });
    };

    downloadImage = (uri) => {
      Storage.get(uri)
        .then((result) => setImage(result))
        .catch((err) => console.log(err));
    };

    const fetchImageFromUri = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    };

    
    const setLoading = (progress) => {
      const calculated = parseInt((progress.loaded / progress.total) * 100);
      updatePercentage(calculated); // due to s3 put function scoped
    };

    const updatePercentage = (number) => {
      setPercentage(number);
    };
  


    useEffect(() => {
      const sub = DataStore.observeQuery(Profile, (p) =>
        p.userId.eq(data.sub)
      ).subscribe(({ items }) => {
        setProfile(items[0])
      });

      return () => {
        sub.unsubscribe();
      };
    }, []);
  // Create a new profile if the users profile does not exist

  const [fontsLoaded] = useFonts({
    Cabin_400Regular,
    Cabin_700Bold 
  });

  const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded && profile) {
          await SplashScreen.hideAsync();
      }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
      return null;
  }

// console.log(profile)
 if (profile) {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.background} onLayout={onLayoutRootView}>
        <Image 
          source={require('../../assets/profileLogo.png')}
          style={styles.profileLogo}
        />

        <Image 
          source={require('../../assets/yourProfile.png')}
          style={styles.yourProfile}
        />

        <Image 
          source={require('../../assets/smallBackground.png')}
          style={styles.smallBackground}
        />

        <Image 
          source={require('../../assets/smallBackground.png')}
          style={styles.smallBackground}
        />

        <TouchableOpacity style={styles.profilePicButton} onPress={pickImage}>
          <Image 
              //source={require('../../assets/blankProfilePic.png')}
              source={{ uri: image }}
              style={styles.profilePicButtonImg}
          />
        </TouchableOpacity>

        <Text style={styles.name}> {profile?.name} </Text>
        <TextInput
            style={styles.description}
            disabled={!profile}
            selectTextOnFocus={true}
            multiline={true}
            blurOnSubmit={true}
            value={profile?.description ?? 'Tap me to edit your profile description!'}
            onChangeText={(text) => {
              setProfile(
                Profile.copyOf(profile, (edit) => {
                  edit.description = text;
                })
              );
            }}
            onSubmitEditing={async () => {
            console.log(profile);
              if (!profile) {
                return;
              }

              const saveEdit = await DataStore.save(profile);
              console.log('Profile changes save: ', saveEdit);
            }}
        />
      </View>
    </SafeAreaView>
  );
 }


}


const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: '#2281CD',
  },
  profileLogo: {
    position: 'absolute',
    left: '82.58%',
    height: '5%',
    width: '11.29%',
  },
  yourProfile: {
    position: 'absolute',
    left: '5%',
    height: '3.4%',
    width: '38%',
    top: '0.9%',
  },
  smallBackground: {
    position: 'absolute',
    height: '28%',
    width: '96%',
    top: '6%',
    alignSelf: 'center'
  },
  profilePicButton: {
    position: 'absolute',
    top: '8%',
    width: '22.2%',
    height: '11.4%',
    left: '6%',
  },
  profilePicButtonImg: {
    resizeMode: 'cover',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  name: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '8.5%',
    left: '30%',
    textAlign: 'left',
    fontSize: 25,
    color: "#0C3F8D",
    fontWeight: 'bold',
},
description: {
    position: 'absolute',
    width: '90%',
    height: '14%',
    top: '19.6%',
    left: '5%',
    textAlign: 'justify',
    fontSize: 15,
    color: "#358ED4",
},
});
