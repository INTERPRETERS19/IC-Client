import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native';
import client from '../../routes/client';
import {useState} from 'react';
import Profilecomponent from '../../components/Profilecomponent';
import BottomNavigationBar from '../../shared/BottomNavigationBar';
import {useLogin} from '../../context/LoginProvider';
import {useNavigation} from '@react-navigation/native';

const Delivered = () => {
  const navigation = useNavigation();
  const [Items, setItems] = useState();
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState('');
  const searchFilter = text => {
    if (text) {
      const newData = filterData.filter(item => {
        const itemData = item.id ? item.id : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(Items);
      setSearch(text);
    }
  };
  const {profile, setProfile} = useLogin();
  const auth = {profile};
  const loginperson = auth.profile.id;

  const getItems = async () => {
    try {
      const res = await client.get(
        `http://10.0.2.2:8000/delivered/${loginperson}`,
      );
      if (res.data.success) {
        setItems(res.data.data);
        setFilterData(res.data.data);
        setLoading(false);
        console.log('Success');
      } else {
        console.log('Failed');
        console.log(Items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  const Item = ({
    id,
    r_city,
    current_status,
    recipient_name,
    r_district,
    mobile_phone_number,
    COD,
    delivered_date,
  }) => (
    <View style={styles.item}>
      <Text
        style={styles.Itemtext}
        onPress={() =>
          navigation.navigate('ShipmentDetails', {
            shipmentId: id,
            name: recipient_name,
            city: r_city,
            status: current_status,
            district: r_district,
            contact: mobile_phone_number,
            cod: COD,
            deliveredDate: delivered_date,
          })
        }>
        {id}
      </Text>
      <Text style={styles.Itemtext}>{delivered_date.substring(0, 10)}</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <Item
      id={item.id}
      r_no_street={item.r_no_street}
      r_city={item.r_city}
      current_status={item.current_status}
      r_district={item.r_district}
      mobile_phone_number={item.mobile_phone_number}
      COD={item.COD}
      recipient_name={item.recipient_name}
      delivered_date={item.delivered_date}
    />
  );

  const onArrowPressed = () => {
    navigation.navigate('ShipmentDetails');
  };
  return (
    <ImageBackground
      source={require('../../../assets/img1.jpg')}
      style={{
        flex: 1,
        height: '100%',
      }}>
      <View style={styles.root}>
        <Profilecomponent></Profilecomponent>
        <Text style={styles.DeliveredTitle}>Delivered </Text>
        <View style={styles.Delivered}></View>
        <View>
          <TextInput
            style={styles.search}
            value={search}
            placeholder="Search"
            underlineColorAndroid="transparent"
            onChangeText={text => searchFilter(text)}
          />
        </View>
        <View style={styles.DeliveredSection}>
          <View style={styles.ShipementTextcont}>
            <Text style={styles.ShipementText}>Shipment ID</Text>
            <Text style={styles.ShipementText2}>Delivered date</Text>
          </View>
          <View>
            <FlatList
              data={filterData}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              onRefresh={() => getItems()}
              refreshing={loading}
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
  DeliveredTitle: {
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
  Delivered: {
    flex: 4,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 5,
    backgroundColor:""
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
  DeliveredSection: {
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
  search: {
    height: 40,
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 20,
    margin: 10,
    borderColor: '#0096',
    backgroundColor: '#fff',
  },
});
export default Delivered;
