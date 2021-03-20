import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Link = ({ text, route }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(route);
      }}
    >
      <Text style={{ color: 'darkblue' }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Link;
