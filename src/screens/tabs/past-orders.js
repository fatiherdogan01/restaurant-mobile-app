import React from 'react';
import { Text, FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { GET_PAST_ORDERS } from '../../query/GET_PAST_ORDERS';
import { useQuery } from '@apollo/react-hooks';

import Card from '../../components/card'

 function PastOrders() {
  console.log('Past Orders')
  const { loading, data, error } = useQuery(GET_PAST_ORDERS, {
    variables: {
      index: 4,
      limit: 5
    },
    onError: (err) => console.log({ err }),
    onCompleted: () => console.log('past orders query completed')

  });
  const Item = ({ item }) => {
    return (
      <Card>
        <FlatList data={item.items}
          renderItem={({ item }) =>
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
            </View>
          }
          keyExtractor={item => JSON.stringify(item.id)}
        />
        <Text style={styles.subTitle}>Order Date: {item.orderDate.substr(0, 10)}</Text>
        <Text style={styles.subTitle}>Total: {item.total}</Text>

      </Card>
    )
  };
  return (
    <>
      {error ? <Text style={{ color: 'red', textAlign: 'center', marginTop: 200 }}>{error.message.split("\"")[5]}</Text> : <View />}
      {loading ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View> :
        <FlatList
          data={data && data.pastOrders}
          renderItem={Item}
          keyExtractor={item => item.orderDate}
        />
      }
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 23,
    fontWeight: '500',
    paddingBottom: 10
  },
  description: {
    letterSpacing: 2,
    paddingBottom: 10
  },
  subTitle: {
    paddingRight: 10,
    paddingBottom: 5,
    textAlign: 'right'
  }
});
export default PastOrders;
