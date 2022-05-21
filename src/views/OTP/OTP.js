import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,

} from 'react-native';
import CustomInput from '../../components/CustomInput';
import COLORS from '../../components/colors';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';


const OTP = () => {

  const {height} = useWindowDimensions();
  const navigation = useNavigation();

const onVerifyPressed = () => {
    navigation.navigate('NewPassword');
  };
const onBacktoMyAccountPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{marginTop: 160}}>
          <Text style={{ fontFamily: 'Poppins',fontSize: 29, fontWeight: 'bold', textAlign: "center",
    color: COLORS.dark}}>
            Confirm OTP
          </Text>

          <Text style={{fontFamily: 'Poppins',fontSize: 17, fontWeight: 'bold', textAlign: "center", color: '#656363', marginTop: 50, marginBottom: 20, marginLeft: 10, marginRight: 10, backgroundColor: '#D2F3C6'}}>
            Enter OTP we just sent to your mobile number: +94******134
          </Text>
        </View>

         <View style={{marginTop: 20}}>
         <CustomButton
         text="Verify"
         onPress={onVerifyPressed}
         />

         <CustomButton
                  text="Back to my Account"
                  onPress={onBacktoMyAccountPressed}
                  type="TERTIARY"
                  />
         </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },

  container: {
        flex: 1,
        alignItems: "flex-start",
      marginLeft:25,
        justifyContent: "center",

      },

      label: {
        margin: 8,
      },
});

export default OTP;