import React, { useRef, useEffect, useState } from 'react'
import { ImageBackground, Image, View, Text, Pressable, FlatList, ScrollView, Modal, Linking, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, has } from "lodash"

import { dummy, close, heart, logo } from '../../assets/images'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { LoadingAction, profileAction } from '../redux/actions'

const RenderItem = (props, context) => {
    const { item, lang, restaurant_id, setCartList, userData, cartList, vertLast, cart, bestOffer, hideLoader, showLoader, setshowAddAddress = () => { }, setshowPickupModal = () => { }, pickupMode, addressList } = props
    const [visible, setVisible] = useState(false)
    const [quantity, setQuantity] = useState(null)

    useEffect(() => {
        if (has(cartList, "cartDetails") && !isEmpty(cartList.cartDetails)) {
            const list = cartList.cartDetails.find((i) => i.food_id == item.food_id && i.restaurant_id == restaurant_id)
            list ? setQuantity(list?.quantity) : setQuantity(null)
        } else {
            setQuantity(null)
        }
    }, [])

    useEffect(() => {
        if (has(cartList, "cartDetails") && !isEmpty(cartList.cartDetails)) {
            const list = cartList.cartDetails.find((i) => i.food_id == item.food_id && i.restaurant_id == restaurant_id)
            list ? setQuantity(list?.quantity) : setQuantity(null)
        } else {
            setQuantity(null)
        }
    }, [cartList])


    const deleteCart = async () => {
        showLoader()
        const list = cartList.cartDetails.find((i) => i.food_id == item.food_id && i.restaurant_id == restaurant_id)
        list && await Axios.delete(API.carts(list.id))
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    await getCartList()
                }
                hideLoader()
            }).catch((error) => {
                console.log(error)
                hideLoader()
            })
    }

    const addToCart = async (qty) => {
        const data = { user_id: userData.id.toString(), food_id: item.food_id, quantity: qty, restaurant_id }
        let list = {}
        if (has(cartList, "cartDetails") && !isEmpty(cartList.cartDetails)) {
            list = cartList.cartDetails.find((i) => i.food_id == item.food_id && i.restaurant_id == restaurant_id)
        }
        if (!isEmpty(list)) {
            const { id } = list
            await Axios.put(API.carts(), { id, quantity: qty })
                .then(async (response) => {
                    if (has(response, "success") && response.success) {
                        await getCartList()
                    }
                }).catch((error) => {
                    console.log(error)
                    hideLoader()
                })
        } else {
            await Axios.post(API.carts(), data)
                .then(async (response) => {
                    if (has(response, "success") && response.success) {
                        await getCartList()
                    }
                }).catch((error) => {
                    console.log(error)
                    hideLoader()
                })

        }
    }

    const validateRes = () => {
        if (has(cartList, "cartDetails") && !isEmpty(cartList.cartDetails) && cartList.cartDetails[0]?.restaurant_id != restaurant_id) {
            Alert.alert("Error", "Please choose food from same restaurant or clear cart and try again")
            return false
        }
        showLoader()
        return true
    }

    const manageCart = (qty = 0) => {
        if (pickupMode == null) {
            setshowPickupModal(true)
        } else {
            if (isEmpty(addressList) && pickupMode != "pickup") {
                setshowAddAddress(true)
            } else {
                if (validateRes()) {
                    if (qty == 0) {
                        deleteCart()
                    } else if (qty > 0) {
                        addToCart(qty)
                    }
                }
            }
        }
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

    return (<>
        {cart ? <View key={item?.food?.name} style={{ marginHorizontal: WIDTH * 0.05, flexDirection: "row", borderTopWidth: 0.5, height: HEIGHT * 0.05, justifyContent: "center", alignItems: "center" }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text>{item?.food?.name}</Text>
            </View>
            <View style={{ width: WIDTH * 0.3, flexDirection: "row", backgroundColor: COLORS.statusbar, height: HEIGHT * 0.03, borderRadius: HEIGHT * 0.02 }}>
                <Pressable onPress={() => manageCart(quantity - 1)} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: COLORS.white, fontSize: 25 }}>-</Text>
                </Pressable>
                <View style={{ backgroundColor: COLORS.white, flex: 1, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: COLORS.textInputBorder }}>
                    <Text style={{ color: COLORS.black, fontSize: 14 }}>{quantity}</Text>
                </View>
                <Pressable onPress={() => manageCart(quantity + 1)} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: COLORS.white, fontSize: 15 }}>+</Text>
                </Pressable>
            </View>
            <View style={{ width: WIDTH * 0.2, alignItems: "flex-end", justifyContent: "center" }}>
                <Text>{context.t("price", { price: item?.food?.price })}</Text>
            </View>
        </View> : bestOffer ? <Pressable onPress={() => setVisible(true)} style={{ height: WIDTH * 0.4, width: WIDTH * 0.6, marginLeft: lang == "en" ? WIDTH * 0.07 : vertLast ? WIDTH * 0.07 : 0, marginRight: lang == "ar" ? WIDTH * 0.07 : vertLast ? WIDTH * 0.07 : 0, borderRadius: WIDTH * 0.07, backgroundColor: COLORS.white, elevation: 3, marginBottom: HEIGHT * 0.02, marginTop: WIDTH * 0.03 }}>
            <Image style={{ height: WIDTH * 0.25, width: WIDTH * 0.6, marginTop: WIDTH * 0.01, borderTopRightRadius: WIDTH * 0.05, borderTopLeftRadius: WIDTH * 0.05 }} source={item?.media && item?.media.length > 0 ? { uri: item?.media[0]?.url } : logo} defaultSource={logo} resizeMode="cover" />
            <View style={{ flex: 1, marginHorizontal: WIDTH * 0.05, justifyContent: "center" }}>
                <Text style={[STYLES.textAlign(lang)]}>{item?.name}</Text>
            </View>
            <View style={[{ backgroundColor: COLORS.green, width: WIDTH * 0.1, height: WIDTH * 0.1, borderRadius: WIDTH * 0.05, position: "absolute", top: -WIDTH * 0.03, justifyContent: "center", alignItems: "center" }, lang == "ar" ? { right: -WIDTH * 0.02, } : { left: -WIDTH * 0.02, }]}>
                <Text>50 %</Text>
            </View>
        </Pressable> : <View style={{ marginLeft: lang == "en" ? WIDTH * 0.07 : vertLast ? WIDTH * 0.07 : 0, marginRight: lang == "ar" ? WIDTH * 0.07 : vertLast ? WIDTH * 0.07 : 0, marginBottom: WIDTH * 0.025, }}>
            <Pressable
                onPress={() => setVisible(true)}
                style={{ height: WIDTH * 0.4, width: WIDTH * 0.4, marginVertical: WIDTH * 0.025, borderRadius: WIDTH * 0.07, backgroundColor: COLORS.white, elevation: 3, alignItems: "center", }}>
                <Image key={item?.media[0]?.url} style={{ width: WIDTH * 0.27, height: WIDTH * 0.23, marginTop: WIDTH * 0.01, }}
                    source={item?.media && item?.media.length > 0 ? { uri: item?.media[0]?.url } : logo} defaultSource={logo} resizeMode="contain" />
                <Text style={[{ textAlign: "center", fontSize: 12 }, STYLES.fontRegular()]}>{item?.name}</Text>
                <Text style={[{}, STYLES.fontBold()]}>{item?.discount_price}</Text>
            </Pressable>
            <View style={{ width: WIDTH * 0.25, height: WIDTH * 0.07, borderRadius: WIDTH * 0.035, backgroundColor: COLORS.statusbar, position: "absolute", bottom: 0, elevation: 4, alignSelf: "center" }}>
                {quantity > 0 ? <View style={{ flex: 1, flexDirection: "row" }}>
                    <Pressable onPress={() => manageCart(quantity - 1)} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: COLORS.white, fontSize: 25 }}>-</Text>
                    </Pressable>
                    <View style={{ backgroundColor: COLORS.white, flex: 1, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: COLORS.textInputBorder }}>
                        <Text style={[{ color: COLORS.black, fontSize: 14 }, STYLES.fontMedium()]}>{quantity}</Text>
                    </View>
                    <Pressable onPress={() => manageCart(quantity + 1)} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: COLORS.white, fontSize: 15 }}>+</Text>
                    </Pressable>
                </View> : <Pressable onPress={() => manageCart(1)} style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                    <Text style={[{ color: COLORS.white, fontSize: 11, }, STYLES.fontRegular()]}>Add to order</Text>
                </Pressable>
                }
            </View>
        </View>}
        <Modal animationType="slide" visible={visible} onRequestClose={() => setVisible(false)} transparent>
            <View style={{ flex: 1, backgroundColor: "#00000030", }}>
                <Pressable onPress={() => setVisible(false)} style={{ flex: 1 }}>
                </Pressable>
                <View style={{ backgroundColor: COLORS.white, height: HEIGHT * 0.5, borderTopLeftRadius: WIDTH * 0.05, borderTopRightRadius: WIDTH * 0.05, overflow: "hidden" }}>
                    <ImageBackground style={{ width: WIDTH, height: WIDTH * 0.4, alignItems: "flex-end", justifyContent: "space-between" }} source={item?.media && item?.media.length > 0 ? { uri: item?.media[0]?.url } : dummy} resizeMode="cover">
                        <Pressable style={{ backgroundColor: COLORS.white, margin: WIDTH * 0.03, borderRadius: WIDTH * 0.035 }} onPress={() => setVisible(false)}>
                            <Image style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, margin: WIDTH * 0.015, }} source={close} resizeMode="contain" />
                        </Pressable>
                        <View style={{ backgroundColor: COLORS.white, width: WIDTH * 0.15, height: WIDTH * 0.1, justifyContent: "center", alignItems: "center", borderRadius: WIDTH * 0.07, marginBottom: -WIDTH * 0.05, marginHorizontal: WIDTH * 0.05 }}>
                            <Image style={{ width: WIDTH * 0.05, height: WIDTH * 0.05, }} source={heart} resizeMode="contain" />
                        </View>
                    </ImageBackground>
                    <View style={{ flex: 1, paddingTop: HEIGHT * 0.03 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: WIDTH * 0.05 }}>
                            <Text style={{ color: COLORS.titleColor }}>{item?.name}</Text>
                            <Text style={{ color: COLORS.addToCartButton }}>{item?.discount_price}</Text>
                        </View>
                        <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                            <Text style={{ color: COLORS.title1, fontSize: 10 }}>80 Rating</Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: WIDTH * 0.05, justifyContent: "space-evenly" }}>
                            <Text style={{ color: COLORS.title1, fontWeight: "bold" }}>{`About ${item?.name}`}</Text>
                            <Text style={{ color: COLORS.titleColor }}>{item?.description}</Text>
                            <Text style={{ color: COLORS.titleColor }}>{item?.ingredients}</Text>
                        </View>
                        <Pressable onPress={() => manageCart(quantity + 1)} style={{ marginHorizontal: WIDTH * 0.05, height: HEIGHT * 0.07, backgroundColor: COLORS.addToCartButton, marginBottom: HEIGHT * 0.01, borderRadius: HEIGHT * 0.035, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: COLORS.white, fontWeight: "bold" }}> Add To Order</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    </>)
}

RenderItem.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        userData: ProfileReducer.userData,
        cartList: ProfileReducer.cartList,
        pickupMode: ProfileReducer.pickupMode,
        addressList: ProfileReducer.addressList,
    }
}
const mapDispatchToProps = {
    setCartList: (cart) => profileAction.setCartList(cart),
    hideLoader: () => LoadingAction.hideLoader(),
    showLoader: () => LoadingAction.showLoader()
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderItem)