import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Context as OrderContext } from '../../context/orderContext';
import { Card, Button, Icon } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

const CartScreen = () => {
  const { state, postOrder } = useContext(OrderContext);
  //   const [disabled, setDisabled] = useState(false);
  return (
    <ScrollView>
      {state.cartData.length > 0 ? (
        <View style={styles.cartContainer}>
          {state.cartData.map((item, index) => {
            return (
              <Card
                containerStyle={{ width: 300, borderRadius: 20 }}
                key={item.image}
              >
                <Card.Title>{item.name}</Card.Title>
                <Card.Divider />
                <Card.Image
                  source={{ uri: item.image }}
                  style={{ height: 300 }}
                />
                <Card.Divider />
                <Button
                  icon={
                    <FontAwesome5
                      name="cart-arrow-down"
                      size={24}
                      color="black"
                    />
                  }
                  buttonStyle={{
                    // backgroundColor: 'transparent',
                    marginTop: 5,
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  title="Order Now"
                  titleStyle={{ color: 'black' }}
                  onPress={() => {
                    postOrder(state.orderData[index]);
                    // setDisabled(true);
                  }}
                />
              </Card>
            );
          })}
        </View>
      ) : (
        <View>
          <Text>no item in the cart</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default CartScreen;
