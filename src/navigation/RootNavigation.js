
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../modules/Login/Login';
import Signup from '../modules/Login/Signup';
import LanguageSwitch from '../modules/Language/LanguageSwitch';
import ForgotPassword from '../modules/Login/ForgetPassword';
import Home from '../modules/Home/Home';
import DrawerNavigator from '../modules/drawermenu/DrawerNavigator';
import HomeScreen from '../modules/Home/HomeScreen';
import HomeNew from '../modules/Home/HomeNew';
import Settings from '../modules/Settings/Settings';


export default class RootNavigation extends React.Component {
    render() {
        return <AppContainer />;
    }
}

const AppNavigator = createStackNavigator({

   
    LanguageSwitch : {
        screen: LanguageSwitch,
        navigationOptions: {
            header: null,
        },
    },
    Login : {
        screen: Login,
        navigationOptions: {
            header: null,
        },
    },
   
    Signup: {
        screen: Signup,
        navigationOptions: {
            header: null,
        }
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            header: null,
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
        }
    },
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        }
    },
    HomeNew: {
        screen: HomeNew,
        navigationOptions: {
            header: null,
        }
    },
    DrawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: {
            header: null,
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            header: null,
        }
    },

    
   
});
const AppContainer = createAppContainer(AppNavigator);

