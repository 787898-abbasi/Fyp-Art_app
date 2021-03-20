import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import ProductList from '../../components/ProductList';
import { Button } from 'react-native-elements';
import { FontAwesome5, Entypo } from '@expo/vector-icons';

import { Context as ProductContext } from '../../context/productContext';

const ProductScreen = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const { state, getProducts } = useContext(ProductContext);
  // const { state1 } = useContext(AuthContext);
  // console.log(state1.idB);
  const {
    buyer,
    email,
    city,
    country,
    zip,
    phone,
    shippingAddress,
  } = route.params;

  useEffect(() => {
    getProducts();
    setProducts(state.productsData);
  }, []);
  return (
    <ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={{ width: 120 }}
          title="Cart"
          icon={<Entypo name="shopping-cart" size={24} color="black" />}
          onPress={() => navigation.navigate('Cart')}
          type="outline"
        />
        <Button
          buttonStyle={{ width: 120 }}
          title="Orders"
          icon={<FontAwesome5 name="box-open" size={24} color="black" />}
          onPress={() => navigation.navigate('OrderDetail', { buyer: buyer })}
          type="outline"
        />
        <Button
          buttonStyle={{ width: 120 }}
          title="Sign Out"
          icon={<FontAwesome5 name="sign-out-alt" size={24} color="black" />}
          type="outline"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      {state.productsData.map((item) => {
        return (
          <View>
            <ProductList
              key={item._id}
              product={item._id}
              buyer={buyer}
              email={email}
              city={city}
              country={country}
              zip={zip}
              phone={phone}
              shippingAddress={shippingAddress}
              artist={item.artist}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    width: 360,
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
});

export default ProductScreen;
