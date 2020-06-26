import { gql } from "apollo-boost";
export const GET_RESTAURANT = gql`
  query restaurants($onlyDeals: Boolean!, $limit: Int!,$index: Int!,$delivery:Boolean!,$showOffline:Boolean!){
      restaurants(onlyDeals:$onlyDeals,limit:$limit,index:$index,delivery:$delivery,showOffline:$showOffline ){
        avgScore
        delivery
        deliveryReOpenDate
        deliveryType
        distance
        inDistance
        isNew
        minOrderAmount
        minOrderEnabled
        name
        open
        reOpenDate
        restaurantAddressPostalCode
        restaurantAddressSlugAdminWard
        restaurantAddressSlugCityName
        restaurantCollectionWorkingTimeStatus
        restaurantDeliveryDriverStatus
        restaurantDeliveryStatus
        restaurantDeliveryWorkingTimeStatus
        restaurantItemId
        restaurantNextVacationEndDate
        restaurantNextVacationStartDate
        restaurantNextVacationStatus
        restaurantOpenStatus
        restaurantStatusCode
        restaurantStatusParams
        restaurantWorkingHourOpenTime
        slugName
        uid
      }
}
`;
