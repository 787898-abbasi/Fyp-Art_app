import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import { Context as ProductContext } from '../../context/productContext';
import { Context as AuthContext } from './../../context/authContext';

const UploadForm = () => {
  const { state } = useContext(AuthContext);
  const { uploadProduct } = useContext(ProductContext);
  const [mainimage, setMainImage] = useState('');
  const [image, setImage] = useState();
  const [name, setNmae] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Soory! we need permission to make it work');
      }
    })();
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  const upload = () => {
    const newImageUri = 'file:///' + image.split('file:/').join('');
    let formData = new FormData();
    formData.append('image', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    });
    formData.append('name', name),
      formData.append('description', description),
      formData.append('price', price);
    formData.append('artist', state.idA);
    uploadProduct(formData);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainimage }} />
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={() => pickImage()}
        >
          <FontAwesome name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Input
        placeholder="Name"
        value={name}
        onChangeText={(value) => setNmae(value)}
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={(value) => setDescription(value)}
      />
      <Input
        placeholder="Price"
        value={price}
        onChangeText={(value) => setPrice(value)}
      />
      <Button
        style={{ width: '100%' }}
        title="Upload Product"
        onPress={() => upload()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default UploadForm;
