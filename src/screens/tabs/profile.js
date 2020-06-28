import React from 'react';
import { Text, FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';

import { GET_USER } from '../../graphql/query/GET_USER';
import Button from '../../components/button'

function Profile() {
  const navigation = useNavigation();
  const { loading, data, client, error } = useQuery(GET_USER);
  async function onPress() {
    await client.resetStore()
    await AsyncStorage.removeItem('token')
    navigation.navigate('Login')

  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {error ? <Text style={{ color: 'red', textAlign: 'center', marginTop: 200 }}>{error.message.split("\"")[5]}</Text> : <View />}
      {loading ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View> :

        <View style={styles.container}>
          {data &&
            <View style={styles.item}>
              <Text style={styles.title}>{data.user.firstName} {data.user.lastName}</Text>
              <Text style={styles.subTitle}>Email: {data.user.email} </Text>
              <Text style={styles.subTitle}>Phone: {data.user.mobileNumber} </Text>
              <Text style={styles.adressTitle}>Adresses </Text>
              <FlatList
                data={data.user.addresses}
                renderItem={({ item }) =>
                  <View>
                    <Text style={styles.adressTitle}>{item.addressLine1}</Text>
                  </View>
                }
                keyExtractor={item => JSON.stringify(item.id)}
              />
            </View>
          }
          <Button onPress={() => onPress()}>
            <Text>Logout</Text>
          </Button>
        </View>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,

  },
  title: {
    fontSize: 28,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 10
  },
  subTitle: {
    padding: 5,
    fontSize: 18,
    letterSpacing: 3,
  },
  adressTitle: {
    padding: 5,
    fontSize: 14,
    letterSpacing: 2,
  },
});
export default Profile