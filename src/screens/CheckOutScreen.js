import React, { useRef, useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, Animated, Pressable, Modal, FlatList, Switch } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, has, isNull } from "lodash"

import { restaurant, payment, backarrow, dummy, money, visa, bank, close, thankyou, homeaddress } from '../../assets/images'
import { CustomTextInput, Header } from '../components'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { profileAction } from '../redux/actions'
import { Alert } from 'react-native'

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

const CheckOutScreen = (props) => {
    const { navigation, route, cartList, addressList, lang, userData, setCartList, showAddressSelect } = props
    //const AnimatedValue = useRef(new Animated.Value(useRef)
    const [animation, setAnimation] = useState(false)
    const [paymentMode, setPaymentMode] = useState("Cash On Delivery")
    const [thankyouModal, setThankyouModal] = useState(false)
    const [chooseAddressModal, setChooseAddressModal] = useState(false)
    const [addnewcardModal, setAddnewcardModal] = useState(false)
    const [orderType, setOrderType] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState({})
    const AnimatedValue = useRef(new Animated.Value(0)).current


    useEffect(() => {
        if (!isEmpty(addressList)) {
            const list = addressList.find((item) => item.is_default)
            !isEmpty(list) && setSelectedAddress(list)
        } else {
            Alert.alert("Waring", "Add an address to continue")
        }
    }, [])

    useEffect(() => {
        slideDown(animation ? 1 : 0)
    }, [animation])

    const createOrder = async () => {
        const { api_token, id } = userData
        const { cartDetails, deliveryFee } = cartList
        const foods = cartDetails.map(({ food_id, food, quantity }) => {
            return { price: food.discount_price, quantity, food_id }
        })
        const data = {
            api_token,
            user_id: id,
            order_status_id: 1,
            order_type: 1,
            payment: {
                id: null,
                status: null,
                method: paymentMode
            },
            foods,
            delivery_fee: deliveryFee,
            restaurant_id: cartList.cartDetails[0].restaurant_id,
            delivery_address_id: addressList.find((add) => add?.is_default)?.id,
            active: 1,
            delivery_note: route.params.deliveryNotes || ""
        }
        await Axios.post(API.createOrder, data)
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setCartList({})
                    setThankyouModal(true)
                }
            }).catch((error) => { })
    }

    const onClose = () => {
        setThankyouModal(false)
        navigation.popToTop()
        navigation.navigate("HomeScreen")
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
            <ScrollView>
                <View style={{ height: HEIGHT * 0.05, marginHorizontal: WIDTH * 0.05, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 12 }}>Deliver Order</Text>
                    <Switch value={orderType} thumbColor={orderType ? COLORS.green2 : COLORS.addToCartButton} trackColor={{ false: COLORS.color4, true: COLORS.color1 }} onValueChange={(value) => setOrderType(value)} />
                    <Text style={{ fontSize: 12 }}>Pick Up Order</Text>
                </View>
                <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02, flexDirection: "row" }}>
                    <Image source={restaurant} resizeMode="contain" />
                    <View style={{ marginHorizontal: WIDTH * 0.05, }}>
                        <Text style={{ fontSize: 12, marginBottom: HEIGHT * 0.01 }}>Restaurant</Text>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{has(cartList, "cartDetails") && cartList?.cartDetails[0].restaurant?.name}</Text>
                        <Text style={{ fontSize: 10 }}>{has(cartList, "cartDetails") && cartList?.cartDetails[0].restaurant?.address}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02, }}>
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
                </View>
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
                <View style={{ marginHorizontal: WIDTH * 0.05, elevation: 3, backgroundColor: COLORS.white, borderRadius: HEIGHT * 0.038, marginBottom: HEIGHT * 0.02 }}>
                    <View style={{ padding: HEIGHT * 0.015, flexDirection: "row", }}>
                        <View style={{ flex: 1 }}>
                            <Text>Item Total</Text>
                            <Text>Discount</Text>
                            <Text>Tax</Text>
                            <Text>Delivery Fee</Text>
                        </View>
                        <View style={{ width: WIDTH * 0.2, alignItems: "flex-end" }}>
                            <Text>{cartList.cartTotal} QAR</Text>
                            <Text>{cartList.cartDiscount} QAR</Text>
                            <Text>{(cartList.totalBill - cartList.cartTotal).toFixed(2)} QAR</Text>
                            <Text>{cartList.deliveryFee} QAR</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: HEIGHT * 0.015, paddingVertical: HEIGHT * 0.01, borderTopWidth: 0.5 }}>
                        <Text>Total Bill</Text>
                        <Text>{cartList.totalBill} QAR</Text>
                    </View>
                    <Pressable onPress={() => createOrder()} style={{ height: HEIGHT * 0.07, backgroundColor: COLORS.addToCartButton, borderRadius: HEIGHT * 0.035, justifyContent: "center", alignItems: "center", bottom: -1 }}>
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
                                <Text>
                                    Expiry
                            </Text>
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
                        }} style={{ height: HEIGHT * 0.06, backgroundColor: COLORS.addToCartButton, borderRadius: HEIGHT * 0.036, justifyContent: "center", alignItems: "center", width: WIDTH * 0.9 }}>
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
        addressList: ProfileReducer.addressList
    }
}
const mapDispatchToProps = {
    setCartList: (cart) => profileAction.setCartList(cart),
    showAddressSelect: (value) => profileAction.showAddressSelect(value),
    showAddNewAddress: (value) => profileAction.showAddNewAddress(value),
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutScreen)
