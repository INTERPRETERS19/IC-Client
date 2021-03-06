import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
const CustomInput = ({value, setValue, placeholder}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={'#c0c6c9'}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        // secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    fontFamily: 'Poppins-Medium',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 7,
  },
  input: {
    color: '#000000',
  },
});

export default CustomInput;
