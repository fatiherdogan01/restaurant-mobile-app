import React, { useLayoutEffect, useState } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'

import Login from './src/screens/login'
import Tabs from './src/screens/tabs'
const Stack = createStackNavigator();

function App() {
  const [token, setToken] = useState(null)
  useLayoutEffect(() => {
    getToken()
  })

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) { setToken(value) }
        SplashScreen.hide()
    } catch (e) { }
  }

    const client = new ApolloClient({
    uri: 'http://209.250.226.42:8083/graphql',
    request: (operation) => {
     const token2 = getToken();
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ''||token2 ? `Bearer ${token2}` : ''
        }
      })
    }
   
  });  

   function Route(){
  if(token){
    return <Tabs/>
  }else{
    return <Login/>
  }
}

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Route" component={Route}
            options={{ headerLeft: null, gestureEnabled: false,headerTitle: 'Restaurant App'  }} />
          <Stack.Screen name="Tabs" component={Tabs}
            options={{ headerLeft: null, gestureEnabled: false, headerTitle: 'Restaurant App' }} />
          <Stack.Screen name="Login" component={Login}
            options={{ headerShown: false, gestureEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}

export default App;
