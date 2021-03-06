import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import DashButtons from '../../components/DashButtons';
import PieChart from 'react-native-pie-chart';
import BottomNavigationBar from '../../shared/BottomNavigationBar';
import client from '../../routes/client';
import {useLogin} from '../../context/LoginProvider';

const Dashboard = () => {
  const navigation = useNavigation();
  const widthAndHeight = 180;
  const [Items, setItems] = useState();
  const {profile, setProfile} = useLogin();
  const auth = {profile};
  const nameDriver = auth.profile.fullname;
  const loginperson = auth.profile.id;
  const [loading, setLoading] = useState(true);
  const [deliveredcount, setdeliveredcount] = useState(1);
  const [returnscount, setreturnscount] = useState(1);
  const [rescheduledcount, setrescheduledcount] = useState(1);
  const [pendingcount, setpendingcount] = useState(1);
  const [pickedupcount, setpickedupcount] = useState(1);
  const [count, setCount] = useState(0);

  const pendingCount = async () => {
    try {
      const res = await client.get(`/OutForDelivery/${loginperson}`);
      if (res.data.success) {
        setItems(res.data.data);
        setpendingcount(res.data.count);
        setLoading(false);
      } else {
        console.log('Failed');
        console.log(Items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    pendingCount();
  }, []);
  const returnsCount = async () => {
    try {
      const res = await client.get(
        `http://10.0.2.2:8000/failtodelivery/${loginperson}`,
      );
      if (res.data.success) {
        setItems(res.data.data);
        setreturnscount(res.data.count);
      } else {
        console.log('Failed');
        console.log(Items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    returnsCount();
  }, []);
  const reScheduledCount = async () => {
    try {
      const res = await client.get(`/Rescheduled/${loginperson}`);
      if (res.data.success) {
        setItems(res.data.data);
        setrescheduledcount(res.data.count);
      } else {
        console.log('Failed');
        console.log(Items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reScheduledCount();
  }, []);

  const deliveredCount = async () => {
    try {
      const res = await client.get(`/delivered/${loginperson}`);
      if (res.data.success) {
        setItems(res.data.data);
        setdeliveredcount(res.data.count);
      } else {
        console.log('Failed');
        console.log(Items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    deliveredCount();
  }, []);

  const pickedupCount = async () => {
    try {
      const res = await client.get(
        `http://10.0.2.2:8000/pickup/${loginperson}`,
      );
      if (res.data.success) {
        setItems(res.data.data);
        setpickedupcount(res.data.count);
      } else {
        console.log('Failed');
        console.log(Items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    pickedupCount();
  }, []);

  // const a = deliveredcount;
  // const b = pendingcount;
  // const c = rescheduledcount;
  // const d = returnscount;
  const s = [
    deliveredcount,
    pendingcount,
    rescheduledcount,
    returnscount,
    pickedupcount,
  ];
  const sliceColor = ['#C3E4F5', '#213571', '#000', '#7E7D7D', '#a2d2ff'];
  const onMenuPressed = () => {
    navigation.openDrawer();
  };
  const onSettingsPressed = () => {
    navigation.navigate('Settings');
  };
  const onDeliveredShipmentPressed = () => {
    navigation.navigate('DeliveredShipment');
  };
  const onPedingShipmentPressed = () => {
    navigation.navigate('OutForDelivery');
  };
  const onRescheduledShipmentPressed = () => {
    navigation.navigate('RescheduledShipment');
  };
  const onReturnPressed = () => {
    navigation.navigate('Returns');
  };
  const onCollectionsPressed = () => {
    navigation.navigate('PickUp');
  };
  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('../../../assets/img1.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View style={[styles.topbar]}>
          <Icon
            name="md-menu-sharp"
            size={35}
            color="#000000"
            onPress={onMenuPressed}
          />
          <Icon
            name="settings-sharp"
            size={30}
            color="#000000"
            onPress={onSettingsPressed}
          />
        </View>

        <View style={[styles.welcomeBar]}>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.name}>{nameDriver},</Text>
        </View>

        <View style={[styles.dashboard]}>
          <Text style={styles.dashboardTitle}>Dashboard</Text>
        </View>
        <View style={[styles.infoPanel]}>
          <View style={[styles.infoPanelCol]}>
            <DashButtons
              text={`Delivered Shipments \n\n${deliveredcount}`}
              onPress={onDeliveredShipmentPressed}
              type="1"
              onRefresh={() => pendingCount()}
              refreshing={loading}
            />

            <DashButtons
              text={`Re-Scheduled Shipments \n\n${rescheduledcount}`}
              onPress={onRescheduledShipmentPressed}
              type="3"
            />
          </View>

          <View style={[styles.infoPanelCol]}>
            <DashButtons
              text={`Out For delivery \n\n${pendingcount}`}
              onPress={onPedingShipmentPressed}
              type="2"
            />

            <DashButtons
              text={`Fail to deliver Shipments \n\n${returnscount}`}
              onPress={onReturnPressed}
              type="4"
            />
          </View>

          <View style={[styles.infoPanelCol]}>
            <DashButtons
              text={`Pick Up Shipments \n\n${pickedupcount}`}
              onPress={onCollectionsPressed}
              type="5"
            />
          </View>
        </View>

        <View style={[styles.pieChartPanel]}>
          <View style={[styles.Pie1]}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={[
                deliveredcount,
                pendingcount,
                rescheduledcount,
                returnscount,
                pickedupcount,
              ]}
              sliceColor={sliceColor}
              doughnut={true}
              coverRadius={0.45}
              coverFill={'#FFF'}
            />
          </View>
          <View style={[styles.Pie]}>
            <Text style={styles.PieName}>
              <Icon name="square" size={15} color="#C3E4F5" /> Delivered
              Shipments
            </Text>
            <Text style={styles.PieName}>
              <Icon name="square" size={15} color="#213571" /> Pending
              Deliveries
            </Text>
            <Text style={styles.PieName}>
              <Icon name="square" size={15} color="#000000" /> Re-Scheduled
            </Text>
            <Text style={styles.PieName}>
              <Icon name="square" size={15} color="#7E7D7D" /> Fail to Deliver
            </Text>
            <Text style={styles.PieName}>
              <Icon name="square" size={15} color="#a2d2ff" /> Pick Up
            </Text>
          </View>
        </View>

        <BottomNavigationBar />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topbar: {
    flex: 0.8,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 0,
  },
  welcomeBar: {
    flex: 0.5,
    paddingLeft: 20,
    paddingBottom: 15,
  },
  welcome: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    lineHeight: 16,
    color: '#213571',
  },
  name: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    lineHeight: 26,
    color: '#000000',
  },
  dashboard: {
    flex: 0.5,
  },
  dashboardTitle: {
    fontFamily: 'Montserrat-Medium',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
  infoPanel: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: '#D1D1D1',
    borderTopLeftRadius: 40,
    padding: 15,
  },
  infoPanelCol: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  Pie: {
    flex: 1,
    padding: 15,
    paddingVertical: 50,
  },
  Pie1: {
    flex: 1,
  },
  PieName: {
    color: '#000000',
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    lineHeight: 20,
    paddingLeft: 20,
    textAlign: 'left',
  },
  pieChartPanel: {
    flex: 2.5,
    padding: 20,
    paddingTop: 20,

    paddingBottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});

export default Dashboard;
