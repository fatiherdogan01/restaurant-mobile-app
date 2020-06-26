import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/button'
import { GET_TOKEN } from '../query/GET_TOKEN';

const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token)
  } catch (e) { }
}
function Login() {

  const navigation = useNavigation();
  const [email, setEmail] = useState("oliverjones@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loginWithEmail, { loading, error }] = useMutation(GET_TOKEN);
  function onPress() {
    try {
      loginWithEmail({ variables: { email: email, password: password } })
        .then((res) => saveToken(res.data.loginWithEmail.token))
        .then(() => navigation.navigate("Tabs"))



    } catch (error) { }
  }
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Restaurant App</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          value={password}
        />
        {loading && <ActivityIndicator />}

        {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error.message.substr(23, 4) === '2022' || '2023' ? 'Unresolved error' : 'Network request failed'}</Text> : <View />}
        <Button disabled={loading} onPress={() => onPress()}>
          <Text>Login</Text>
        </Button>
      </View>
    </>
  )
}
export default Login;
const styles = StyleSheet.create({
  titleContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 4
  },
  title: {
    color: 'blue',
    fontSize: 42,
    fontWeight: '600',
  },
  input: {
    alignSelf: 'stretch',
    marginHorizontal: 30,
    marginBottom: 20,
    borderColor: '#ccc',
    padding: 10,
    borderWidth: 1
  }
});