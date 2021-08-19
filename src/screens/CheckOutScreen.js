import React, { useRef, useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, Animated, Pressable, Modal, FlatList, Switch } from 'react-native'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { isEmpty, has, isNull } from "lodash"

import { restaurant, payment, backarrow, dummy, money, visa, bank, close, thankyou, homeaddress } from '../../assets/images'
import { CustomTextInput, Header, RenderItem } from '../components'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { AlertAction, LoadingAction, profileAction } from '../redux/actions'

const list = [
    {
        name: "Cash On Delivery",
        image: money
    }/* ,
    {
        name: "**** **** **** 2187",
        image: visa
    },
    {
        name: "Netbanking",
        image: bank
    } */
]

const CheckOutScreen = (props, context) => {
    const { navigation, route, cartList, addressList, lang, userData, setCartList, showAddressSelect, pickupMode, hideLoader, showLoader } = props
    //const AnimatedValue = useRef(new Animated.Value(useRef)
    const [animation, setAnimation] = useState(false)
    const [paymentMode, setPaymentMode] = useState("Cash On Delivery")
    const [thankyouModal, setThankyouModal] = useState(false)
    const [addnewcardModal, setAddnewcardModal] = useState(false)
    const [deliveryFee, setDeliveryFee] = useState(0)
    const [coupon_code, setCouponCode] = useState("")
    const [couponStatus, setCouponStatus] = useState({})
    const dispatch = useDispatch()
    //const [selectedAddress, setSelectedAddress] = useState({})
    const AnimatedValue = useRef(new Animated.Value(0)).current


    useEffect(() => {
        /* if (!isEmpty(addressList)) {
            const list = addressList.find((item) => item.is_default)
            !isEmpty(list) && setSelectedAddress(list)
        } else {
        } */
        pickupMode == "delivery" && getDeliveryPrice()
    }, [])

    useEffect(() => {
        slideDown(animation ? 1 : 0)
    }, [animation])

    const createOrder = async () => {
        showLoader()
        try {
            const { api_token, id } = userData
            const { cartDetails } = cartList
            const foods = cartDetails.map(({ food_id, food, quantity }) => {
                return { price: food.discount_price, quantity, food_id }
            })
            const data = {
                api_token,
                user_id: id,
                order_status_id: 1,
                order_type: "2",
                payment: {
                    id: null,
                    status: null,
                    method: paymentMode
                },
                tax: couponStatus?.tax ? couponStatus?.tax : cartList.tax,
                foods,
                delivery_fee: deliveryFee,
                restaurant_id: cartList.cartDetails[0].restaurant_id,
                active: 1,
                delivery_note: route.params.deliveryNotes || ""
            }

            if (pickupMode != "pickup") {
                data.order_type = "1"
                data.delivery_address_id = addressList.find((add) => add?.is_default)?.id
            }

            if (!isEmpty(couponStatus)) {
                data.coupon_code = coupon_code
            }

            await Axios.post(API.createOrder, data).then(async (response) => {
                if (has(response, "success") && response.success) {
                    setCartList({})
                    setThankyouModal(true)
                }
                hideLoader()
            }).catch((error) => {
                hideLoader()
                dispatch(AlertAction.handleAlert({
                    visible: true,
                    title: "Error",
                    message: JSON.stringify(error?.message),
                    buttons: [{
                        title: "Okay",
                        onPress: () => {
                            dispatch(AlertAction.handleAlert({ visible: false, }))
                        }
                    }]
                }))
                console.log(JSON.stringify(error));
            })
        } catch (error) {
            hideLoader()
            console.log("createOrder ==>", error);
        }
    }

    const onClose = () => {
        setThankyouModal(false)
        navigation.popToTop()
        navigation.navigate("HomeScreen")
    }

    const getDeliveryPrice = async () => {
        showLoader()
        const { api_token } = userData
        await Axios.get(API.getDeliveryCharge(addressList.find((add) => add?.is_default)?.area_id, cartList.cartDetails[0].restaurant_id), { params: { api_token } })
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    const { delivery_charge, free_delivery_amount } = response.data
                    if (Number(free_delivery_amount) >= Number(cartList.totalBill)) {
                        setDeliveryFee(Number(delivery_charge))
                    }
                }
                hideLoader()
            }).catch((error) => { hideLoader() })
    }

    const applyCoupon = async () => {
        if (coupon_code != "") {
            showLoader()
            const { api_token } = userData
            const data = {
                api_token,
                item_total: cartList.cartTotal,
                coupon_code,
                restaurant_id: cartList.cartDetails[0].restaurant_id
            }

            if (pickupMode != "pickup") {
                data.area_id = addressList.find((add) => add?.is_default)?.area_id
            }

            await Axios.post(API.applyCoupon, data)
                .then(async (response) => {
                    if (has(response, "success") && response.success) {
                        setCouponStatus(response.data)
                        dispatch(AlertAction.handleAlert({
                            visible: true,
                            title: "Success",
                            message: "Coupon code applied successfully",
                            buttons: [{
                                title: "Okay",
                                onPress: () => {
                                    dispatch(AlertAction.handleAlert({ visible: false, }))
                                }
                            }]
                        }))
                    }
                    hideLoader()
                }).catch((error) => {
                    hideLoader()
                    dispatch(AlertAction.handleAlert({
                        visible: true,
                        title: "Error",
                        message: JSON.stringify(error?.message),
                        buttons: [{
                            title: "Okay",
                            onPress: () => {
                                dispatch(AlertAction.handleAlert({ visible: false, }))
                            }
                        }]
                    }))
                    console.log("error ==>", JSON.stringify(error));
                })
        } else {
            dispatch(AlertAction.handleAlert({
                visible: true,
                title: "Error",
                message: "Please enter a coupon code",
                buttons: [{
                    title: "Okay",
                    onPress: () => {
                        dispatch(AlertAction.handleAlert({ visible: false, }))
                    }
                }]
            }))
        }
    }

    const slideDown = (toValue) => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(AnimatedValue, {
            toValue,
            duration: 300, useNativeDriver: false
        }).start()
    }
    const height = AnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, ((HEIGHT * 0.075 * list.length) + HEIGHT * 0.03)]
    })
    const rotate = AnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["270 deg", "90 deg"]
    })

    return (<>
        <Header
            title="checkout"
            titleColor={COLORS.black}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <View style={{ height: HEIGHT * 0.05, marginHorizontal: WIDTH * 0.05, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 12 }}>Deliver Order</Text>
                    <Switch value={orderType} thumbColor={orderType ? COLORS.green2 : COLORS.addToCartButton} trackColor={{ false: COLORS.color4, true: COLORS.color1 }} onValueChange={(value) => setOrderType(value)} />
                    <Text style={{ fontSize: 12 }}>Pick Up Order</Text>
                </View> */}
                <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02, flexDirection: "row" }}>
                    <Image source={restaurant} resizeMode="contain" />
                    <View style={{ marginHorizontal: WIDTH * 0.05, }}>
                        <Text style={{ fontSize: 12, marginBottom: HEIGHT * 0.01 }}>Restaurant</Text>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{has(cartList, "cartDetails") && cartList?.cartDetails[0].restaurant?.name}</Text>
                        <Text style={{ fontSize: 10 }}>{has(cartList, "cartDetails") && cartList?.cartDetails[0].restaurant?.address}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: WIDTH * 0.05, flexDirection: "row", marginTop: HEIGHT * 0.02 }}>
                    <View style={{ flex: 1, height: HEIGHT * 0.03 }}>
                        <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                            PRODUCT</Text>
                    </View>
                    <View style={{ width: WIDTH * 0.3, alignItems: "center" }}>
                        <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                            QUANTITY</Text>
                    </View>
                    <View style={{ width: WIDTH * 0.2, alignItems: "flex-end" }}>
                        <Text style={{ color: COLORS.addToCartButton, fontSize: 10, fontWeight: "bold" }}>
                            PRICE</Text>
                    </View>
                </View>
                <FlatList
                    extraData={cartList?.cartDetails}
                    data={cartList?.cartDetails}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <View key={item?.food?.name} style={{ marginHorizontal: WIDTH * 0.05, flexDirection: "row", borderTopWidth: 0.5, height: HEIGHT * 0.05, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text>{item?.food?.name}</Text>
                        </View>
                        <View style={{ width: WIDTH * 0.3, flexDirection: "row", backgroundColor: COLORS.primary, height: HEIGHT * 0.03, borderRadius: HEIGHT * 0.02 }}>
                            {/*  <Pressable onPress={() => manageCart(quantity - 1)} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: COLORS.white, fontSize: 25 }}>-</Text>
                        </Pressable> */}
                            <View style={{ backgroundColor: COLORS.white, flex: 1, justifyContent: "center", alignItems: "center", }}>
                                <Text style={{ color: COLORS.black, fontSize: 14 }}>{item.quantity}</Text>
                            </View>
                            {/*  <Pressable onPress={() => manageCart(quantity + 1)} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: COLORS.white, fontSize: 15 }}>+</Text>
                        </Pressable> */}
                        </View>
                        <View style={{ width: WIDTH * 0.2, alignItems: "flex-end", justifyContent: "center" }}>
                            <Text style={{ color: COLORS.primary }}>{context.t("price", { price: item.quantity * item?.food?.price })}</Text>
                        </View>
                    </View>}
                />
                {/* <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02, }}>
                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                        <Image source={homeaddress} resizeMode="contain" />
                        <Text style={{ fontSize: 12, marginHorizontal: WIDTH * 0.01 }}>Delivery Address</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: HEIGHT * 0.01 }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold", width: WIDTH * 0.6 }}>{!isEmpty(addressList) && addressList.find((add) => add?.is_default)?.address}</Text>
                        <Pressable onPress={() => showAddressSelect(true)} style={{ width: WIDTH * 0.2, height: HEIGHT * 0.04, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: COLORS.green1 }}>Change</Text>
                        </Pressable>
                    </View>
                </View> */}
                <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02, }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                            <Image source={payment} resizeMode="contain" />
                            <Text style={{ fontSize: 12, marginHorizontal: WIDTH * 0.01 }}>Payment Method</Text>
                        </View>
                        <Pressable onPress={() => setAnimation(!animation)}>
                            <Animated.Image source={backarrow} resizeMode="contain" style={{ width: WIDTH * 0.05, height: HEIGHT * 0.05, transform: [{ rotate }], tintColor: COLORS.green2 }} />
                        </Pressable>
                    </View>
                    <Animated.View style={{ height, overflow: "hidden" }}>
                        <Pressable onPress={() => setAddnewcardModal(true)} style={{ height: HEIGHT * 0.03, alignSelf: "flex-end" }}>
                            <Text style={{ color: COLORS.green2 }}> + Add Card</Text>
                        </Pressable>
                        <FlatList
                            data={list}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => <Pressable onPress={() => setPaymentMode(item.name)} style={{ borderWidth: 0.5, height: HEIGHT * 0.05, marginVertical: HEIGHT * 0.01, alignItems: "center", flexDirection: "row", paddingHorizontal: WIDTH * 0.05, justifyContent: "space-between", borderRadius: HEIGHT * 0.01, borderColor: COLORS.titleColor, backgroundColor: `${COLORS.titleColor}20` }}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Image source={item.image} style={{ width: WIDTH * 0.1 }} resizeMode="contain" />
                                    <Text style={{ marginHorizontal: WIDTH * 0.05 }}>{item.name}</Text>
                                </View>
                                <View style={{ borderWidth: 0.5, width: WIDTH * 0.05, height: WIDTH * 0.05, borderRadius: WIDTH * 0.025, justifyContent: "center", alignItems: "center", borderColor: COLORS.statusbar }}>
                                    <View style={{ width: WIDTH * 0.04, height: WIDTH * 0.04, borderRadius: WIDTH * 0.02, backgroundColor: paymentMode == item.name ? COLORS.statusbar : "transparent" }}>
                                    </View>
                                </View>
                            </Pressable>}
                        />
                    </Animated.View>
                </View>
                <View style={{ marginHorizontal: WIDTH * 0.05, elevation: 3, backgroundColor: COLORS.white, borderRadius: HEIGHT * 0.038, marginBottom: HEIGHT * 0.12 }}>
                    <View style={{ height: HEIGHT * 0.06, elevation: 3, backgroundColor: COLORS.white, flexDirection: "row", borderRadius: HEIGHT * 0.035 }}>
                        <View style={{ flex: 1 }}>
                            <CustomTextInput
                                placeholder="Enter Coupon Code"
                                placeholderTextColor={COLORS.titleColor}
                                style={{ height: HEIGHT * 0.06, borderWidth: 0 }}
                                onChangeText={(text) => setCouponCode(text.trim())}
                                value={coupon_code}
                                textColor={COLORS.black}
                            />
                        </View>
                        {!isEmpty(couponStatus) && <Pressable onPress={() => [setCouponStatus({}), setCouponCode("")]} style={{ width: HEIGHT * 0.025, height: HEIGHT * 0.025, borderRadius: HEIGHT * 0.0125, justifyContent: "center", alignItems: "center", alignSelf: "center", backgroundColor: COLORS.textInputBorder }}>
                            <Text style={{ color: COLORS.white, fontSize: 14 }}>X</Text>
                        </Pressable>}
                        <Pressable disabled={!isEmpty(couponStatus)} onPress={() => applyCoupon()} style={{ width: WIDTH * 0.2, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", color: isEmpty(couponStatus) ? COLORS.green1 : COLORS.primary, fontSize: 14 }}>{isEmpty(couponStatus) ? "APPLY" : "APPLIED"}</Text>
                        </Pressable>
                    </View>
                    <View style={{ padding: HEIGHT * 0.015, flexDirection: "row", }}>
                        <View style={{ flex: 1 }}>
                            <Text>Item Total</Text>
                            <Text>Discount</Text>
                            <Text>{`Tax (${cartList?.taxPercentage}%)`}</Text>
                            {deliveryFee > 0 && <Text>Delivery Fee</Text>}
                        </View>
                        <View style={{ width: WIDTH * 0.2, alignItems: "flex-end" }}>
                            <Text>{context.t("price", { price: cartList.cartTotal })}</Text>
                            <Text>{context.t("price", { price: parseFloat(couponStatus?.cartDiscount ? couponStatus?.cartDiscount : cartList.cartDiscount) })}</Text>
                            <Text>{context.t("price", { price: parseFloat(couponStatus?.tax ? couponStatus?.tax : cartList.tax) })}</Text>
                            {deliveryFee > 0 && <Text>{context.t("price", { price: deliveryFee })}</Text>}
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: HEIGHT * 0.015, paddingVertical: HEIGHT * 0.01, borderTopWidth: 0.5 }}>
                        <Text>Total Bill</Text>
                        <Text>{context.t("price", { price: (parseFloat(couponStatus?.totalBill ? couponStatus?.totalBill : cartList.totalBill) + deliveryFee) })}</Text>
                    </View>
                    <Pressable onPress={() => createOrder()} style={{ height: HEIGHT * 0.07, backgroundColor: COLORS.primary, borderRadius: HEIGHT * 0.035, justifyContent: "center", alignItems: "center", bottom: -1 }}>
                        <Text style={{ color: COLORS.white, fontWeight: "bold" }}>CONFIRM ORDER</Text>
                    </Pressable>
                </View>
            </ScrollView>
            {/* ADD NEW CARD */}
            <Modal animationType="slide" visible={addnewcardModal}
                onRequestClose={() => setAddnewcardModal(false)}
                transparent
            >
                <View style={{ flex: 1, backgroundColor: "#00000030", }}>
                    <Pressable onPress={() => setAddnewcardModal(false)} style={{ flex: 1 }}>
                    </Pressable>
                    <View style={{ backgroundColor: COLORS.white, height: HEIGHT * 0.6, borderTopLeftRadius: WIDTH * 0.05, borderTopRightRadius: WIDTH * 0.05, overflow: "hidden" }}>
                        <View style={{ height: HEIGHT * 0.07, alignItems: "center", marginHorizontal: WIDTH * 0.05, flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 0.5 }}>
                            <Text>
                                Add Credit / Debit Card
                            </Text>
                            <Pressable style={{}} onPress={() => setAddnewcardModal(false)}>
                                <Image style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, margin: WIDTH * 0.015, }} source={close} resizeMode="contain" />
                            </Pressable>
                        </View>
                        <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                            <CustomTextInput
                                placeholder="Card Number"
                                placeholderTextColor={COLORS.placeHolderColor}
                                style={{ borderWidth: 0, backgroundColor: COLORS.backgroundColor, height: HEIGHT * 0.06, marginVertical: HEIGHT * 0.01 }}
                            />
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text>Expiry</Text>
                                <CustomTextInput
                                    placeholder="MM"
                                    placeholderTextColor={COLORS.placeHolderColor}
                                    style={{ borderWidth: 0, backgroundColor: COLORS.backgroundColor, height: HEIGHT * 0.06, marginVertical: HEIGHT * 0.01, width: WIDTH * 0.3 }}
                                />
                                <CustomTextInput
                                    placeholder="YY"
                                    placeholderTextColor={COLORS.placeHolderColor}
                                    style={{ borderWidth: 0, backgroundColor: COLORS.backgroundColor, height: HEIGHT * 0.06, marginVertical: HEIGHT * 0.01, width: WIDTH * 0.3 }}
                                />
                            </View>
                            <CustomTextInput
                                placeholder="CCV"
                                placeholderTextColor={COLORS.placeHolderColor}
                                style={{ borderWidth: 0, backgroundColor: COLORS.backgroundColor, height: HEIGHT * 0.06, marginVertical: HEIGHT * 0.01 }}
                            />
                            <CustomTextInput
                                placeholder="Name on Card"
                                placeholderTextColor={COLORS.placeHolderColor}
                                style={{ borderWidth: 0, backgroundColor: COLORS.backgroundColor, height: HEIGHT * 0.06, marginVertical: HEIGHT * 0.01 }}
                            />
                            <View style={{ marginVertical: HEIGHT * 0.03 }}>
                                <Text>
                                    Set as Default Card for all purchases
                                </Text>
                            </View>
                            <Pressable onPress={() => navigation.navigate("CheckOutScreen")} style={{ height: HEIGHT * 0.06, backgroundColor: COLORS.addToCartButton, borderRadius: HEIGHT * 0.036, justifyContent: "center", alignItems: "center", bottom: -1 }}>
                                <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                                    {`+ ADD CARD`}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* THANK YOU MODAL */}
            <Modal animationType="slide" visible={thankyouModal}
                onRequestClose={() => onClose()}
                transparent
            >
                <View style={{ flex: 1, backgroundColor: "#00000030", }}>
                    <Pressable onPress={() => onClose()} style={{ flex: 1 }}>
                    </Pressable>
                    <View style={{ backgroundColor: COLORS.white, height: HEIGHT * 0.6, borderTopLeftRadius: WIDTH * 0.05, borderTopRightRadius: WIDTH * 0.05, overflow: "hidden", alignItems: "center", justifyContent: "space-evenly" }}>
                        <Pressable style={{ alignSelf: "flex-end", margin: WIDTH * 0.015, }} onPress={() => onClose()}>
                            <Image style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, margin: WIDTH * 0.015, }} source={close} resizeMode="contain" />
                        </Pressable>
                        <Image style={{ width: WIDTH, height: HEIGHT * 0.25, }} source={thankyou} resizeMode="contain" />
                        <View style={{ height: HEIGHT * 0.15, justifyContent: "space-evenly", alignItems: "center", marginHorizontal: WIDTH * 0.05 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                                Thank You!
                            </Text>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                                your order has been successfully placed
                            </Text>
                            <Text style={{ textAlign: "center", fontSize: 10 }}>
                                Your Order is now being processed. We will let you know once the order is picked from the outlet.
                            </Text>
                        </View>
                        { }
                        <Pressable onPress={() => {
                            onClose()
                        }} style={{ height: HEIGHT * 0.06, backgroundColor: COLORS.primary, borderRadius: HEIGHT * 0.036, justifyContent: "center", alignItems: "center", width: WIDTH * 0.9 }}>
                            <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                                Back To Home
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </Header>
    </>
    )
}

CheckOutScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        cartList: ProfileReducer.cartList,
        userData: ProfileReducer.userData,
        addressList: ProfileReducer.addressList,
        pickupMode: ProfileReducer.pickupMode
    }
}
const mapDispatchToProps = {
    setCartList: (cart) => profileAction.setCartList(cart),
    showAddressSelect: (value) => profileAction.showAddressSelect(value),
    showAddNewAddress: (value) => profileAction.showAddNewAddress(value),
    hideLoader: () => LoadingAction.hideLoader(),
    showLoader: () => LoadingAction.showLoader()
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutScreen)
