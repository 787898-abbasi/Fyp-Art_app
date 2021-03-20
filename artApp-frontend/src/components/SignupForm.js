import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { CheckBox, Input, Button } from 'react-native-elements';
import {
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Zocial,
  MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SignupForm = ({ onSubmit, errorMessage, onSubmitB }) => {
  const [check, setCheck] = useState('');
  const [iconCheckArtist, setIconCheckArtist] = useState(true);
  const [iconCheckBuyer, setIconCheckBuyer] = useState();
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bname, setBName] = useState();
  const [busername, setbUsername] = useState('');
  const [bpassword, setbPassword] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const navigation = useNavigation();

  const buyerCheck = () => {
    setIconCheckArtist(false);
    setCheck('buyer');
    setIconCheckBuyer(true);
  };
  const artistCheck = () => {
    setIconCheckBuyer(false);
    setCheck('artist');
    setIconCheckArtist(true);
  };
  const onSubt = ({
    bname,
    busername,
    bpassword,
    email,
    city,
    country,
    zip,
    phone,
    shippingAddress,
  }) => {
    onSubmitB({
      bname,
      busername,
      bpassword,
      email,
      city,
      country,
      zip,
      phone,
      shippingAddress,
    });
  };

  return (
    <ScrollView>
      <View style={styles.checkbox}>
        <CheckBox
          title="Artist"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={iconCheckArtist}
          onIconPress={artistCheck}
        />
        <CheckBox
          title="Buyer"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          onIconPress={buyerCheck}
          checked={iconCheckBuyer}
        />
      </View>
      {iconCheckArtist === true ? (
        <View style={styles.formArtist}>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="name"
            value={name}
            leftIcon={
              <FontAwesome5 name="user-circle" size={20} color="black" />
            }
            onChangeText={setName}
          />

          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="username"
            value={username}
            leftIcon={<FontAwesome name="user" size={20} />}
            onChangeText={setUsername}
          />
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            placeholder="Password"
            value={password}
            leftIcon={<FontAwesome name="lock" size={20} />}
            onChangeText={setPassword}
          />

          {errorMessage ? <Text>{errorMessage}</Text> : null}
          <Button
            title="Sign up"
            onPress={() => {
              onSubmit({ name, username, password });
              {
                errorMessage ? null : navigation.navigate('Login');
              }
            }}
          />
        </View>
      ) : (
        <View style={styles.formArtist}>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="name"
            value={bname}
            leftIcon={
              <FontAwesome5 name="user-circle" size={20} color="black" />
            }
            onChangeText={setBName}
          />

          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="username"
            value={busername}
            leftIcon={<FontAwesome name="user" size={20} />}
            onChangeText={setbUsername}
          />
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            placeholder="Password"
            value={bpassword}
            leftIcon={<FontAwesome name="lock" size={20} />}
            onChangeText={setbPassword}
          />
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="email"
            value={email}
            leftIcon={<Zocial name="email" size={24} color="black" />}
            onChangeText={setEmail}
          />
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Zip"
            value={zip}
            leftIcon={<MaterialIcons name="house" size={24} color="black" />}
            onChangeText={setZip}
          />
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Phone"
            value={phone}
            leftIcon={
              <FontAwesome name="phone-square" size={24} color="black" />
            }
            onChangeText={setPhone}
          />
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Shipping Address"
            value={shippingAddress}
            leftIcon={
              <FontAwesome5 name="shipping-fast" size={24} color="black" />
            }
            onChangeText={setShippingAddress}
          />
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="city"
            value={city}
            leftIcon={<FontAwesome5 name="city" size={20} color="black" />}
            onChangeText={setCity}
          />
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Country"
            value={country}
            leftIcon={<Fontisto name="world" size={24} color="black" />}
            onChangeText={setCountry}
          />
          {errorMessage ? <Text>{errorMessage}</Text> : null}

          <Button
            title="Sign up"
            onPress={() =>
              onSubt({
                bname,
                busername,
                bpassword,
                email,
                city,
                country,
                zip,
                phone,
                shippingAddress,
              })
            }
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 50,
    marginRight: 50,
  },
  container: {
    alignContent: 'center',
    margin: 15,
    marginTop: 100,
  },
  formArtist: {
    justifyContent: 'center',
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default SignupForm;
