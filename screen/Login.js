import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)

  const onSubmit = async() => {
      await AsyncStorage.setItem('token', username)
      if (username === 'eve.holt@reqres.in' && password === 'cityslicka') {
          console.log('Nice')
          navigation.navigate('Movies')
      }else {
          console.log('Error ')
      }
  }

  const tokenlogin = async() => {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
          navigation.navigate('Movies')
          console.log('Conectado')
      }else {
          console.log('No estas conectado')
      }
  }

  tokenlogin()

return (
  <View style={styles.container}>
    <TextInput  style={styles.input} onChangeText={(value) => setUsername(value)} placeholder="Username" />
    <TextInput  style={styles.input} secureTextEntry onChangeText={(value) => setPassword(value)} placeholder="Password" />
    <Button onPress={onSubmit} title="Login"/>
    <Text>username : {username}</Text>
    <Text>password : {password}</Text>
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#223343",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "70",
    paddingHorizontal: "20",
  },
  input: {
    width: "100%",
  },
  btnContainer: {
    marginTop: 20,
    width: "85%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#442484",
  },
  icon: {
    color: "#C1C1C1",
  },
  btnGoogle: {
    backgroundColor: "#EA4335"
  },
  input: {
    fontSize: 20,
    fontWeight: "300",
    padding: 20,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 40,
  },
});