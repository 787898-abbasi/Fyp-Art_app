import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Context as OrderContext } from '../../context/orderContext';
import { Card } from 'react-native-elements';

const OrderDetailScreen = ({ route, navigation }) => {
  const { state, getOrder } = useContext(OrderContext);
  const { buyer } = route.params;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrder(buyer);
    setOrders(state.orderedData);
  }, []);

  return (
    <ScrollView>
      {/* <Text>{state.orderedData[0].shipmentAddress}</Text> */}
      {state.orderedData.map((item) => {
        return (
          <Card>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>product ID:</Text>{' '}
              {item.product}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Shipment Address:</Text>{' '}
              {item.shippingAddress}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>City:</Text> {item.city}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Country:</Text>{' '}
              {item.country}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Zip:</Text> {item.zip}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Date Ordered:</Text>{' '}
              {item.dateOrdered}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Buyer Email:</Text>{' '}
              {item.email}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Buyer Phone:</Text>{' '}
              {item.phone}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Order Status:</Text>{' '}
              <Text style={{ color: 'red' }}>{item.status}</Text>
            </Text>
          </Card>
        );
      })}
    </ScrollView>
  );
};

export default OrderDetailScreen;
