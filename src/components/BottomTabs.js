import React, { useRef, useEffect } from 'react'
import { View, Image, Animated, Easing, Keyboard } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { isEmpty, has } from "lodash"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { email, cart, home, location, tabmenu, orders } from './../../assets/images'

import {
    HomeScreen,
    OurRestaurantsScreen,
    SetLocationScreen,
    MyOrdersScreen,
    CartScreen,
    RestaurantDetailsScreen,
    ChooseRestaurantsScreen,
    CheckOutScreen
} from './../screens'

import { HEIGHT, WIDTH, COLORS } from '../constants'
import SearchScreen from '../screens/SearchScreen'

const TABBAR_HEIGHT = HEIGHT * 0.08
const TABBAR_WIDTH = WIDTH / 5

const TabBarButton = (props) => {
    const { color, style, icon, isCenterTab = false, focused } = props

    const slideAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isCenterTab) {
            Keyboard.addListener("keyboardDidShow", () => startAnimation(0));
            Keyboard.addListener("keyboardDidHide", () => startAnimation(1));
        }
    }, [])

    const startAnimation = (toValue) => {
        Animated.timing(slideAnim, {
            toValue,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false
        }).start()
    }

    const top = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -TABBAR_HEIGHT * 0.2]
    })

    return isCenterTab ? (
        <View style={[{ height: TABBAR_HEIGHT, width: TABBAR_WIDTH, }]}>
            <Animated.View
                style={{
                    top,
                    borderRadius: TABBAR_HEIGHT,
                    backgroundColor: focused ? COLORS.primary : COLORS.yellow1,
                    width: TABBAR_HEIGHT,
                    height: TABBAR_HEIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    source={icon}
                    style={{ tintColor: COLORS.white }}
                    resizeMode="contain"
                />
            </Animated.View>
        </View>
    ) : (
        <View
            style={[{
                height: TABBAR_HEIGHT,
                width: TABBAR_WIDTH,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
            },
            { ...style },
            ]}>
            <Image source={icon} style={{ tintColor: color }} resizeMode="contain" />
        </View>
    )
}
{/* <RouteStack.Screen name="RestaurantDetailsScreen" component={RestaurantDetailsScreen} /> */ }
const HomeScreenStack = createStackNavigator()
const HomeScreenRoute = () => {
    return (
        <HomeScreenStack.Navigator
            screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            initialRouteName="HomeScreen">
            <HomeScreenStack.Screen name="HomeScreen" component={HomeScreen} />
            <HomeScreenStack.Screen name="RestaurantDetailsScreen" component={RestaurantDetailsScreen} />
            <HomeScreenStack.Screen name="ChooseRestaurantsScreen" component={ChooseRestaurantsScreen} />
            <HomeScreenStack.Screen name="SearchScreen" component={SearchScreen} />
        </HomeScreenStack.Navigator>
    )
}
const OurRestaurantsScreenStack = createStackNavigator()
const OurRestaurantsScreenRoute = () => {
    return (
        <OurRestaurantsScreenStack.Navigator
            screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            initialRouteName="OurRestaurantsScreen">
            <OurRestaurantsScreenStack.Screen name="OurRestaurantsScreen" component={OurRestaurantsScreen} />
            <OurRestaurantsScreenStack.Screen name="RestaurantDetailsScreen" component={RestaurantDetailsScreen} />
            <OurRestaurantsScreenStack.Screen name="SearchScreen" component={SearchScreen} />
        </OurRestaurantsScreenStack.Navigator>
    )
}

const CheckoutScreenStack = createStackNavigator()
const CheckoutScreenRoute = () => {
    return (
        <CheckoutScreenStack.Navigator
            screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            initialRouteName="CartScreen">
            <CheckoutScreenStack.Screen name="CartScreen" component={CartScreen} />
            <CheckoutScreenStack.Screen name="CheckOutScreen" component={CheckOutScreen} />
        </CheckoutScreenStack.Navigator>
    )
}

const BottomTabsStack = createBottomTabNavigator()

const BottomTabs = (props) => {
    const { cartList } = props
    return (
        <BottomTabsStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="HomeTab"
            tabBarOptions={{
                activeTintColor: COLORS.activeTabColor,
                inactiveTintColor: COLORS.inactiveTabColor,
                style: {
                    height: TABBAR_HEIGHT,
                    borderTopRightRadius: TABBAR_HEIGHT,
                    borderTopLeftRadius: TABBAR_HEIGHT,
                    position: 'absolute',
                },
                showLabel: false,
                keyboardHidesTabBar: true,
            }}>
            <BottomTabsStack.Screen
                name="HomeTab"
                component={HomeScreenRoute}
                options={{
                    tabBarIcon: (props) => (
                        <TabBarButton
                            {...props}
                            style={{ borderTopLeftRadius: TABBAR_HEIGHT }}
                            icon={home}
                        />
                    ),
                }}
            />
            <BottomTabsStack.Screen
                name="OurRestaurantsTab"
                component={OurRestaurantsScreenRoute}
                initialParams={{ title: "Our Restaurants" }}
                options={{

                    tabBarIcon: (props) => <TabBarButton {...props} icon={tabmenu} />,
                }}
            />
            <BottomTabsStack.Screen
                name="SetLocationScreen"
                component={SetLocationScreen}
                options={{
                    tabBarIcon: (props) => (
                        <TabBarButton {...props} icon={location} isCenterTab />
                    ),
                }}
            />
            <BottomTabsStack.Screen
                name="MyOrdersScreen"
                component={MyOrdersScreen}
                options={{
                    tabBarIcon: (props) => <TabBarButton {...props} icon={orders} />,
                }}
            />
            <BottomTabsStack.Screen
                name="CartTab"
                component={CheckoutScreenRoute}
                options={{
                    tabBarIcon: (props) => (
                        <TabBarButton
                            {...props}
                            icon={cart}
                            style={{ borderTopRightRadius: TABBAR_HEIGHT }}
                        />
                    ),
                    tabBarBadge: has(cartList, "cartDetails") ? cartList?.cartDetails.length : null,
                    tabBarBadgeStyle: {
                        left: -1, top: 15,
                    }
                }}
            />
        </BottomTabsStack.Navigator>
    )
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        cartList: ProfileReducer.cartList,
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabs)
