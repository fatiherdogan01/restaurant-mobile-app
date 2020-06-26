import React from 'react';
import { Text, FlatList, StyleSheet, View, TouchableOpacity,ActivityIndicator } from 'react-native';
import { GET_PAST_ORDERS } from '../../query/GET_PAST_ORDERS';
import { useQuery } from '@apollo/react-hooks';


export default function Orders() {
  const { loading, error, data } = useQuery(GET_PAST_ORDERS, {
    variables: {
      index: 0,
      limit: 10
    }
  });
  const Item = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item}>
      <FlatList data={item.items} 
        renderItem={({ item }) =>
        <View>
        <Text style={styles.name}>{item.name}</Text>
        </View>
      }
      keyExtractor={item =>  JSON.stringify(item.id) }
      />
      <Text style={styles.total}>Total: {item.total}</Text>

      </TouchableOpacity>
      )
  };
  return (
    <>
     {loading ?
      <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
      <ActivityIndicator size='large' />
      </View>:
      <FlatList
      data={data && data.pastOrders} 
      renderItem= {Item}
      keyExtractor={item => item.orderDate }
      />
     }
    </>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,

  },
  name: {
    fontSize: 18,
  },
  total:{
  paddingRight:10,
  color:'#ccc'
  }
});
