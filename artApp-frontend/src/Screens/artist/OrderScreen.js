import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Context as AuthContext } from '../../context/authContext';
import { Context as OrderContext } from '../../context/orderContext';
import { Card, Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

const OrderScreen = ({ route, navigation }) => {
  const { state, getOrderArtist } = useContext(OrderContext);
  const { artist } = route.params;

  useEffect(() => {
    getOrderArtist(artist);
  }, []);

  return (
    <ScrollView>
      {/* <Text>{state.orderedData[0].shipmentAddress}</Text> */}
      {state.orderedDataA.map((item) => {
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
            <Card.Divider />
            <Button
              icon={<Entypo name="mail" size={24} color="black" />}
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="Send through Mail"
              onPress={() => Linking.openURL(`mailto:${item.email}`)}
            />
          </Card>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default OrderScreen;
