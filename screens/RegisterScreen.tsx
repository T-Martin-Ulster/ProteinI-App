import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Text, View} from '../components/Themed';
import { auth } from '../config/firebase'
import navigation from '../navigation';
import { RootStackScreenProps } from '../types';

import useColorScheme from '../hooks/useColorScheme';
import colours from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen({ navigation }: RootStackScreenProps<'Register'>) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

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

  const handleBack= () => {
    navigation.goBack()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        navigation.replace("Root")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {

    if(password == confirm){
      auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials: { user: any; }) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch((error: { message: any; }) => alert(error.message))
    }
    else{
      alert("Passwords dont match")
    }
    
  }

  return (
    <SafeAreaView style={[styles.root,backgroundStyle()]}>
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">

      <Text style={styles.title}>Register</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          
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

        <TextInput
          placeholder="Confirm Password"
          value={confirm}
          onChangeText={text => setConfirm(text)}
          style={[styles.input, inputStyle()]}
          secureTextEntry
          placeholderTextColor="grey"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.registerButton}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBack}
          style={styles.cancelButton}
        >
          <Text style={styles.buttonOutlineText}>Already have account?</Text>
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
  },
  logo: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  logoContainer: {
    width: 280,
    height: 100,
    marginBottom: 20,
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
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  registerButton: {
    backgroundColor: '#0782F9',
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
