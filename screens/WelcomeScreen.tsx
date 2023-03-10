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

export default function WelcomeScreen({ navigation }: RootStackScreenProps<'Welcome'>) {

  var defaultColour : string = useColorScheme();

  const handleNext= () => {
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={[styles.root, styles.background, styles.container]}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.infoText}>The Protein-I project </Text>
      <TouchableOpacity
          onPress={handleNext}
          style={styles.nextButton}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    minHeight: Math.round(Dimensions.get('window').height),
  },
  background: {
    backgroundColor: colours.light.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: colours.light.text,
  },
  infoText: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 20,
    marginTop: 20,
    color: colours.light.text,
  }, 
  container: {
    justifyContent: 'flex-start',
    marginTop: 0,
    flex: 1,
    alignItems: 'center',
  },
    nextButton: {
    backgroundColor: colours.tint,
    width: 200,
    padding: 15,
    marginTop: 'auto',
    maxHeight: 50,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
