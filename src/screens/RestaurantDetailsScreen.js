import React, { useRef, useEffect, useState } from 'react'
import { ImageBackground, Image, View, Text, Pressable, FlatList, ScrollView, Modal, Linking } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, has } from "lodash"

import { backarrow, dummy, location, call, direction, filter, search, star, mailoutline, calloutline, locationoutline, clockoutline, close, heart } from '../../assets/images'
import { Header, CustomTextInput, RenderItem } from '../components'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { LoadingAction } from '../redux/actions'

const newItems = [{
    name: "Test",
    starValue: 4.5,
    image: dummy,
    status: "Best"
},
{
    name: "test2",
    starValue: 4.5,
    image: dummy,
    status: "New"
},
{
    name: "test3",
    starValue: 4.5,
    image: dummy,
    status: "New"
}]


const RestaurantDetailsScreen = (props) => {
    const { lang, route: { params: { item, type, mealId } }, showLoader, hideLoader } = props
    let scrollViewref = useRef(null)
    const [tab, setTab] = useState(0)
    const [categoryList, setcategoryList] = useState([])
    const [foodList, setfoodList] = useState([])
    const [reviewList, setreviewList] = useState([])
    const [bestoffers, setBestoffers] = useState([])
    const [todaylist, setTodaylist] = useState([])
    const [details, setDetails] = useState(item)
    const [selectdCategory, setSelectdCategory] = useState(null)
    const [restaurant_id, setrestaurant_id] = useState(null)

    useEffect(() => {
        showLoader()
        setrestaurant_id(item?.id)
        getDetails()
        getBestoffers()
        getTodayspecials()
    }, [])

    useEffect(() => {
        if (has(details, "foods") && !isEmpty(details.foods)) {
            const list = details.foods.filter((data) => data.category_id == selectdCategory)
            setfoodList(list)
        }
    }, [selectdCategory])

    useEffect(() => {
        if (has(details, "categories") && !isEmpty(details.categories)) {
            setSelectdCategory(details.categories[0].id)
        }
    }, [details])

    useEffect(() => {
        try {
            scrollViewref != null && scrollViewref.current.scrollTo({ x: tab * WIDTH, y: 0, animted: true })
        } catch (error) { }
    }, [tab])

    const getDetails = async () => {
        await Axios.get(API.restaurantDetails(item.restaurant_id || item.id)).then(async (response) => {
            if (has(response, "success") && response.success) {
                setDetails(response.data)
                setcategoryList(response.data.categories || [])
                mealId ? await getFoods() : hideLoader()
            }
            hideLoader()
        }).catch((error) => {
            console.log("error ==>", error);
            hideLoader()
            //error?.message && Alert.alert("Error", error?.message)
            // setloading(false)
        })
    }

    const getFoods = async () => {
        await Axios.get(API.mealRestaurantFoods(mealId, item.restaurant_id || item.id)).then(async (response) => {
            if (has(response, "success") && response.success) {
                const { categories } = response.data
                setcategoryList(categories || [])
            }
            hideLoader()
        }).catch((error) => {
            hideLoader()
            console.log("error ==>", JSON.stringify(error));
            //error?.message && Alert.alert("Error", error?.message)
            // setloading(false)
        })
    }

    const getBestoffers = async () => {
        await Axios.get(API.restaurantBestoffers(item.id))
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setBestoffers(response.data)
                }
            }).catch((error) => {
                //error?.message && Alert.alert("Error", error?.message)
                // setloading(false)
            })
    }

    const getTodayspecials = async () => {
        await Axios.get(API.restaurantSpecials(item.id))
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setTodaylist(response.data)
                }
            }).catch((error) => {
                //error?.message && Alert.alert("Error", error?.message)
                // setloading(false)
            })
    }

    return (<Header transparent backgroundColor={"transparent"} >
        <ScrollView contentContainerStyle={{ paddingBottom: HEIGHT * 0.09 }} style={{ backgroundColor: COLORS.white, }} /* scrollEnabled={tab == 0 || tab == 3} */ showsVerticalScrollIndicator={false}>
            <ImageBackground source={details?.media && details?.media.length > 0 ? { uri: details?.media[0]?.url } : dummy} style={{ height: HEIGHT * 0.35, width: WIDTH }} >
                <View style={{ PaddingTop: HEIGHT * 0.07, flex: 1, backgroundColor: COLORS.textInputBorder, justifyContent: "flex-end", alignItems: "center" }}>
                    <View style={{ height: HEIGHT * 0.13, alignItems: "center" }}>
                        <Text style={[{ fontSize: 20, color: COLORS.white }, STYLES.fontBold()]}>
                            {details?.name}
                        </Text>
                        <View style={[{}, STYLES.flexDirection(lang)]}>
                            <Image source={location} style={{ height: HEIGHT * 0.02, width: WIDTH * 0.05, }} resizeMode="contain" />
                            <Text style={[{ color: COLORS.white, }, STYLES.fontMedium()]}>
                                {details?.address}
                            </Text>
                        </View>
                    </View>
                    <View style={[{ height: HEIGHT * 0.07, marginBottom: HEIGHT * 0.05, width: WIDTH * 0.9, backgroundColor: COLORS.buttondark, borderRadius: HEIGHT * 0.035, overflow: "hidden" }, STYLES.flexDirection(lang)]}>
                        <Pressable onPress={() => {
                            Linking.openURL(`tel:${details?.phone}`)
                        }} style={[{ flex: 1, justifyContent: "space-evenly", alignItems: "center", borderRightWidth: lang == "en" ? 1 : 0, borderColor: COLORS.inactiveTabColor }, STYLES.flexDirection(lang)]}>
                            <View style={{ width: HEIGHT * 0.05, height: HEIGHT * 0.05, backgroundColor: COLORS.white, borderRadius: HEIGHT * 0.025, justifyContent: "center", alignItems: "center" }}>
                                <Image source={call} style={{ height: HEIGHT * 0.02, width: WIDTH * 0.05, }} resizeMode="contain" />
                            </View>
                            <Text style={[{ fontSize: 14, color: COLORS.white }, STYLES.fontRegular()]}>
                                {details?.phone}
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            const url = Platform.select({
                                ios: `maps:0,0?q=${details?.latitude},${details?.longitude}`,
                                android: `geo:0,0?q=${details?.latitude},${details?.longitude}`,
                            })
                            Linking.openURL(url)
                        }} style={[{ flex: 1, justifyContent: "space-evenly", alignItems: "center", borderRightWidth: lang != "en" ? 1 : 0, borderColor: COLORS.inactiveTabColor }, STYLES.flexDirection(lang)]}>
                            <View style={{ width: HEIGHT * 0.05, height: HEIGHT * 0.05, backgroundColor: COLORS.white, borderRadius: HEIGHT * 0.025, justifyContent: "center", alignItems: "center" }}>
                                <Image source={direction} style={{ height: HEIGHT * 0.02, width: WIDTH * 0.05, }} resizeMode="contain" />
                            </View>
                            <Text style={[{ fontSize: 14, color: COLORS.white }, STYLES.fontRegular()]}>Direction</Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
            <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                <View style={[{ height: HEIGHT * 0.07, borderRadius: HEIGHT * 0.035, marginTop: -HEIGHT * 0.035, backgroundColor: COLORS.white, borderColor: COLORS.borderColor1, alignItems: "center", borderWidth: 1 }, STYLES.flexDirection(lang)]}>
                    {/*  <Image style={{}} source={search} resizeMode="contain" /> */}
                    <View style={{ flex: 1 }}>
                        <CustomTextInput style={{ height: HEIGHT * 0.07, borderWidth: 0, }}
                            placeholder="Search Menu"
                            image={search}
                            placeholderTextColor={COLORS.placeHolderColor}
                            textColor={COLORS.black}
                        />
                    </View>
                    <Image style={{ marginHorizontal: WIDTH * 0.05, }} source={filter} resizeMode="contain" />
                </View>
                <View style={{ height: HEIGHT * 0.07, marginTop: HEIGHT * 0.01 }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        inverted={lang == "ar"}
                        data={["Menu", "About", "Featured", "Reviews"]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <View style={{ justifyContent: "center", }}>
                            <Pressable onPress={() => setTab(index)} style={{ justifyContent: "center", alignItems: "center", borderRadius: HEIGHT * 0.01, elevation: 3, backgroundColor: tab == index ? COLORS.statusbar : COLORS.white, height: HEIGHT * 0.03, marginLeft: index == 0 ? WIDTH * 0.05 : 0, marginRight: index == 3 ? WIDTH * 0.05 : 0, width: WIDTH * 0.2, }}>
                                <Text style={[{ color: tab == index ? COLORS.white : COLORS.black, fontSize: 12 }, STYLES.fontRegular()]}>{item}</Text>
                            </Pressable>
                        </View>}
                        ItemSeparatorComponent={() => <View style={{ width: WIDTH * 0.035, alignItems: "center", justifyContent: "center", marginHorizontal: 2 }}>
                            <View style={{ borderWidth: 1, height: HEIGHT * 0.025, borderLeftWidth: 0.5, borderColor: COLORS.textInputBorder }} />
                        </View>}
                    />
                </View>
                <ScrollView
                    style={{ backgroundColor: COLORS.white }}
                    horizontal
                    ref={scrollViewref}
                    pagingEnabled
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {/* MENU */}
                    <View style={{ flex: 1, width: WIDTH, }}>
                        <View style={{ height: HEIGHT * 0.11, marginTop: HEIGHT * 0.01, }}>
                            <Text style={[{ marginHorizontal: WIDTH * 0.05, fontSize: 20, marginBottom: HEIGHT * 0.01 }, STYLES.textAlign(lang), STYLES.fontSpecial()]}>
                                Categories</Text>
                            <FlatList
                                extraData={categoryList}
                                horizontal
                                inverted={lang == "ar"}
                                data={categoryList}
                                showsHorizontalScrollIndicator={false}
                                //style={{ marginBottom: HEIGHT * 0.01 }}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => <Pressable onPress={() => setSelectdCategory(item.id)} style={{ justifyContent: "center", alignItems: "center", borderRadius: HEIGHT * 0.025, elevation: 3, backgroundColor: selectdCategory == item.id ? COLORS.statusbar : COLORS.white, width: WIDTH * 0.35, marginLeft: lang != "ar" ? WIDTH * 0.05 : index == details?.categories.length - 1 ? WIDTH * 0.03 : 0, marginRight: lang == "ar" ? WIDTH * 0.05 : index == details?.categories.length - 1 ? WIDTH * 0.03 : 0, marginVertical: HEIGHT * 0.01, }}>
                                    <Text style={[{ color: selectdCategory == item.id ? COLORS.white : COLORS.black, }, STYLES.fontRegular()]}>
                                        {item?.name}
                                    </Text>
                                </Pressable>}
                            />
                        </View>
                        <FlatList
                            extraData={foodList}
                            scrollEnabled={false}
                            data={foodList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={[STYLES.alignItems(lang)]}
                            numColumns={2}
                            renderItem={({ item, index }) => <RenderItem item={item} restaurant_id={details.id} />}
                        />
                    </View>
                    {/* ABOUT */}

                    <View style={{ flex: 1, width: WIDTH }}>
                        <View style={[{ height: HEIGHT * 0.07, paddingHorizontal: WIDTH * 0.05, justifyContent: "space-between", alignItems: "center" }, STYLES.flexDirection(lang)]}>
                            <Text style={[{ fontSize: 20, }, STYLES.fontSpecial()]}>
                                {details?.name}
                            </Text>
                            <View style={{ padding: WIDTH * 0.02, justifyContent: "center", borderRadius: HEIGHT * 0.0125, flexDirection: "row", alignItems: "center", backgroundColor: `${COLORS.activeTabColor}15`, }}>
                                <Image style={{ marginRight: WIDTH * 0.02, width: WIDTH * 0.03, height: HEIGHT * 0.01 }} source={star} resizeMode="contain" />
                                <Text style={[{ fontSize: 10, fontWeight: "bold", color: COLORS.green1 }, STYLES.fontRegular()]}>{details?.rate}</Text>
                            </View>
                        </View>
                        <View style={[{ paddingHorizontal: WIDTH * 0.05, alignItems: "center" }, STYLES.flexDirection(lang)]}>
                            <Image style={{ marginHorizontal: WIDTH * 0.05, width: WIDTH * 0.04, height: HEIGHT * 0.05 }} source={locationoutline} resizeMode="contain" />
                            <Text style={[{ color: COLORS.activeTabColor, width: WIDTH * 0.8 }, STYLES.textAlign(lang), STYLES.fontMedium()]}>{details?.address}</Text>
                        </View>
                        <View style={[{ paddingHorizontal: WIDTH * 0.05, alignItems: "center" }, STYLES.flexDirection(lang)]}>
                            <Image style={{ marginHorizontal: WIDTH * 0.05, width: WIDTH * 0.05, height: HEIGHT * 0.05 }} source={calloutline} resizeMode="contain" />
                            <Text style={[{ color: COLORS.activeTabColor }, STYLES.fontRegular()]}>{details?.phone}</Text>
                        </View>
                        <View style={[{ paddingHorizontal: WIDTH * 0.05, alignItems: "center" }, STYLES.flexDirection(lang)]}>
                            <Image style={{ marginHorizontal: WIDTH * 0.05, width: WIDTH * 0.05, height: HEIGHT * 0.05 }} source={mailoutline} resizeMode="contain" />
                            <Text style={[{ color: COLORS.activeTabColor }, STYLES.fontRegular()]}>{details?.email}</Text>
                        </View>
                        <View style={[{ paddingHorizontal: WIDTH * 0.05, alignItems: "center" }, STYLES.flexDirection(lang)]}>
                            <Image style={{ marginHorizontal: WIDTH * 0.05, width: WIDTH * 0.05, height: HEIGHT * 0.05 }} source={clockoutline} resizeMode="contain" />
                            <Text style={[{ color: COLORS.activeTabColor }, STYLES.fontRegular()]}>{details?.working_hours}</Text>
                        </View>
                    </View>
                    {/* FEATURED */}
                    <View style={{ flex: 1, width: WIDTH }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={[{ marginHorizontal: WIDTH * 0.05, fontSize: 20, }, STYLES.textAlign(lang), STYLES.fontSpecial()]}>Today's Special</Text>
                            <View>
                                <FlatList
                                    inverted={lang == "ar"}
                                    horizontal
                                    data={todaylist}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    contentContainerStyle={[STYLES.alignItems(lang)]}
                                    renderItem={({ item, index }) => <RenderItem item={item} lang={lang} vertLast={todaylist?.length - 1 == index} restaurant_id={details.id} />}
                                />
                            </View>
                            <Text style={[{ marginHorizontal: WIDTH * 0.05, fontSize: 20, }, STYLES.textAlign(lang), STYLES.fontSpecial()]}>Best Offers</Text>
                            <View style={{}}>
                                <FlatList
                                    horizontal
                                    data={bestoffers}
                                    inverted={lang == "ar"}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    contentContainerStyle={[STYLES.alignItems(lang)]}
                                    renderItem={({ item, index }) => <RenderItem item={item} lang={lang} vertLast={bestoffers?.length - 1 == index} bestOffer restaurant_id={details.id} />}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    {/* REVIEW */}
                    <View style={{ flex: 1, width: WIDTH }}>
                        <Text style={[{ marginHorizontal: WIDTH * 0.05, fontSize: 20, }, STYLES.textAlign(lang), STYLES.fontSpecial()]}>Reviews & Ratings</Text>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={details?.restaurant_reviews}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                contentContainerStyle={[STYLES.alignItems(lang)]}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{ width: WIDTH * 0.8, marginLeft: lang == "en" ? WIDTH * 0.1 : 0, marginRight: lang == "ar" ? WIDTH * 0.1 : 0, borderRadius: WIDTH * 0.04, backgroundColor: COLORS.white, elevation: 3, marginVertical: HEIGHT * 0.01, padding: WIDTH * 0.05, justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: "row", marginBottom: HEIGHT * 0.01 }}>
                                                <Image style={{ height: WIDTH * 0.1, width: WIDTH * 0.1, borderRadius: WIDTH * 0.03, }} source={dummy} resizeMode="cover" />
                                                <View style={{ paddingHorizontal: WIDTH * 0.02 }}>
                                                    <Text style={[{ fontSize: 12, }, STYLES.fontBold()]}>Maxime Barbosa</Text>
                                                    <Text style={[{ fontSize: 8, }, STYLES.fontRegular()]}>{item.created_at}</Text>
                                                    <Text style={[{ fontSize: 8, }, STYLES.fontRegular()]}>Dammam</Text>
                                                </View>
                                            </View>
                                            <Text style={[{ fontSize: 12, }, STYLES.fontMedium()]}>
                                                {item?.review}
                                            </Text>
                                        </View>
                                    )
                                }}
                            />

                        </View>
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    </Header>)
}

RestaurantDetailsScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState }) => {
    return {
        lang: i18nState.lang,
    }
}

const mapDispatchToProps = {
    hideLoader: () => LoadingAction.hideLoader(),
    showLoader: () => LoadingAction.showLoader()
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetailsScreen)
