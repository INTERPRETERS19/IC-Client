import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Profilecomponent from '../../components/Profilecomponent';
import Icon2 from 'react-native-vector-icons/AntDesign';
import BottomNavigationBar from '../../shared/BottomNavigationBar';
const Returns = () => {
  const navigation = useNavigation();
  //#C3E4F5
  //#213571
  //#000000
  //#7E7D7D
  const [Items, setItems] = useState([
    { key: 1, item: '001854', name: ' ' },
    { key: 2, item: '741541', name: ' ' },
    { key: 3, item: '638524', name: ' ' },
    { key: 4, item: '096471', name: ' ' },
    { key: 5, item: '631901', name: ' ' },
    { key: 6, item: '001854', name: ' ' },
    { key: 7, item: '741541', name: ' ' },
  ]);

  const onArrowPressed = () => {
    navigation.navigate('ShipmentInfo');
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('../../../assets/img1.jpg')}
        style={{width: '100%', height: '100%'}}>
        <Profilecomponent></Profilecomponent>
          <View style={[styles.Out]}>
            <View style={[styles.Return]}>
              <Text style={[styles.ReturnText]}>Return</Text>
            </View>

            <View style={styles.ShipmentSection}>
<<<<<<< HEAD
            <View style={styles.ShipementTextcont}>
              <Text style={styles.ShipementText}>ShipmentID</Text>
            </View>
              <ScrollView showsVerticalScrollIndicator={false}>
=======
              <View style={styles.ShipementText}>
                <Text style={{ color: '#000000' }}>Shipment ID</Text>
              </View>
>>>>>>> 3ba8f899bdfbe2ca6cfe57e92f49ba85cf7235dd
              <View>
                {Items.map(object => {
                  return (
                    <View style={styles.item} key={object.key}>
                      <Text style={styles.Itemtext}>{object.item}</Text>
                      <Icon2
                        style={styles.Itemtext}
                        name="right"
                        size={20}
                        color="#000000"
                        onPress={onArrowPressed}
                      />
                    </View>
                  );
                })}
              </View>
              </ScrollView>
            </View>
          </View>
<<<<<<< HEAD
=======
        </ScrollView>
        <BottomNavigationBar />
>>>>>>> 3ba8f899bdfbe2ca6cfe57e92f49ba85cf7235dd
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: '#236501',
  },
  Out: {
    flex: 10,
    fontWeight: 'bold',
    fontSize: 25,
    justifyContent: 'space-between',
    fontFamily: 'Montserrat-Medium',
  },
  Return: {
    flex: 1,
    padding: 15,
    color: '#000000',
    lineHeight: 22,
    letterSpacing: 4,
    textTransform: 'uppercase',
    justifyContent: 'space-between',
  },
  ReturnText: {
    fontFamily: 'Montserrat-Medium',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  ShipmentSection: {
    flex: 4,
    //backgroundColor: '#A45163',
    padding: 20,
    // paddingTop: 120,
  },
  ShipementText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },
  Itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontStyle: 'normal',
    color: '#000000',
    textAlign: 'left',
  },
  item: {
    // backgroundColor:'#006531',
    backgroundColor: '#C3E4F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#C3E4F5',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 10,
  },
});

export default Returns;
