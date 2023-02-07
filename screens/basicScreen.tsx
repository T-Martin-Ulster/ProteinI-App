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

export default function BasicScreen({ navigation }: RootStackScreenProps<'Basic'>) {

  /** const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') */

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
    <SafeAreaView style={[styles.root, backgroundStyle()]}>
      
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
});
