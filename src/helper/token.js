import AsyncStorage from '@react-native-community/async-storage';
export const setToken = async (tokenKey, tokenValue) => {
    try {
      await AsyncStorage.setItem(tokenKey, tokenValue)
    } catch (e) { }
  }

