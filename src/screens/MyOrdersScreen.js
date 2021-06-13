import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, Image, Modal, Pressable, ImageBackground } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, has } from "lodash"

import { dummy, close, restaurant } from '../../assets/images'
import { Header } from '../components'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { ScrollView } from 'react-native'
import { LoadingAction } from '../redux/actions'

const RenderItem = (props) => {
    const { item, getOrders, userData, last, context } = props
    const [visible, setVisible] = useState(false)
    const [priceDetails, setPriceDetails] = useState({})

    useEffect(() => {
        let price = {
            itemTotal: 0,
            discount: 0,
            totalBill: 0
        }
        item.food_orders.map((data) => {
            price.itemTotal = price.itemTotal + (data.quantity * data.food.price)
            price.totalBill = price.totalBill + (data.quantity * data.food.discount_price)
            price.discount = price.itemTotal - price.totalBill
        })
        setPriceDetails(price)
    }, [])


    const cancelOrder = async () => {
        const { api_token } = userData
        await Axios.put(API.cancelOrder(item.id), { api_token })
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    getOrders()
                }
            }).catch((error) => { console.log(error); })
    }


    return (<>
        <Pressable style={{ marginBottom: last ? HEIGHT * 0.1 : 0 }} onPress={() => setVisible(true)}>
            <View style={{ height: HEIGHT * 0.13, flexDirection: "row", alignItems: "center" }}>
                <Image source={has(item, "food_orders[0].food.media[0].url") ? { uri: item.food_orders[0].food.media[0].url } : dummy} resizeMode="cover" style={{ width: WIDTH * 0.25, height: HEIGHT * 0.1, marginHorizontal: WIDTH * 0.03 }} />
                <View style={{ height: HEIGHT * 0.13, flex: 1, justifyContent: "space-evenly", padding: WIDTH * 0.03 }}>
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                        {`ORDER #${item.id}`}
                    </Text>
                    {item.food_orders.map((i, index) => <Text key={index.toString()} style={{ fontSize: 12, color: COLORS.textInputBorder }}>
                        {`${i.quantity} X ${i.food.name}`}
                    </Text>)}
                </View>
                <View style={{ height: HEIGHT * 0.13, justifyContent: "space-evenly", marginHorizontal: WIDTH * 0.03, alignItems: "flex-end" }}>
                    <Text style={{ fontSize: 10 }}>
                        {item.order_status.status}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                        {item.created_at}
                    </Text>
                </View>
            </View>
            <View style={{ borderBottomWidth: 0.5, borderColor: COLORS.borderColor2, marginHorizontal: WIDTH * 0.15 }} />
        </Pressable>
        <Modal animationType="slide" visible={visible}
            onRequestClose={() => setVisible(false)}
            transparent
        >
            <View style={{ flex: 1, backgroundColor: "#00000030", }}>
                <Pressable onPress={() => setVisible(false)} style={{ flex: 1 }}>
                </Pressable>
                <View style={{ backgroundColor: COLORS.white, height: HEIGHT * 0.6, borderTopLeftRadius: WIDTH * 0.05, borderTopRightRadius: WIDTH * 0.05, overflow: "hidden" }}>
                    <ImageBackground style={{ width: WIDTH, height: WIDTH * 0.4, alignItems: "flex-end", justifyContent: "space-between" }} source={has(item, "food_orders[0].food.media[0].url") ? { uri: item.food_orders[0].food.media[0].url } : dummy} resizeMode="cover">
                        <Pressable style={{ backgroundColor: COLORS.white, margin: WIDTH * 0.03, borderRadius: WIDTH * 0.035 }} onPress={() => setVisible(false)}>
                            <Image style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, margin: WIDTH * 0.015, }} source={close} resizeMode="contain" />
                        </Pressable>

                    </ImageBackground>
                    <Text style={[{ fontSize: 16, textAlign: "center", marginTop: HEIGHT * 0.02 }]}>
                        {`ORDER #${item.id}`}
                    </Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.03, flexDirection: "row" }}>
                            <Image source={restaurant} resizeMode="contain" />
                            <View style={{ marginHorizontal: WIDTH * 0.05, }}>
                                <Text style={{ fontSize: 12, marginBottom: HEIGHT * 0.01 }}>Restaurant</Text>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.restaurant?.name}</Text>
                                <Text style={{ fontSize: 10 }}>{item.restaurant?.address}</Text>
                            </View>
                        </View>
                        <View style={{ marginHorizontal: WIDTH * 0.05, flexDirection: "row" }}>
                            <View style={{ flex: 1, height: HEIGHT * 0.03 }}>
                                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                                    PRODUCT</Text>
                            </View>
                            <View style={{ width: WIDTH * 0.2, alignItems: "center", }}>
                                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                                    QUANTITY</Text>
                            </View>
                            <View style={{ width: WIDTH * 0.25, alignItems: "flex-end" }}>
                                <Text style={{ color: COLORS.addToCartButton, fontSize: 10, fontWeight: "bold" }}>
                                    PRICE</Text>
                            </View>
                        </View>
                        {item.food_orders.map((i, index) => <View style={{ marginHorizontal: WIDTH * 0.05, flexDirection: "row", borderBottomWidth: 0.5, paddingVertical: HEIGHT * 0.01, alignItems: "center" }}>
                            <View style={{ flex: 1, }}>
                                <Text>{i.food.name}</Text>
                            </View>
                            <View style={{ width: WIDTH * 0.2, alignItems: "center", }}>
                                <Text style={{}}>{i.quantity}</Text>
                            </View>
                            <View style={{ width: WIDTH * 0.25, alignItems: "flex-end" }}>
                                <Text style={{ color: COLORS.primary }}>{context.t("price", { price: i?.food?.price })}</Text>
                            </View>
                        </View>)}
                        <View style={{ marginHorizontal: WIDTH * 0.05, borderBottomWidth: 0.5, paddingVertical: HEIGHT * 0.015, flexDirection: "row", }}>
                            <View style={{ flex: 1 }}>
                                <Text>Item Total</Text>
                                <Text>Discount</Text>
                                <Text>Delivery Fee</Text>
                            </View>
                            <View style={{ width: WIDTH * 0.2, alignItems: "flex-end" }}>
                                <Text style={{ color: COLORS.primary }}>{context.t("price", { price: priceDetails.itemTotal })}</Text>
                                <Text style={{ color: COLORS.primary }}>{context.t("price", { price: priceDetails.discount })}</Text>
                                <Text style={{ color: COLORS.primary }}>{context.t("price", { price: item.delivery_fee })}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02 }}>
                            <Text style={{ fontWeight: "bold" }}>Total Bill</Text>
                            <Text style={{ fontWeight: "bold", color: COLORS.primary }}>{context.t("price", { price: priceDetails.totalBill + item.delivery_fee })}</Text>
                        </View>
                        {item.order_status_id == 1 && <Pressable onPress={() => cancelOrder()} style={{ marginHorizontal: WIDTH * 0.05, height: HEIGHT * 0.07, backgroundColor: COLORS.addToCartButton, marginBottom: HEIGHT * 0.01, borderRadius: HEIGHT * 0.035, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                                CANCEL ORDER
                            </Text>
                        </Pressable>}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    </>
    )
}
const MyOrdersScreen = (props, context) => {
    const { userData, navigation, hideLoader, showLoader } = props
    const [orderList, setOrderList] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getOrders()
        });
        return unsubscribe;
    }, [])

    const getOrders = async () => {
        showLoader()
        const { api_token } = userData
        await Axios.get(API.myorders, { params: { api_token } })
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setOrderList(response.data)
                    hideLoader()
                }
                hideLoader()
            }).catch((error) => {
                hideLoader()
            })
    }
    return (
        <Header
            title="my_orders"
            titleColor={COLORS.black}
        >
            <FlatList
                data={orderList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <RenderItem context={context} last={index == orderList.length - 1} item={item} userData={userData} getOrders={() => getOrders()} />}
            />

        </Header>
    )
}

MyOrdersScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        userData: ProfileReducer.userData,
    }
}
const mapDispatchToProps = {
    hideLoader: () => LoadingAction.hideLoader(),
    showLoader: () => LoadingAction.showLoader()
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrdersScreen)
