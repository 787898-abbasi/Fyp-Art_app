import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Context as AuthContext } from './../../context/authContext';
import { Context as ProductContext } from '../../context/productContext';
import ArtistProductList from '../../components/ArtistProductList';
import { ListItem } from 'react-native-elements/dist/list/ListItem';

const UploadScreen = ({ route, navigation }) => {
  const { state, getProduct, deleteProduct } = useContext(ProductContext);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const buttons = ['Upload Product', 'View Orders'];
  const { artist } = route.params;

  useEffect(() => {
    getProduct(artist);
  }, []);

  const deletep = (id) => {
    deleteProduct(id);
  };

  return (
    <ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={{ marginRight: 0, width: 180 }}
          icon={<FontAwesome5 name="box-open" size={24} color="black" />}
          title="Orders"
          onPress={() => navigation.navigate('Order', { artist: artist })}
          type="outline"
        />
        <Button
          buttonStyle={{ marginRight: 0, width: 180 }}
          icon={<FontAwesome name="upload" size={24} color="black" />}
          title="Upload"
          onPress={() => navigation.navigate('UploadForm')}
          type="outline"
        />
      </View>
      <View>
        {state.productData.length > 0 ? (
          state.productData.map((item) => {
            return (
              <View>
                <ArtistProductList
                  key={item._id}
                  product={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  onDelete={(id) => deletep(id)}
                />
              </View>
            );
          })
        ) : (
          <Text>no products to show</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: 360,
    marginHorizontal: 10,
    // borderWidth: 4,
    // borderColor: 'black',
  },
});

export default UploadScreen;
