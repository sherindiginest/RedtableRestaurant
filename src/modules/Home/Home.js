import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image,Dimensions } from 'react-native';


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../../modules/Login/Login';
import Signup from '../../modules/Login/Signup';
import HomeNew from '../../modules/Home/HomeNew';
import HomeScreen from '../Home/HomeScreen';
import MyOrders from '../MyOrder/MyOrders';
import Offer from '../../modules/Home/Offer';

import {  Badge  } from 'react-native-elements'


const Tab = createMaterialBottomTabNavigator();

export default class Home extends React.Component {

  static navigationOptions = {
    title: '',
};
  constructor(props) {
    super(props);
  }

  
 

  render() {
    return (
      
      <View style={{backgroundColor:'#ff6347',flex:1}}>

<NavigationContainer>
<Tab.Navigator style={{borderBottomEndRadius:50,borderBottomStartRadius:50}}
      //initialRouteName="HomeNew"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen
        name="HomeNew"
        component={HomeNew}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="restaurant-menu" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Offer"
        component={Offer}
        options={{
          tabBarLabel: 'Offer',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="location-on" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="My Orders"
        component={MyOrders}
        options={{
          tabBarLabel: 'My Orders',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile2"
        component={Login}
        
        options={{
          tabBarLabel: 'Profile2',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons   name="cart" color={color} size={26} />
            
            
          ),
          
          
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>


       
      </View>
    );
  }
}
