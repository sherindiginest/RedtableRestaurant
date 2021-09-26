import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, Pressable } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { has, isEmpty } from "lodash"

import { Header, RestaurantComponent } from '../components'
import { API, Axios, COLORS, HEIGHT, navigate, STYLES, WIDTH } from '../constants'
import { LoadingAction, profileAction } from '../redux/actions'

const NotificationScreen = (props, context) => {
    const { route, navigation, lang, showLoader, hideLoader, userData, setProfileData, country } = props
    const { api_token, id } = userData
    const [notificationList, setNotificationList] = useState([])
    const [metaData, setmetaData] = useState({});

    useEffect(() => {
        navigation.addListener('focus', () => {
            getData()
        });
    }, [])

    useEffect(() => {
        getData()
    }, [country])

    const getData = async (page = 1) => {
        if (!has(metaData, "last_page") || metaData.last_page >= page) {
            showLoader()
            await Axios.get(API.notification(id), { params: { api_token, page } })
                .then(async (response) => {
                    if (has(response, "success") && response.success) {
                        setNotificationList([...notificationList, ...response.data.data])
                        setmetaData(response.data)
                    }
                    hideLoader()
                }).catch((error) => {
                    console.log(error);
                    hideLoader()
                })
        }
    }

    const setReadStatus = async (notification_id) => {
        if (!isEmpty(api_token)) {
            showLoader()
            await Axios.post(API.notificationStatus, { api_token, notification_id })
                .then(async (response) => {
                    if (has(response, "success") && response.success) {
                        getProfileData()
                    } else {
                        hideLoader()
                    }
                }).catch((error) => {
                    console.log(error);
                    hideLoader()
                })
        }
    }

    const getProfileData = async () => {
        await Axios.get(API.userProfile, { params: { api_token } })
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setProfileData(response.data)
                }
                hideLoader()
            }).catch((error) => {
                hideLoader()
                console.log("error ==>", error);
            })
    }

    const navigationAction = async (data) => {
        if (data.status == 0) {
            setReadStatus(data.id)
        }
        const navPath = {
            coupon: { screen: "OffersScreen" },
            restaurant: { screen: "Bottom", params: { screen: "HomeTab", params: { screen: "RestaurantDetailsScreen", params: { item: data?.restaurant } } } },
            order: { screen: "Bottom", params: { screen: "MyOrdersScreen" } }
        }
        navigate('Home', navPath[data.type])
    }

    return (<Header backgroundColor={COLORS.white} title="notifications" titleColor={COLORS.black} notificationButton={false}>
        <View style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={notificationList}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.05}
                onEndReached={() => { getData(metaData.current_page + 1) }}
                renderItem={({ item, index }) => {
                    return <Pressable onPress={() => navigationAction(item)} style={{ WIDTH: WIDTH * 0.95, height: HEIGHT * 0.1, padding: WIDTH * 0.05, justifyContent: "space-evenly", backgroundColor: item.status == 0 ? `${COLORS.primary}20` : COLORS.white }}>
                        <View style={[{ justifyContent: "space-between", }, STYLES.flexDirection(lang)]}>
                            <Text style={[{ fontSize: 15 }, STYLES.fontMedium()]}>{item.title}</Text>
                            <Text style={[{ fontSize: 10 }, STYLES.fontMedium()]}>{item.created_at}</Text>
                        </View>
                        <Text style={[{ fontSize: 13, color: COLORS.placeHolderColor }, STYLES.fontRegular()]}>{item.message}</Text>
                    </Pressable>
                }}
                ItemSeparatorComponent={() => <View style={{ width: WIDTH, borderTopWidth: 0.5, alignSelf: "center", borderColor: COLORS.placeHolderColor }} />}
            />
        </View>
    </Header>)
}

NotificationScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = (state) => {
    const { ProfileReducer, i18nState } = state
    return {
        lang: i18nState.lang,
        userData: ProfileReducer.userData,
        country: ProfileReducer.country,
    };
}

const mapDispatchToProps = {
    hideLoader: () => LoadingAction.hideLoader(),
    showLoader: () => LoadingAction.showLoader(),
    setProfileData: (userData) => profileAction.setProfileData(userData),
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
