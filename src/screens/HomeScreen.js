import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, ScrollView, ImageBackground, Pressable } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, has } from "lodash"

import { dummy, search, filter } from '../../assets/images'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { Header, RestaurantComponent, CustomTextInput, RenderMealItem } from "./../components"

const HomeScreen = (props, context) => {
    const { lang, navigation } = props
    const [homeList, sethomeList] = useState({})
    const [categoryList, setcategoryList] = useState([])
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        //setloading(true)
        await Axios.get(API.home)
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    sethomeList(response.data)
                }
                // setloading(false)
            }).catch((error) => {
                //error?.message && Alert.alert("Error", error?.message)
                // setloading(false)
            })
        await Axios.get(API.categories)
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setcategoryList(response.data)
                }
                // setloading(false)
            }).catch((error) => {
                //error?.message && Alert.alert("Error", error?.message)
                // setloading(false)
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
                    renderItem={({ item, index }) => <RestaurantComponent item={item} lastelement={index == homeList?.slides.length - 1} />}
                />
            </View>
            <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
                <View style={[{ height: HEIGHT * 0.07, borderRadius: HEIGHT * 0.035, marginTop: -HEIGHT * 0.035, backgroundColor: COLORS.white, borderColor: COLORS.borderColor1, alignItems: "center", borderWidth: 1, justifyContent: "space-between" }, STYLES.flexDirection(lang)]}>
                    <View style={{ flex: 1 }}>
                        <CustomTextInput style={{ height: HEIGHT * 0.07, borderWidth: 0, }}
                            placeholder="Search"
                            image={search}
                            placeholderTextColor={COLORS.placeHolderColor}
                            textColor={COLORS.black}
                        />
                    </View>
                    <Image style={{ marginHorizontal: WIDTH * 0.05, width: WIDTH * 0.1, tintColor: COLORS.primary }} source={filter} resizeMode="contain" />
                </View>
                <View style={{ height: HEIGHT * 0.2, justifyContent: "space-evenly" }}>
                    <Text style={[{ color: COLORS.borderColor2, marginHorizontal: WIDTH * 0.05, marginVertical: WIDTH * 0.025, fontSize: 18 }, STYLES.textAlign(lang), STYLES.fontSpecial()]}>{context.t("meals")}</Text>
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
                    <Text style={[{ color: COLORS.borderColor2, marginHorizontal: WIDTH * 0.05, marginVertical: WIDTH * 0.025, fontSize: 18 }, STYLES.textAlign(lang), STYLES.fontSpecial()]}>{context.t("our_restaurants")}</Text>
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
                    <Text style={[{ color: COLORS.borderColor2, marginHorizontal: WIDTH * 0.05, fontSize: 18 }, STYLES.textAlign(lang), STYLES.fontSpecial()]}>{context.t("categories")}</Text>
                    <FlatList
                        scrollEnabled={false}
                        contentContainerStyle={{ alignItems: lang == "ar" ? 'flex-end' : "flex-start" }}
                        numColumns={3}
                        data={categoryList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (<Pressable onPress={() => navigation.navigate("ChooseRestaurantsScreen", { item, type: "category" })} style={{ height: WIDTH * 0.27, width: WIDTH * 0.27, marginLeft: lang == "en" ? WIDTH * 0.05 : 0, marginRight: lang == "ar" ? WIDTH * 0.05 : 0, borderRadius: WIDTH * 0.05, overflow: "hidden", marginTop: WIDTH * 0.03, }}>
                                <ImageBackground source={item?.media && item?.media.length > 0 ? { uri: item?.media[0]?.url } : dummy} style={{ flex: 1, justifyContent: "center", alignItems: "center" }} resizeMode="cover">
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
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

const mapStateToProps = ({ i18nState }) => {
    return {
        lang: i18nState.lang,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
