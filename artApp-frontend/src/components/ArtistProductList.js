import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';

const ArtistProductList = ({ image, name, price, onDelete, product }) => {
  return (
    <View>
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
            title="delete"
            titleStyle={{ fontSize: 24 }}
            buttonStyle={{ marginRight: 0, marginLeft: 0 }}
            onPress={() => {
              onDelete(product);
            }}
          />
        </View>
      </Card>
    </View>
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

export default ArtistProductList;
