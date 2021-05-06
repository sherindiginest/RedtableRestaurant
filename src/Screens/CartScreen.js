import React from 'react'
import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { close, restaurant, notes } from '../../assets/images'
import { CustomTextInput, Header } from '../components'
import { COLORS, HEIGHT, WIDTH } from '../constants'

const CartScreen = (props) => {
    const { navigation } = props
    return (<Header
        title="Cart"
        titleColor={COLORS.black}
    >
        <ScrollView>
            <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
                ORDER #105
            </Text>
            <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02, flexDirection: "row" }}>
                <Image source={restaurant} resizeMode="contain" />
                <View style={{ marginHorizontal: WIDTH * 0.05, }}>
                    <Text style={{ fontSize: 12, marginBottom: HEIGHT * 0.01 }}>Restaurant</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>RedTable - Dammam</Text>
                    <Text style={{ fontSize: 10 }}>8931 Prince Mohammed Bin Fahad Road,
Abdullah Fouad, Dammam</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: WIDTH * 0.05, flexDirection: "row" }}>
                <View style={{ flex: 1, height: HEIGHT * 0.03 }}>
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                        PRODUCT</Text>
                </View>
                <View style={{ width: WIDTH * 0.2 }}>
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                        QUANTITY</Text>
                </View>
                <View style={{ width: WIDTH * 0.2, alignItems: "flex-end" }}>
                    <Text style={{ color: COLORS.addToCartButton, fontSize: 10, fontWeight: "bold" }}>
                        PRICE</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: WIDTH * 0.05, flexDirection: "row", borderTopWidth: 0.5, paddingTop: HEIGHT * 0.015 }}>
                <View style={{ flex: 1, height: HEIGHT * 0.03 }}>
                    <Text>
                        Sambal Shrimp</Text>
                </View>
                <View style={{ width: WIDTH * 0.2, alignItems: "center" }}>
                    <Text style={{}}>
                        1</Text>
                </View>
                <View style={{ width: WIDTH * 0.2, alignItems: "flex-end" }}>
                    <Text>
                        50 QAR</Text>
                </View>
            </View>
            <CustomTextInput
                image={notes}
                placeholder="Delivery Notes..."
                placeholderTextColor={COLORS.titleColor}
                style={{ borderRadius: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.05, borderWidth: 0.5, height: HEIGHT * 0.06, marginVertical: HEIGHT * 0.03 }} />

            <View style={{ marginHorizontal: WIDTH * 0.05, elevation: 3, backgroundColor: COLORS.white, borderRadius: HEIGHT * 0.038, marginBottom: HEIGHT * 0.02 }}>
                <View
                    style={{ height: HEIGHT * 0.06, elevation: 3, backgroundColor: COLORS.white, flexDirection: "row", borderRadius: HEIGHT * 0.035 }}
                >
                    <CustomTextInput
                        placeholder="Enter Coupon Code"
                        placeholderTextColor={COLORS.titleColor}
                        style={{ height: HEIGHT * 0.06, flex: 1, borderWidth: 0 }} />
                    <Pressable style={{ width: WIDTH * 0.2, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", color: COLORS.green1, fontSize: 14 }}>APPLY</Text>
                    </Pressable>
                </View>
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
                <Pressable onPress={() => navigation.navigate("CheckOutScreen")} style={{ height: HEIGHT * 0.07, backgroundColor: COLORS.addToCartButton, borderRadius: HEIGHT * 0.035, justifyContent: "center", alignItems: "center", bottom: -1 }}>
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                        CHECKOUT
                        </Text>
                </Pressable>
            </View>
        </ScrollView>

    </Header>)
}

export default CartScreen
