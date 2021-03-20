import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignupForm from '../../components/SignupForm';
import { Context as Auth } from '../../context/authContext';

const Signup = () => {
  const { state, signupA, signupB } = useContext(Auth);

  return (
    <View>
      <SignupForm
        onSubmit={signupA}
        errorMessage={state.errorMessage}
        onSubmitB={signupB}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Signup;
