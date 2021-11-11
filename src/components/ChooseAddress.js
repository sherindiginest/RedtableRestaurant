import React, { useRef, useEffect, useState } from 'react'
import { View, Text, Animated, Easing, BackHandler, Image, FlatList, Pressable } from 'react-native'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, has, isNull } from "lodash"

import { LoadingAction, profileAction } from '../redux/actions'
import { close } from '../../assets/images'


const ChooseAddress = (props) => {
    const { visibleSelectAddress, showAddressSelect, addressList, lang, userData, setAddressList, showLoader, hideLoader, setCartList, cartList, showAddNewAddress } = props
    const { visible, resId } = visibleSelectAddress
    const AnimatedValue = useRef(new Animated.Value(0)).current
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            showAddressSelect()
            return visible
        })
        return () => backHandler.remove()
    }, [visible])

    useEffect(() => {
        slideDown(visible ? 1 : 0)
    }, [visibleSelectAddress])

    const handleDefault = async (data) => {
        showLoader()
        const { api_token } = userData
        await Axios.put(API.editAddress, { ...data, default: 1, api_token }).then(async (res) => {
            if (has(res, "success") && res.success) {
                await getAddresses()
                showAddressSelect()
            } else {
                hideLoader()
            }
        }).catch((error) => {
            hideLoader()
        })
    }

    const getAddresses = async () => {
        const { api_token, id } = userData
        await Axios.get(API.addresses(), { params: { api_token, "search": `user_id:${id}` } })
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setAddressList(response.data)
                    await getCartList()
                } else {
                    hideLoader()
                }
            }).catch((error) => {
                hideLoader()
            })
    }

    const getCartList = async () => {
        const { api_token } = userData
        await Axios.get(API.carts(), { params: { api_token } })
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setCartList(response.data)
                }
                hideLoader()
            }).catch((error) => {
                hideLoader()
            })
    }

    const slideDown = (toValue) => {
        Animated.timing(AnimatedValue, {
            toValue,
            duration: 500,
            useNativeDriver: false
        }).start()
    }

    const top = AnimatedValue.interpolate({
        inputRange: [0, 0.1],
        outputRange: [HEIGHT, 0],
        extrapolate: "clamp"
    })

    const backgroundColor = AnimatedValue.interpolate({
        inputRange: [0.1, 0.5],
        outputRange: ["#00000000", "#00000040"],
        extrapolate: "clamp"
    })

    const height = AnimatedValue.interpolate({
        inputRange: [0.4, 1],
        outputRange: [0, HEIGHT * 0.7],
        extrapolate: "clamp"
    })

    return (<>
        <Animated.View style={{ position: "absolute", width: WIDTH, height: HEIGHT, backgroundColor, top }}>
            <Pressable onPress={() => showAddressSelect()} style={{ flex: 1 }}>
            </Pressable>
            <Animated.View style={{ backgroundColor: COLORS.white, height, borderTopLeftRadius: WIDTH * 0.05, borderTopRightRadius: WIDTH * 0.05, overflow: "hidden" }}>
                <View style={{ height: HEIGHT * 0.07, alignItems: "center", paddingHorizontal: WIDTH * 0.05, flexDirection: "row", justifyContent: "space-between", backgroundColor: `${COLORS.activeTabColor}15` }}>
                    <Text>Saved Addresses</Text>
                    <Pressable style={{}} onPress={() => showAddressSelect()}>
                        <Image style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, margin: WIDTH * 0.015, }} source={close} resizeMode="contain" />
                    </Pressable>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{}}
                        data={addressList || []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            let disabled = true
                            if (resId && item?.restaurants.find((i) => i == resId)) {
                                disabled = false
                            }
                            return (<Pressable disabled={disabled} onPress={() => handleDefault(item)} style={[{ height: HEIGHT * 0.1, paddingHorizontal: WIDTH * 0.05, borderTopWidth: index == 0 ? 0 : 0.5, justifyContent: "space-between", alignItems: "center", backgroundColor: !disabled ? COLORS.white : "#00000020" }, STYLES.flexDirection(lang)]}>
                                <View style={{ width: WIDTH * 0.6, justifyContent: "space-evenly", }}>
                                    <Text style={[STYLES.textAlign(lang), { color: COLORS.title3, fontWeight: "bold" }]}>{item.description}
                                        {disabled && <Text style={[{ color: COLORS.primary, fontSize: 12 }, STYLES.fontRegular()]}>  Not Deliverable to this address</Text>}
                                    </Text>
                                    <Text style={[STYLES.textAlign(lang), { color: `${COLORS.title3}70`, fontWeight: "bold" }]}>{item.address}</Text>
                                </View>
                                <View style={{ borderWidth: 0.5, width: WIDTH * 0.05, height: WIDTH * 0.05, borderRadius: WIDTH * 0.025, justifyContent: "center", alignItems: "center", borderColor: COLORS.statusbar }}>
                                    <View style={{ width: WIDTH * 0.04, height: WIDTH * 0.04, borderRadius: WIDTH * 0.02, backgroundColor: item?.is_default ? COLORS.statusbar : "transparent" }}>
                                    </View>
                                </View>
                            </Pressable>)
                        }}
                    />
                </View>
                <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.01, height: HEIGHT * 0.15, flexDirection: "row" }}>
                    <Pressable onPress={() => showAddressSelect()} style={{ height: HEIGHT * 0.06, backgroundColor: COLORS.addToCartButton, borderRadius: HEIGHT * 0.036, justifyContent: "center", alignItems: "center", flex: 1, marginRight: WIDTH * 0.02 }}>
                        <Text style={{ color: COLORS.white, fontWeight: "bold" }}>{`DONE`}</Text>
                    </Pressable>
                    <Pressable onPress={() => showAddNewAddress({ visible: true, resId })} style={{ height: HEIGHT * 0.06, backgroundColor: COLORS.addToCartButton, borderRadius: HEIGHT * 0.036, justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <Text style={{ color: COLORS.white, fontWeight: "bold" }}>{`+ ADD NEW ADDRESS`}</Text>
                    </Pressable>
                </View>
            </Animated.View>
        </Animated.View>
    </>)
}

ChooseAddress.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        cartList: ProfileReducer.cartList,
        addressList: ProfileReducer.addressList,
        visibleSelectAddress: ProfileReducer.visibleSelectAddress,
        userData: ProfileReducer.userData
    }
}

const mapDispatchToProps = {
    showAddressSelect: (value) => profileAction.showAddressSelect(value),
    showAddNewAddress: (value) => profileAction.showAddNewAddress(value),
    setAddressList: (address) => profileAction.setAddressList(address),
    showLoader: () => LoadingAction.showLoader(),
    hideLoader: () => LoadingAction.hideLoader(),
    setCartList: (cart) => profileAction.setCartList(cart),
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseAddress)
