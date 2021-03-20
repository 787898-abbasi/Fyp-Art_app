import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';

import { Context as OrderContext } from '../context/orderContext';

const ProductList = ({
  image,
  price,
  name,
  product,
  buyer,
  artist,
  phone,
  zip,
  shippingAddress,
  email,
  city,
  country,
}) => {
  const [isAdded, setisAdded] = useState(false);
  const { state, setCart, setOrder } = useContext(OrderContext);

  return (
    <Card>
      <Card.Title style={{ fontSize: 24 }}>{name}</Card.Title>
      <Card.Divider />

      <View style={styles.imageContainer}>
        <TouchableOpacity>
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: 'orange' }}>Price: {price}</Text>
        <Button
          title="Order item"
          type="clear"
          titleStyle={{ fontSize: 24 }}
          disabled={isAdded}
          onPress={() => {
            setisAdded(true);
            setCart(name, image, price);
            setOrder(
              buyer,
              product,
              artist,
              shippingAddress,
              city,
              zip,
              country,
              phone,
              email
            );
          }}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ProductList;
