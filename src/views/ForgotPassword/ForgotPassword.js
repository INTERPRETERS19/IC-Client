import React, {useState} from 'react';
//import RadioForm from 'react-native-simple-radio-button';
import CheckBox from '@react-native-community/checkbox';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,

} from 'react-native';
//import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import COLORS from '../../components/colors';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';





const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);
  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    navigation.navigate('Dashboard');
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false}>

        {/* <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        /> */}
        <View style={{marginTop: 160}}>
          <Text style={{ fontFamily: 'Poppins',fontSize: 29, fontWeight: 'bold', textAlign: "center",
    color: COLORS.dark}}>
            Welcome!
          </Text>
          <Text style={{fontFamily: 'Poppins',fontSize: 17, fontWeight: 'bold', textAlign: "center", color: COLORS.light}}>
            Sign in to your account to continue
          </Text>
        </View>

         <View style={styles.root}>
        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        </View>
        <View style={styles.container}>
       <View style={styles.checkboxContainer}>
         <CheckBox
           value={isSelected}
           onValueChange={setSelection}
           style={styles.checkbox}

         />
        </View>

     </View>
        {/* <Text style={{fontFamily: 'Poppins',fontSize: 15, fontWeight: 'bold', textAlign: "left",marginLeft:40, color: COLORS.light}}>
          Remember me
          </Text> */}
         <View style={{marginTop: 20}}>
        <CustomButton
         text="Sign In"
         onPress={onSignInPressed}
         />
        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
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
  // logo: {
  //   width: '70%',
  //   maxWidth: 300,
  //   maxHeight: 200,
  // },
  container: {
        flex: 1,
        alignItems: "flex-start",
      marginLeft:25,
        justifyContent: "center",
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
      },
});

export default SignInScreen;