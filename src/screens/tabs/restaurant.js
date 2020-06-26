import React from 'react';
import { Text, FlatList,StyleSheet, View, ActivityIndicator} from 'react-native';
import { GET_RESTAURANT } from '../../query/GET_RESTAURANT';
import { useQuery } from '@apollo/react-hooks';
export default function Restaurant(){
    function Item({ title }) {
        return (
          <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
          </View>
        );
      }
    const { loading,error, data } = useQuery(GET_RESTAURANT,{
      variables:{
        onlyDeals:false,
        limit:5,
        index:2,
        delivery:false,
        showOffline:false
      }
    });
   // console.log(data.pastOrders)
    return(
        <>
        {loading ?
      <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
      <ActivityIndicator size='large' />
      </View>:
           <FlatList
        data={data && data.restaurants}
        renderItem={({ item }) => <Item title={item.name} />}
        keyExtractor={item => item.restaurantAddressPostalCode}
        />   }
    
      </>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 100,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  