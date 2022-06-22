import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground, FlatList} from 'react-native';
import axios from 'axios';
import {useState} from 'react';
import Profilecomponent from '../../components/Profilecomponent';
import BottomNavigationBar from '../../shared/BottomNavigationBar';
import {useLogin} from '../../context/LoginProvider';

const Collection = () => {
  const [Items, setItems] = useState();
  const {profile, setProfile} = useLogin();
  const auth = {profile};
  const loginperson = auth.profile.id;
  const [count, setCount] = useState();

  const getItems = async () => {
    try {
      const res = await axios.get(
        `http://10.0.2.2:8000/collections/${loginperson}`,
      );
      if (res.data.success) {
        setItems(res.data.data);
        // console.log(loginperson);
        // console.log(res.data.data);
        setCount(res.data.total);
        // console.log('Success');
        // console.log(Items);
        // console.log(count);
      } else {
        console.log('Failed');
        console.log(count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  const Item = ({id, COD}) => (
    <View style={styles.item}>
      <Text style={styles.Itemtext}>{id}</Text>
      <Text style={styles.Itemtamount}>{COD}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item id={item.id} COD={item.COD} />;
  return (
    <ImageBackground
      source={require('../../../assets/img1.jpg')}
      style={{
        flex: 1,
        height: '100%',
      }}>
      <View style={styles.root}>
        <Profilecomponent></Profilecomponent>
        <Text style={styles.CollectionTitle}>Collections </Text>
        <View style={styles.Collection}>
          <View style={styles.infoPanelCol}>
            <Text style={styles.text2}>Total Collections </Text>

            <Text style={styles.text1}>LKR {count} </Text>
          </View>
        </View>
        <View style={styles.collectionSection}>
          <View style={styles.ShipementTextcont}>
            <Text style={styles.ShipementText}>Shipment ID</Text>
            <Text style={styles.ShipementText2}>COD Amount</Text>
          </View>
          <View>
            <FlatList
              data={Items}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            />
          </View>
        </View>
        <BottomNavigationBar />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  CollectionTitle: {
    fontFamily: 'Montserrat-Medium',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    padding: 10,
    paddingBottom: 5,
    flex: 1,
  },
  Collection: {
    flex: 4,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 5,
  },
  infoPanelCol: {
    alignContent: 'center',
    backgroundColor: '#213571',
    borderRadius: 10,
    padding: 10,
    width: 300,
    height: 80,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text1: {
    color: '#fff',
    fontFamily: 'SF-Pro-Displa-Bold',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  text2: {
    color: '#fff',
    fontFamily: 'SF-Pro-Displa-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  collectionSection: {
    flex: 12,
    padding: 20,
  },
  ShipementText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
  },
  ShipementText2: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'right',
  },
  ShipementTextcont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  Itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontStyle: 'normal',
    color: '#000000',
  },
  Itemtamount: {
    fontFamily: 'Montserrat-Medium',
    fontStyle: 'normal',
    color: '#000000',
    textAlign: 'right',
  },
  item: {
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
export default Collection;
