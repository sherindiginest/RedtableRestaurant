import React, { useRef, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { View, Text, ScrollView, Image, Animated, Pressable, Modal } from 'react-native'

import { restaurant, payment, backarrow, dummy, money, visa, bank, close, thankyou } from '../../assets/images'
import { CustomTextInput, Header } from '../components'
import { COLORS, HEIGHT, WIDTH } from '../constants'

const list = [
    {
        name: "Cash on delivery",
        image: money
    },
    {
        name: "**** **** **** 2187",
        image: visa
    },
    {
        name: "Netbanking",
        image: bank
    }
]

const CheckOutScreen = (props) => {
    const { navigation } = props
    //const AnimatedValue = useRef(new Animated.Value(useRef)
    const [animation, setAnimation] = useState(false)
    const [paymentMode, setPaymentMode] = useState("")
    const [thankyouModal, setThankyouModal] = useState(false)
    const [addnewcardModal, setAddnewcardModal] = useState(false)
    const AnimatedValue = useRef(new Animated.Value(0)).current

    const slideDown = (toValue) => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(AnimatedValue, {
            toValue,
            duration: 300, useNativeDriver: false
        }).start()
    }

    useEffect(() => {
        slideDown(animation ? 1 : 0)
    }, [animation])

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
            title="Checkout"
            titleColor={COLORS.black}
        >
            <ScrollView>
                <View style={{ height: HEIGHT * 0.05, marginHorizontal: WIDTH * 0.05, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 12 }}>Deliver Order</Text>
                    <Text style={{ fontSize: 12 }}>Pick Up Order</Text>
                </View>
                <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02, flexDirection: "row" }}>
                    <Image source={restaurant} resizeMode="contain" />
                    <View style={{ marginHorizontal: WIDTH * 0.05, }}>
                        <Text style={{ fontSize: 12, marginBottom: HEIGHT * 0.01 }}>Restaurant</Text>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>RedTable - Dammam</Text>
                        <Text style={{ fontSize: 10 }}>8931 Prince Mohammed Bin Fahad Road,
Abdullah Fouad, Dammam</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02, }}>
                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                        <Image source={restaurant} resizeMode="contain" />
                        <Text style={{ fontSize: 12, marginHorizontal: WIDTH * 0.01 }}>Delivery Address</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: HEIGHT * 0.01 }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold", width: WIDTH * 0.6 }}>8931 Prince Mohammed Bin Fahad Road,
Abdullah Fouad, Dammam</Text>
                        <Pressable style={{ width: WIDTH * 0.2, height: HEIGHT * 0.04, alignItems: "center", justifyContent: "center" }}>
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
                            <Text style={{ color: COLORS.green2 }}>
                                + Add Card
                        </Text>
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
                            <Text>Delivery Fee</Text>
                        </View>
                        <View style={{ width: WIDTH * 0.2, alignItems: "flex-end" }}>
                            <Text>50 QAR</Text>
                            <Text>50 QAR</Text>
                            <Text>50 QAR</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: HEIGHT * 0.015, paddingVertical: HEIGHT * 0.01, borderTopWidth: 0.5 }}>
                        <Text>
                            Total Bill
                        </Text>
                        <Text>
                            45SR
                        </Text>
                    </View>
                    <Pressable onPress={() => setThankyouModal(true)} style={{ height: HEIGHT * 0.07, backgroundColor: COLORS.addToCartButton, borderRadius: HEIGHT * 0.035, justifyContent: "center", alignItems: "center", bottom: -1 }}>
                        <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                            CONFIRM ORDER
                        </Text>
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

            <Modal animationType="slide" visible={thankyouModal}
                onRequestClose={() => setThankyouModal(false)}
                transparent
            >
                <View style={{ flex: 1, backgroundColor: "#00000030", }}>
                    <Pressable onPress={() => setThankyouModal(false)} style={{ flex: 1 }}>
                    </Pressable>
                    <View style={{ backgroundColor: COLORS.white, height: HEIGHT * 0.6, borderTopLeftRadius: WIDTH * 0.05, borderTopRightRadius: WIDTH * 0.05, overflow: "hidden", alignItems: "center", justifyContent: "space-evenly" }}>
                        <Pressable style={{ alignSelf: "flex-end", margin: WIDTH * 0.015, }} onPress={() => setThankyouModal(false)}>
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
                            setThankyouModal(false)
                            navigation.navigate("HomeScreen")
                            navigation.popToTop()
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

export default CheckOutScreen
