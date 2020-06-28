import React from 'react';
import { Text, FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import { GET_RESTAURANT } from '../../query/GET_RESTAURANTS';
import Card from '../../components/card'

 function Restaurants() {
  const { loading, data, error } = useQuery(GET_RESTAURANT, {
    variables: {
      onlyDeals: false,
      index: 0,
      limit: 7,
      delivery: false,
      showOffline: false
    }
  });
  function Item({ item }) {
    const isDelivery = item.delivery ? 'Yes' : 'No'
    return (
      <Card>
        <Text style={styles.title}>{item.name} </Text>
        <View >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.typesTitle}>Types:</Text>
            <FlatList
              numColumns={4}
              columnWrapperStyle={{ justifyContent: 'flex-start' }}
              horizontal={false} data={item.types}
              renderItem={({ item }) =>
                <Text style={styles.typesTitle}>{item.name}</Text>
              }
              keyExtractor={item => JSON.stringify(item.id)}
            />
          </View>
        </View>
        <Text style={styles.subTitle}>City: {item.restaurantAddressSlugCityName}</Text>
        <Text style={styles.subTitle}>Delivery: {isDelivery} </Text>
      </Card>
    );
  }
  return (
    <>
      {error ? <Text style={{ color: 'red', textAlign: 'center', marginTop: 200 }}>{error.message.split("\"")[5]}</Text> : <View />}
      {loading ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View> :
        <FlatList
          data={data && data.restaurants}
          renderItem={Item}
          keyExtractor={item => item.uid}
        />
      }
    </>
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 10
  },
  subTitle: {
    padding: 10,
  },
  typesTitle: {
    padding: 5,
    fontSize: 14,
    letterSpacing: 2,
  },
  types: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30
  }
});
export default Restaurants;