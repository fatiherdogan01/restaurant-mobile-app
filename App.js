import React, { useEffect, useState } from 'react';
import ApolloClient from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context"
import { InMemoryCache } from 'apollo-cache-inmemory';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'

import Login from './src/screens/login'
import Tabs from './src/screens/tabs'
const Stack = createStackNavigator();

function App() {
  const [token, setToken] = useState(null)
  useEffect(() => {
    getToken();
  }, [])

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        setToken(value)
      }
      SplashScreen.hide();
    } catch (e) { }
  }
  const authLink = new setContext(async (_, { headers, ...context }) => {
    const token = await AsyncStorage.getItem('token');
    return {
      headers: {
        ...headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      ...context
    };
  });

  const cache = new InMemoryCache();
  const httpLink = createHttpLink({ uri: 'http://209.250.226.42:8083/graphql' });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
  });
  function Route() {
    if (token) {
      return <Tabs />
    } else {
      return <Login />
    }
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Route" component={Route}
             options={{ headerTitleStyle: { alignSelf: 'center' }, headerLeft: null, gestureEnabled: false, headerTitle: 'Restaurant App' }}        
            />
          <Stack.Screen name="Tabs" component={Tabs}
            options={{ headerTitleStyle: { alignSelf: 'center' }, headerLeft: null, gestureEnabled: false, headerTitle: 'Restaurant App' }} />
          <Stack.Screen name="Login" component={Login}
            options={{ headerShown: false, gestureEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}

export default App;
