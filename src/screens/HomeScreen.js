import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, ScrollView, ImageBackground, Pressable } from 'react-native'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { isEmpty, has } from "lodash"
import LinearGradient from 'react-native-linear-gradient';

import { dummy, search, filter } from '../../assets/images'
import { API, Axios, colorArray, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { Header, RestaurantComponent, CustomTextInput, RenderMealItem } from "./../components"
import { AlertAction, LoadingAction, profileAction } from '../redux/actions'

const HomeScreen = (props, context) => {
    const { lang, navigation, pickupMode, askForPickupMode } = props
    const [homeList, sethomeList] = useState({})
    const [categoryList, setcategoryList] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (askForPickupMode) {
            dispatch(AlertAction.handleAlert({
                visible: true,
                title: "Order Type",
                message: "Please choose one method to continue",
                buttons: [{
                    title: "Delivery",
                    onPress: () => {
                        dispatch(profileAction.setPickupMode("delivery"))
                        dispatch(AlertAction.handleAlert({ visible: false, }))
                        dispatch(profileAction.askPickupMode(false))
                    }
                }, {
                    title: "Pickup",
                    onPress: () => {
                        dispatch(profileAction.setPickupMode("pickup"))
                        dispatch(AlertAction.handleAlert({ visible: false, }))
                        dispatch(profileAction.askPickupMode(false))
                    }
                }]
            }))
        }
        getData()
    }, [])

    const getData = async () => {
        dispatch(LoadingAction.showLoader())
        await Axios.get(API.home)
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    sethomeList(response.data)
                }
                // setloading(false)
            }).catch((error) => {
                dispatch(LoadingAction.hideLoader())
            })
        await Axios.get(API.categories)
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setcategoryList(response.data)
                }
                dispatch(LoadingAction.hideLoader())
                // setloading(false)
            }).catch((error) => {
                dispatch(LoadingAction.hideLoader())
            })
    }

    return (<Header backgroundColor={"#FFFFFF70"}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ height: HEIGHT * 0.235, marginTop: HEIGHT * 0.02, }}>
                <FlatList
                    horizontal
                    inverted={lang == "ar"}
                    data={homeList?.slides || []}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <RestaurantComponent slider item={item} lastelement={index == homeList?.slides.length - 1} />}
                />
            </View>
            <View style={{ backgroundColor: `${COLORS.statusbar}80`, flex: 1 }}>
                {/* <View style={[{ height: HEIGHT * 0.07, borderRadius: HEIGHT * 0.035, marginTop: -HEIGHT * 0.035, backgroundColor: COLORS.white, borderColor: COLORS.borderColor1, alignItems: "center", borderWidth: 1, justifyContent: "space-between" }, STYLES.flexDirection(lang)]}>
                    <View style={{ flex: 1 }}>
                        <CustomTextInput style={{ height: HEIGHT * 0.07, borderWidth: 0, }}
                            placeholder="Search"
                            image={search}
                            placeholderTextColor={COLORS.placeHolderColor}
                            textColor={COLORS.black}
                        />
                    </View>
                    <Image style={{ marginHorizontal: WIDTH * 0.05, width: WIDTH * 0.1 }} source={filter} resizeMode="contain" />
                </View> */}
                <View style={{ height: HEIGHT * 0.2, justifyContent: "space-evenly" }}>
                    <Text style={[{ color: COLORS.white, marginHorizontal: WIDTH * 0.05, marginVertical: WIDTH * 0.025, fontSize: 18 }, STYLES.textAlign(lang), STYLES.fontSpecial()]}>{context.t("meals")}</Text>
                    <FlatList
                        horizontal
                        inverted={lang == "ar"}
                        showsHorizontalScrollIndicator={false}
                        data={homeList?.meals || []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <RenderMealItem item={item} meals lastelement={index == homeList?.meals.length - 1} />}
                    />
                </View>
                <View style={{ height: HEIGHT * 0.27, justifyContent: "space-evenly" }}>
                    <Text style={[{ color: COLORS.white, marginHorizontal: WIDTH * 0.05, marginVertical: WIDTH * 0.025, fontSize: 18 }, STYLES.textAlign(lang), STYLES.fontSpecial()]}>{context.t("our_restaurants")}</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        inverted={lang == "ar"}
                        style={{}}
                        data={homeList?.restaurants || []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <RestaurantComponent item={item} lastelement={index == homeList?.restaurants.length - 1} />}
                    />
                </View>
                <View style={{ marginBottom: HEIGHT * 0.09 }}>
                    <Text style={[{ color: COLORS.white, marginHorizontal: WIDTH * 0.05, fontSize: 18 }, STYLES.textAlign(lang), STYLES.fontSpecial()]}>{context.t("categories")}</Text>
                    <FlatList
                        scrollEnabled={false}
                        contentContainerStyle={{ alignItems: lang == "ar" ? 'flex-end' : "flex-start" }}
                        numColumns={3}
                        data={categoryList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (<Pressable onPress={() => navigation.navigate("ChooseRestaurantsScreen", { item, type: "category" })} style={{ height: WIDTH * 0.27, width: WIDTH * 0.27, marginLeft: lang == "en" ? WIDTH * 0.05 : 0, marginRight: lang == "ar" ? WIDTH * 0.05 : 0, borderRadius: WIDTH * 0.05, overflow: "hidden", marginTop: WIDTH * 0.03 }}>
                                <ImageBackground source={item?.media && item?.media.length > 0 ? { uri: item?.media[0]?.url } : dummy} style={{ flex: 1, }} resizeMode="cover">
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colorArray()} style={{ flex: 1, justifyContent: "center", alignItems: "center", opacity: 0.65, position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={[{ color: COLORS.white, marginHorizontal: WIDTH * 0.05, marginVertical: WIDTH * 0.025, fontSize: 15, }, STYLES.fontBold()]}>{item?.name}</Text>
                                    </View>
                                </ImageBackground>
                            </Pressable>)
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    </Header>)
}

HomeScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        pickupMode: ProfileReducer.pickupMode,
        askForPickupMode: ProfileReducer.askForPickupMode,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
