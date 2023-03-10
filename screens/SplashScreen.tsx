import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { Text, View} from '../components/Themed';
import { auth } from '../config/firebase'
import navigation from '../navigation';
import { RootStackScreenProps } from '../types';
import useColorScheme from '../hooks/useColorScheme';
import colours from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen({ navigation }: RootStackScreenProps<'Splash'>) {

  useEffect(() => {
      NavigateToHomeOrLogin()
     
  })

  function NavigateToHomeOrLogin(){
    const {currentUser} = auth

    setTimeout(function(){
      if(currentUser == null){
        navigation.reset({
          index:0,
          routes: [{name:'Login'}]
        })
      }
      else{
        navigation.reset({
          index:0,
          routes: [{name:'Welcome'}]
        })
      }
    },1000)
  }


  var defaultColour : string = useColorScheme();

  const backgroundStyle = () => {
    if (defaultColour == "dark"){
      return styles.backgroundDark
    }
    else{
      return styles.backgroundlight
    }
  }

  return (
    <SafeAreaView style={[styles.root, styles.backgroundlight]}>

      <View style={styles.logoContainer}>
        <Image source={require("../assets/images/logo.jpg")} style={styles.logo} accessibilityLabel="I-Protein logo"/>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    minHeight: Math.round(Dimensions.get('window').height),
    width: '100%',
  },
  backgroundDark: {
    backgroundColor: colours.dark.background,
  },
  backgroundlight: {
    backgroundColor: colours.light.background,
  },
  logo: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  logoContainer: {
    marginHorizontal: 40,
    marginTop: 'auto',
    marginBottom: 'auto',
    width: 'auto',
    height: 120,

  },
});
