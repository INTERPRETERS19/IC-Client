import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import client from './../../routes/client';
import {updateError} from './../../utils/methods';

const ShipmentInfo = ({route}) => {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState();
  const {shipmentId, contact, cod, name, city, district, status} = route.params;
  const [isSelected, setSelection] = useState(false);
  const [error, setError] = useState();
  const [deliveredDate, setDeliveredDate] = useState();

  const onDonePressed = async () => {
    // if(text===""){
    //   onChangeText("Not applicable");
    // }
    // if((text==="Not applicable")&&(!(selectedValue == "Delivered")||!(selectedValue == "OutForDelivery"))){
    //   //popup???
    // console.log("reason??");
    // setSelection(true);
    // }
    console.log(selectedValue);

    if (selectedValue === 'Delivered') {
      const date = new Date();
      setDeliveredDate(date);
    }

    console.log(deliveredDate);
    //console.log((isSelected&&!(cod==0)));
    console.log(shipmentId);
    console.log(text);
    if (isFinished(selectedValue, text, cod)) {
      try {
        const res = await client.post('/updatestatus', {
          shipmentId,
          selectedValue,
          text,
          deliveredDate,
        });
        if (res.data.success) {
          setSelectedValue('OutForDelivery');
          onChangeText('');
          setSelection(false);
          navigation.navigate('OutForDelivery');
        } else {
          return updateError('User already exist', setError);
        }
      } catch (error) {
        return updateError('Something went wrong!!!', setError);
      }
    }
  };
  const isFinished = (selectedValue, text, cod) => {
    if (selectedValue == 'Delivered' && !isSelected && cod !== 0)
      return updateError('Please confirm COD received!', setError);

    if (
      (selectedValue === 'FailToDeliver' || selectedValue === 'Rescheduled') &&
      text === ''
    )
      return updateError('Please state the reason!', setError);

    if (
      (selectedValue === 'FailToDeliver' ||
        selectedValue === 'Rescheduled' ||
        selectedValue === 'OutForDelivery') &&
      isSelected
    )
      return updateError('COD should not be selected!', setError);

    return true;
  };

  const onbackPressed = () => {
    navigation.navigate('OutForDelivery');
  };
  const [selectedValue, setSelectedValue] = useState('OutForDelivery');

  return (
    <View style={styles.body}>
      <ImageBackground
        source={require('../../../assets/img1.jpg')}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View style={styles.topbar}>
          <View style={styles.topbarin}>
            {/* <View style={styles.topbarin1}>
              <Icon
                name="keyboard-arrow-left"
                size={35}
                color="rgba(0, 0, 0, 0.40)"
                onPress={onbackPressed}
              />
            </View> */}
            <View style={styles.topbarin2}>
              <Text style={{fontSize: 22}}>Info</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={styles.contentfull}>
            <View style={styles.content}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={styles.head}>Shipment ID</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.head}>{shipmentId}</Text>
                </View>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoIn}>Recepient</Text>
                <Text style={styles.form}>{name}</Text>
                <Text style={styles.infoIn}>Contact number</Text>
                <Text style={styles.form}>{contact}</Text>
                <Text style={styles.infoIn}>District</Text>
                <Text style={styles.form}>{district}</Text>
                <Text style={styles.infoIn}>City</Text>
                <Text style={styles.form}>{city}</Text>
                {/* <Text style={styles.infoIn}>COD amount</Text> */}
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text style={styles.infoIn}>COD amount</Text>
                  </View>
                  <View style={{flex: 1, marginLeft: 100}}>
                    {!(cod === 0) && (
                      <>
                        <CheckBox
                          value={isSelected}
                          onValueChange={setSelection}
                        />
                      </>
                    )}
                  </View>
                </View>
                <Text style={styles.form}>{cod}</Text>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={styles.infoIn}>Status</Text>
                  <View style={styles.container}>
                    <Picker
                      selectedValue={selectedValue}
                      style={{
                        display: 'flex',
                        height: 20,
                        width: 200,
                        marginTop: 18,
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        //alignSelf: 'center',
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedValue(itemValue)
                      }>
                      <Picker.Item label="Rescheduled" value="Rescheduled" />
                      <Picker.Item
                        label="Failed to Deliver"
                        value="FailToDeliver"
                      />
                      <Picker.Item label="Delivered" value="Delivered" />
                      <Picker.Item
                        label="Out for delivery"
                        value="OutForDelivery"
                      />
                    </Picker>
                  </View>
                </View>
              </View>
              <View>
                {!(selectedValue == 'Delivered') &&
                  !(selectedValue == 'OutForDelivery') && (
                    <>
                      <TextInput
                        multiline
                        //numberOfLines={4}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="State the reason"
                        style={{
                          padding: 1,
                          backgroundColor: 'rgba(0, 0, 0, 0.07)',
                          marginTop: 30,
                          fontFamily: 'Roboto-Regular',
                          fontSize: 18,
                        }}
                      />
                    </>
                  )}
              </View>
              <View>
                {error ? (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 20,
                      textAlign: 'center',
                    }}>
                    {error}
                  </Text>
                ) : null}
              </View>
              <View style={styles.button}>
                <CustomButton text="Done" onPress={onDonePressed} />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contentfull: {
    flex: 15,
  },
  topbar: {
    flex: 0.4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // padding: 20,
  },
  content: {
    padding: 20,
    flex: 6,
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
  },
  head: {
    flex: 1,
    //paddingTop: 10,
    //alignItems: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
    //textAlign: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 10,
  },
  info: {
    flex: 7,
    padding: 10,
  },
  button: {
    flex: 1,
    padding: 30,
  },
  infoIn: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 18,
  },
  checkbox: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    alignSelf: 'center',
  },
  topbarin: {
    flex: 1,
    flexDirection: 'row',
  },
  topbarin1: {
    flex: 1,
  },
  topbarin2: {
    flex: 7,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
  },
});
export default ShipmentInfo;
