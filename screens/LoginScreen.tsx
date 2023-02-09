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

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  var defaultColour : string = useColorScheme();

  const inputStyle = () => {
    if (defaultColour == "dark"){
      return styles.inputdark
    }
    else{
      return styles.inputlight
    }
  }

  const backgroundStyle = () => {
    if (defaultColour == "dark"){
      return styles.backgroundDark
    }
    else{
      return styles.backgroundlight
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        navigation.replace("Welcome")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    navigation.navigate('Register')
  }

  function isValidEmail() {
    var result = /\S+@\S+\.\S+/.test(email)
    if(!result){
      Alert.alert('Error', 'Please enter valid email')
    }
    return result;
  }

  function isValidPassword() {
    var result = password.trim() != ""
    if(!result){
      Alert.alert('Error', 'Please enter password')
    }
    return result
  }

  const handleLogin = () => {
    if(isValidEmail() && isValidPassword()){
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials: { user: any; }) => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.email);
        })
        .catch((error: { message: any; }) => Alert.alert('Error', error.message))
    }
  }

  const forgotPassword = () => {

    if(isValidEmail() && isValidPassword()){
      auth
          .sendPasswordResetEmail(email)
            .then(function (user) {
              Alert.alert('Error','Please check your email...')
            }).catch(function (e) {
              console.log(e)
              Alert.alert('Error','Account not found')
            })
    }
  }

  return (
    <SafeAreaView style={[styles.root, backgroundStyle()]}>
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">

      <Text style={styles.title}>Login</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          autoCapitalize='none'
          value={email}
          onChangeText={text => setEmail(text)}
          style={[styles.input, inputStyle()]}
          placeholderTextColor="grey"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={[styles.input, inputStyle()]}
          secureTextEntry
          placeholderTextColor="grey"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.registerButton}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={forgotPassword}
          style={styles.registerButton}>
          <Text style={styles.buttonOutlineText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    minHeight: Math.round(Dimensions.get('window').height),
  },
  backgroundDark: {
    backgroundColor: colours.dark.background,
  },
  backgroundlight: {
    backgroundColor: colours.light.background,
  },
  container: {
    justifyContent: 'flex-start',
    marginTop: 0,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 100,
  },
  separator: {
    color: "black",
    marginVertical: 30,
    height: 2,
    width: '80%',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    width: (Dimensions.get('window').width - 80),
    maxWidth: 360,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 3,
    marginTop: 10,
  },
  inputlight: {
  },
  inputdark: {
    backgroundColor: colours.dark.input,
    borderColor: colours.dark.border,
    color: colours.dark.text
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerButton: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  loginButton: {
    backgroundColor: colours.tint,
    width: 150,
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});



/** 
        * <View style={styles.logoContainer}>
        * <Image source={require("../assets/images/logo.jpg")} style={styles.logo} accessibilityLabel="I-Protein logo"/>
        * </View>
      */