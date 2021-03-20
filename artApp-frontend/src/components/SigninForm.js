import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { CheckBox, Input, Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

const SigninForm = (props) => {
  const [check, setCheck] = useState('');
  const [iconCheckArtist, setIconCheckArtist] = useState();
  const [iconCheckBuyer, setIconCheckBuyer] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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

      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Username"
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
      {props.errorMessage ? (
        <Text style={{ color: 'red' }}>{props.errorMessage}</Text>
      ) : null}

      {iconCheckBuyer === true ? (
        <Button
          title="Sign in Buyer"
          onPress={() => props.onSubmitB({ username, password })}
        />
      ) : (
        <Button
          title="Sign in Artist"
          onPress={() => props.onSubmit({ username, password })}
        />
      )}
    </KeyboardAvoidingView>
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
});

export default SigninForm;
