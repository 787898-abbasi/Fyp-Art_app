import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import SigninForm from '../../components/SigninForm';
import Link from '../../components/Link';
import { Context } from '../../context/authContext';

const Signin = ({ navigation }) => {
  const { state, loginA, loginB } = useContext(Context);

  return (
    <View>
      <SigninForm
        navigation={navigation.navigate}
        errorMessage={state.errorMessage}
        onSubmit={loginA}
        onSubmitB={loginB}
      />
      <View style={{ marginLeft: 15 }}>
        <Link text="Dont have a Account? SignUp instead" route="Signup" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Signin;
