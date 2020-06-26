import React from 'react';
import { Text, FlatList, StyleSheet, View,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { GET_USER } from '../../query/GET_USER';
import { useQuery } from '@apollo/react-hooks';
import Button from '../../components/button'
export default function Profile({ navigation }) {
  const {  loading, error, data,client } = useQuery(GET_USER);
  function onPress() {
    try {
      AsyncStorage.removeItem('token').then(()=>client.resetStore() )
      
      .then(() => navigation.navigate('Login'))
    } catch (error) { }

  }
console.log(data&&data.user.firstName)
  return (
    <>
    {loading ?
      <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
      <ActivityIndicator size='large' />
      </View>:
    
    <View style={styles.container}>
    {data&&
    <View  style={styles.item}>
      <Text style={styles.title}>{data.user.firstName} {data.user.lastName}</Text> 
      <Text style={styles.title}>Email: {data.user.email} </Text> 
      <Text style={styles.title}>Phone: {data.user.mobileNumber} </Text> 
      <Text style={styles.title}>Adresses </Text> 
        <FlatList
        data={data.user.addresses}
        renderItem={({ item }) =>
        <View>
          <Text>{item.addressLine1}</Text>
        </View>
      }
        keyExtractor={item => JSON.stringify(item.id)  }
      />  
      </View>
      }
     
    
      <Button onPress={() => onPress()}>
        <Text>Logout</Text>
      </Button>
    </View>
    }
     </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:20
    
  },
  title: {
    fontSize: 22,
    marginBottom:10
  },
});
