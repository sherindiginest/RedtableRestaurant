import React, { useState } from 'react'
import { View, Text, ScrollView, Image, Pressable, FlatList, Switch, Alert } from 'react-native'
import { close, restaurant, notes, homeaddress, emptyCart } from '../../assets/images'
import { AddAddressModal, ChooseAddress, CustomTextInput, Header, RenderItem } from '../components'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, has, isNull } from "lodash"
import { LoadingAction, profileAction } from '../redux/actions'

const CartScreen = (props, context) => {
    const { navigation, cartList, addressList, showAddressSelect, showAddNewAddress, visibleAddnewAddress, pickupMode, setPickupMode, setCartList, userData, showLoader, hideLoader } = props
    const [deliveryNotes, setdeliveryNotes] = useState("")

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

    const clearCart = async () => {
        showLoader()
        const { id } = userData
        await Axios.post(API.clearCart, { user_id: id })
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    await getCartList()
                }
            }).catch((error) => {
                console.log(error)
                hideLoader()
            })
    }

    return (<><Header
        title="cart"
        titleColor={COLORS.black}
        cartButton={!isEmpty(cartList)}
        cartAction={() => {
            Alert.alert("Warning", "Are you sure?", [{ text: "Clear", onPress: () => clearCart() }, { text: "Cancel", style: "cancel" }])
        }}
    >
        {has(cartList, "cartDetails") && !isEmpty(cartList.cartDetails) ? <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02, flexDirection: "row" }}>
                <Image source={restaurant} resizeMode="contain" />
                <View style={{ marginHorizontal: WIDTH * 0.05, }}>
                    <Text style={{ fontSize: 12, marginBottom: HEIGHT * 0.01 }}>Restaurant</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{cartList?.cartDetails[0].restaurant?.name}</Text>
                    <Text style={{ fontSize: 10 }}>{cartList?.cartDetails[0].restaurant?.address}</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: WIDTH * 0.05, flexDirection: "row" }}>
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
                renderItem={({ item, index }) => <RenderItem cart item={item} restaurant_id={cartList?.cartDetails[0].restaurant_id} />}
            />
            <CustomTextInput
                image={notes}
                placeholder="Delivery Notes..."
                textColor={COLORS.black}
                placeholderTextColor={COLORS.titleColor}
                onChangeText={(text) => setdeliveryNotes(text)}
                style={{ borderRadius: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.05, borderWidth: 0.5, height: HEIGHT * 0.06, marginVertical: HEIGHT * 0.03 }} />
            <View style={{ height: HEIGHT * 0.05, marginHorizontal: WIDTH * 0.05, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: HEIGHT * 0.03 }}>
                <Text style={{ fontSize: 12 }}>Deliver Order</Text>
                <Switch value={pickupMode == "pickup"} thumbColor={pickupMode == "pickup" ? COLORS.green2 : COLORS.addToCartButton} trackColor={{ false: COLORS.color4, true: COLORS.color1 }}
                    onValueChange={(value) => setPickupMode(value ? "pickup" : "delivery")} />
                <Text style={{ fontSize: 12 }}>Pick Up Order</Text>
            </View>
            {pickupMode != "pickup" && <>
                <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.01, flexDirection: "row", alignItems: "center", }}>
                    <Image source={homeaddress} resizeMode="contain" />
                    <Text style={{ fontSize: 12, marginHorizontal: WIDTH * 0.03 }}>Delivery Address</Text>
                </View>
                <Text style={[{ fontSize: 15, marginHorizontal: WIDTH * 0.13 }, STYLES.fontMedium()]}>{!isEmpty(addressList) && addressList.find((add) => add?.is_default)?.address}</Text>
                <Pressable onPress={() => showAddressSelect(true)} style={{ height: HEIGHT * 0.04, justifyContent: "center", marginHorizontal: WIDTH * 0.125, marginBottom: HEIGHT * 0.02 }}>
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: COLORS.green1 }}>Choose/Add Address</Text>
                </Pressable>
            </>}
            <View style={{ marginHorizontal: WIDTH * 0.05, elevation: 3, backgroundColor: COLORS.white, borderRadius: HEIGHT * 0.038, marginBottom: HEIGHT * 0.1 }}>
                <View style={{ height: HEIGHT * 0.06, elevation: 3, backgroundColor: COLORS.white, flexDirection: "row", borderRadius: HEIGHT * 0.035 }}>
                    <View style={{ flex: 1 }}>
                        <CustomTextInput
                            placeholder="Enter Coupon Code"
                            placeholderTextColor={COLORS.titleColor}
                            style={{ height: HEIGHT * 0.06, borderWidth: 0 }} />
                    </View>
                    <Pressable style={{ width: WIDTH * 0.2, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", color: COLORS.green1, fontSize: 14 }}>APPLY</Text>
                    </Pressable>
                </View>
                <View style={{ padding: HEIGHT * 0.015, flexDirection: "row", }}>
                    <View style={{ flex: 1 }}>
                        <Text>Item Total</Text>
                        <Text>Discount</Text>
                        <Text>Tax</Text>
                        {pickupMode != "pickup" && <Text>Delivery Fee</Text>}
                    </View>
                    <View style={{ width: WIDTH * 0.2, alignItems: "flex-end" }}>
                        <Text>{context.t("price", { price: cartList.cartTotal })}</Text>
                        <Text>{context.t("price", { price: cartList.cartDiscount })}</Text>
                        <Text>{context.t("price", { price: cartList.tax })}</Text>
                        {pickupMode != "pickup" && <Text>{context.t("price", { price: cartList.deliveryFee })}</Text>}
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: HEIGHT * 0.015, paddingVertical: HEIGHT * 0.01, borderTopWidth: 0.5 }}>
                    <Text>Total Bill</Text>
                    <Text>{context.t("price", { price: pickupMode != "pickup" ? (cartList.totalBill + cartList.deliveryFee) : cartList.totalBill })}</Text>
                </View>
                <Pressable onPress={() => navigation.navigate("CheckOutScreen", { deliveryNotes })} style={{ height: HEIGHT * 0.07, backgroundColor: COLORS.primary, borderRadius: HEIGHT * 0.035, justifyContent: "center", alignItems: "center", bottom: -1 }}>
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                        CHECKOUT
                    </Text>
                </Pressable>
            </View>
        </ScrollView> : <View style={{ flex: 1, }}>
            <View style={{ justifyContent: "space-evenly", alignItems: "center", height: HEIGHT * 0.4 }}>
                <Image source={emptyCart} style={{ width: WIDTH * 0.5 }} resizeMode="contain" />
                <Text style={[{ color: COLORS.textInputBorder, fontSize: 20 }, STYLES.fontRegular()]}>Your Cart Is Empty !</Text>
            </View>
        </View>}
    </Header>
        <AddAddressModal visible={visibleAddnewAddress} onClose={() => { showAddNewAddress() }} addressData={{}} restaurantSpecific />
    </>)
}

CartScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        cartList: ProfileReducer.cartList,
        addressList: ProfileReducer.addressList,
        visibleAddnewAddress: ProfileReducer.visibleAddnewAddress,
        pickupMode: ProfileReducer.pickupMode,
        userData: ProfileReducer.userData,
    }
}

const mapDispatchToProps = {
    showAddressSelect: (value) => profileAction.showAddressSelect(value),
    showAddNewAddress: (value) => profileAction.showAddNewAddress(value),
    setPickupMode: (value) => profileAction.setPickupMode(value),
    setCartList: (cart) => profileAction.setCartList(cart),
    hideLoader: () => LoadingAction.hideLoader(),
    showLoader: () => LoadingAction.showLoader()
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)