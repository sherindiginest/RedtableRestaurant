
import React, { Component } from 'react';
import { View, Text,TextInput, SectionList, AsyncStorage,Dimensions,  TouchableOpacity, FlatList, ScrollView, Image, BackHandler  } from 'react-native';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Sidemenu from '../drawermenu/Sidebar';
import Login from '../Login/Login';
import Signup from '../Login/Signup';
import Home from '../Home/Home';
import LanguageSwitch from '../Language/LanguageSwitch';
import Settings from '../Settings/Settings';
import ResetPassword from '../Settings/ResetPassword';
import EditProfile from '../Settings/EditProfile';
import ManageAddress from '../Settings/ManageAddress';
import Notification from '../Notification/Notification';
import MyOrders from '../MyOrder/MyOrders';
import HomeNew from '../Home/HomeNew';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const headerBackground = require('../../../assets/images/img1.png');


const { width } = Dimensions.get('window');
var car='';
var tok='';
export default class DrawerNavigator extends Component {
    constructor(props) {
        super(props);
        this.state={
            unreadCount:'',
            UserToken:''
        }
    }
    async componentDidMount() {
        let Token = await AsyncStorage.getItem('Tokenkey');
        this.setState({  UserToken: Token})
    
    }
   
    Notification()
    {
        this.props.navigation.navigate('Notification')
    }

    render() {
        return <AppContainer />;
    }
}

const MainStackNavigator = createStackNavigator(
    {
       
        //Login:Login,
        Home: Home,
        HomeNew:HomeNew,
        Settings:Settings,
        ResetPassword:ResetPassword,
        EditProfile:EditProfile,
        ManageAddress:ManageAddress,
        Notification:Notification,
        MyOrders:MyOrders,

        Main: {
            screen: Home,
            navigationOptions: () => ({
              title: 'SMART LIVE',
              headerLeft: null, 
                          
            
            }),
          },
        LanguageSwitch : {
            screen: LanguageSwitch,
            navigationOptions: {
                header: null,
            },
        },
        Login: {
            screen: Login,
            navigationOptions: {
              header: null,
              
            },
          },
         
          DrawerNavigator: {
            screen: DrawerNavigator,
           navigationOptions:{
             header:null,
           }
          },
          Signup: {
            screen: Signup,
           navigationOptions:{
             header:null,
           }
          },
      

    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            const { params = {} } = navigation.state;
            return {
                // headerBackground: (
                //     <Image
                //       style={{
                //         flex: 1,
                //         width,
                //       }}
                //       source={headerBackground}
                //       resizeMode="cover"
                //     />
                //   ),
                headerLeft: (
                    <Icon
                        style={{
                            paddingLeft: 7
                        }}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu"
                        size={40}
                    />
                ),
                headerBackground: (
                    <Image
                      style={{ flex: 1,width:70,height:70,paddingLeft:'100%',backgroundColor:'white' }}
                      source={headerBackground}
                      resizeMode='center'
                      
                    />
                  ),
                headerRight: (
                    <MaterialCommunityIcons
                        // style={{
                        //     paddingLeft: 7
                        // }}
                        //onPress={() => navigation.openDrawer()}
                        name="bell"
                        size={25}
                        onPress={() =>navigation.navigate('Notification')}
                    />
                ),

                
               


            };
        }
    }
);


const AppDrawerNavigator = createDrawerNavigator({
    MainNavigation: {
        screen: MainStackNavigator
    },
    
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
        },
    },
  
    
    
},
    {
        contentComponent: ({ navigation }) => (<Sidemenu navigation={navigation} />),
    }
);

const AppSwitchNavigator = createSwitchNavigator({
    Home: { screen: AppDrawerNavigator },
   

   
});

const AppContainer = createAppContainer(AppSwitchNavigator);


