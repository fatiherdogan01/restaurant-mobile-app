import { gql } from "apollo-boost";
export const GET_PAST_ORDERS = gql`
  query pastOrders($index: Int!, $limit: Int!){
    pastOrders(index: $index, limit: $limit){
      ...items
      orderCheckDeadline
      orderCompletedRewardPoints
      orderDate
      orderDeclineReason
      orderDeliveryDeadline
      orderEarliestDeliveryDeadline
      orderEarliestPreparingDeadline
      orderLatestDeliveryDeadline
      orderLatestPreparingDeadline
      orderPreparingDeadline
      orderPreparingDelay
      smallAmountFee
      status
      subTotal
      total
      totalPromoCodeAmount
      uid
      usedPoints
      userCanCall
      userCanRate
      userCanReOrder
      userCanTip
    }
  }
  fragment items on Order{
    items{
      amount
      description
      id
      name
      note
      oldAmount
      ...options
      quantity
      totalAmount
      ...types
    }
  }
  fragment options on OrderItem{
    options{
      id
      multipleSelection
      name
      ...values
    }
  }
  fragment types on OrderItem{
    types{
      id
      name
    }
  }
  fragment values on OrderItemOption{
    values{
      amount
      amountEffectType
      description
      id
      name
      quantity
      quantityAble
      selected
    }
    
}
`;

