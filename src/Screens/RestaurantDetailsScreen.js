import React, { useRef, useEffect, useState } from 'react'
import { ImageBackground, Image, View, Text, Pressable, FlatList, ScrollView, Modal } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { backarrow, dummy, location, call, direction, filter, search, star, mailoutline, calloutline, locationoutline, clockoutline, close, heart } from '../../assets/images'
import { Header, CustomTextInput } from '../components'
import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants'

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

const RenderItem = (props) => {
    const { item, lang } = props
    const [visible, setVisible] = useState(false)
    return (<>
        <Pressable
            onPress={() => setVisible(true)}
            style={{ height: WIDTH * 0.4, width: WIDTH * 0.4, marginLeft: lang == "en" ? WIDTH * 0.07 : 0, marginRight: lang == "ar" ? WIDTH * 0.07 : 0, marginVertical: WIDTH * 0.05, borderRadius: WIDTH * 0.07, backgroundColor: COLORS.white, elevation: 3, alignItems: "center", }}>
            <Image style={{ width: WIDTH * 0.27, height: WIDTH * 0.23, marginTop: WIDTH * 0.01, }} source={item.image} resizeMode="contain" />
            <Text>
                {item.name}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
                {item.starValue}
            </Text>
            <View style={{ width: WIDTH * 0.25, height: WIDTH * 0.07, borderRadius: WIDTH * 0.035, marginTop: WIDTH * 0.02, backgroundColor: COLORS.statusbar, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: COLORS.white, fontSize: 11 }}>
                    Add to order</Text>
            </View>
        </Pressable>
        <Modal animationType="slide" visible={visible}
            onRequestClose={() => setVisible(false)}
            transparent
        >
            <View style={{ flex: 1, backgroundColor: "#00000030", }}>
                <Pressable onPress={() => setVisible(false)} style={{ flex: 1 }}>


                </Pressable>
                <View style={{ backgroundColor: COLORS.white, height: HEIGHT * 0.5, borderTopLeftRadius: WIDTH * 0.05, borderTopRightRadius: WIDTH * 0.05, overflow: "hidden" }}>
                    <ImageBackground style={{ width: WIDTH, height: WIDTH * 0.4, alignItems: "flex-end", justifyContent: "space-between" }} source={dummy} resizeMode="cover">
                        <Pressable style={{ backgroundColor: COLORS.white, margin: WIDTH * 0.03, borderRadius: WIDTH * 0.035 }} onPress={() => setVisible(false)}>
                            <Image style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, margin: WIDTH * 0.015, }} source={close} resizeMode="contain" />
                        </Pressable>
                        <View style={{ backgroundColor: COLORS.white, width: WIDTH * 0.15, height: WIDTH * 0.1, justifyContent: "center", alignItems: "center", borderRadius: WIDTH * 0.07, marginBottom: -WIDTH * 0.05, marginHorizontal: WIDTH * 0.05 }}>
                            <Image style={{ width: WIDTH * 0.05, height: WIDTH * 0.05, }} source={heart} resizeMode="contain" />
                        </View>
                    </ImageBackground>
                    <View style={{ flex: 1, paddingTop: HEIGHT * 0.03 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: WIDTH * 0.05 }}>
                            <Text style={{ color: COLORS.titleColor }}>
                                Sambal Shrimp
                        </Text>
                            <Text style={{ color: COLORS.addToCartButton }}>
                                50SR
                        </Text>
                        </View>
                        <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                            <Text style={{ color: COLORS.title1, fontSize: 10 }}>
                                80 Rating
                        </Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: WIDTH * 0.05, justifyContent: "space-evenly" }}>
                            <Text style={{ color: COLORS.title1, fontWeight: "bold" }}>
                                About Sambal Shrimp
                        </Text>
                            <Text style={{ color: COLORS.titleColor }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text>
                        </View>
                        <Pressable style={{ marginHorizontal: WIDTH * 0.05, height: HEIGHT * 0.07, backgroundColor: COLORS.addToCartButton, marginBottom: HEIGHT * 0.01, borderRadius: HEIGHT * 0.035, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                                Add To Order
                        </Text>
                        </Pressable>
                    </View>

                </View>

            </View>
        </Modal>
    </>)
}

const RestaurantDetailsScreen = (props) => {
    const { lang } = props
    let scrollViewref = useRef(null)
    const [tab, setTab] = useState(0)

    useEffect(() => {
        try {
            scrollViewref != null && scrollViewref.current.scrollTo({ x: tab * WIDTH, y: 0, animted: true })
        } catch (error) {

        }
    }, [tab])


    return (<Header
        transparent
        backgroundColor={"transparent"}
    >
        <ImageBackground source={dummy} style={{ height: HEIGHT * 0.35, width: WIDTH }} >
            <View style={{ PaddingTop: HEIGHT * 0.07, flex: 1, backgroundColor: COLORS.textInputBorder, justifyContent: "flex-end", alignItems: "center" }}>
                <View style={{ height: HEIGHT * 0.13, alignItems: "center" }}>
                    <Text style={{ fontSize: 20, color: COLORS.white }}>
                        Red Table
                    </Text>
                    <View style={[{}, STYLES.flexDirection(lang)]}>
                        <Image source={location} style={{ height: HEIGHT * 0.02, width: WIDTH * 0.05, }} resizeMode="contain" />
                        <Text style={{ color: COLORS.white, textAlign: "center", width: WIDTH * 0.7 }}>
                            8931 Prince Mohammed Bin Fahad Road,
                            Abdullah Fouad, Dammam
                    </Text>
                    </View>

                </View>
                <View style={[{ height: HEIGHT * 0.07, marginBottom: HEIGHT * 0.05, width: WIDTH * 0.9, backgroundColor: COLORS.buttondark, borderRadius: HEIGHT * 0.035, overflow: "hidden" }, STYLES.flexDirection(lang)]}>
                    <Pressable style={[{ flex: 1, justifyContent: "space-evenly", alignItems: "center", borderRightWidth: lang == "en" ? 1 : 0, borderColor: COLORS.inactiveTabColor }, STYLES.flexDirection(lang)]}>
                        <View style={{ width: HEIGHT * 0.05, height: HEIGHT * 0.05, backgroundColor: COLORS.white, borderRadius: HEIGHT * 0.025, justifyContent: "center", alignItems: "center" }}>
                            <Image source={call} style={{ height: HEIGHT * 0.02, width: WIDTH * 0.05, }} resizeMode="contain" />
                        </View>
                        <Text style={{ fontSize: 14, color: COLORS.white }}>
                            +966 562445651
                    </Text>
                    </Pressable>
                    <Pressable style={[{ flex: 1, justifyContent: "space-evenly", alignItems: "center", borderRightWidth: lang != "en" ? 1 : 0, borderColor: COLORS.inactiveTabColor }, STYLES.flexDirection(lang)]}>
                        <View style={{ width: HEIGHT * 0.05, height: HEIGHT * 0.05, backgroundColor: COLORS.white, borderRadius: HEIGHT * 0.025, justifyContent: "center", alignItems: "center" }}>
                            <Image source={direction} style={{ height: HEIGHT * 0.02, width: WIDTH * 0.05, }} resizeMode="contain" />
                        </View>
                        <Text style={{ fontSize: 14, color: COLORS.white }}>
                            Direction
                    </Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={[{ height: HEIGHT * 0.07, borderRadius: HEIGHT * 0.035, marginTop: -HEIGHT * 0.035, backgroundColor: COLORS.white, borderColor: COLORS.borderColor1, alignItems: "center", borderWidth: 1 }, STYLES.flexDirection(lang)]}>
                {/*  <Image style={{}} source={search} resizeMode="contain" /> */}
                <CustomTextInput style={{ flex: 1, height: HEIGHT * 0.07, borderWidth: 0, }}
                    placeholder="Search"
                    image={search}
                    placeholderTextColor={COLORS.placeHolderColor}
                    textColor={COLORS.black}
                />
                <Image style={{ marginHorizontal: WIDTH * 0.05, }} source={filter} resizeMode="contain" />
            </View>
            <View style={{ height: HEIGHT * 0.05, paddingHorizontal: WIDTH * 0.03, marginTop: HEIGHT * 0.01 }}>
                <FlatList
                    horizontal
                    inverted={lang == "ar"}
                    data={["Menu", "About", "Featured", "Reviews"]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <View style={{ width: WIDTH * 0.2, justifyContent: "center" }}>
                        <Pressable onPress={() => setTab(index)} style={{ justifyContent: "center", alignItems: "center", borderRadius: HEIGHT * 0.005, elevation: 3, backgroundColor: tab == index ? COLORS.statusbar : COLORS.white }}>
                            <Text>
                                {item}
                            </Text>
                        </Pressable>
                    </View>}
                    ItemSeparatorComponent={() => <View style={{ width: WIDTH * 0.035, alignItems: "center", justifyContent: "center" }}>
                        <View style={{ borderWidth: 1, height: HEIGHT * 0.025, borderLeftWidth: 0.5, borderColor: COLORS.textInputBorder }} />
                    </View>}
                />

            </View>
            <ScrollView
                horizontal
                ref={scrollViewref}
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
            >

                {/* MENU */}
                <View style={{ flex: 1, width: WIDTH }}>
                    <View style={{ height: HEIGHT * 0.1, paddingHorizontal: WIDTH * 0.03, marginTop: HEIGHT * 0.01, }}>
                        <Text style={[{ marginHorizontal: WIDTH * 0.05, fontSize: 20, marginBottom: HEIGHT * 0.01 }, STYLES.textAlign(lang)]}>
                            Categories</Text>
                        <FlatList
                            horizontal
                            inverted={lang == "ar"}
                            data={["Chicken", "Salads", "Fish"]}
                            showsHorizontalScrollIndicator={false}
                            //style={{ marginBottom: HEIGHT * 0.01 }}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => <Pressable style={{ justifyContent: "center", alignItems: "center", borderRadius: HEIGHT * 0.025, elevation: 3, backgroundColor: COLORS.statusbar, width: WIDTH * 0.35, marginRight: lang == "en" ? WIDTH * 0.03 : 0, marginLeft: lang == "ar" ? WIDTH * 0.03 : 0, marginBottom: HEIGHT * 0.01 }}>
                                <Text>
                                    {item}
                                </Text>
                            </Pressable>}
                        />
                    </View>
                    <FlatList
                        data={newItems}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={[STYLES.alignItems(lang)]}
                        numColumns={2}
                        renderItem={({ item, index }) => <RenderItem item={item} lang={lang} />}
                    />
                </View>
                {/* ABOUT */}

                <View style={{ flex: 1, width: WIDTH }}>
                    <View style={[{ height: HEIGHT * 0.07, paddingHorizontal: WIDTH * 0.05, justifyContent: "space-between", alignItems: "center" }, STYLES.flexDirection(lang)]}>
                        <Text style={{ fontSize: 20, }}>
                            RedTable Dammam
                            </Text>
                        <View style={{ padding: WIDTH * 0.02, justifyContent: "center", borderRadius: HEIGHT * 0.0125, flexDirection: "row", alignItems: "center", backgroundColor: `${COLORS.activeTabColor}15`, }}>
                            <Image style={{ marginRight: WIDTH * 0.02, width: WIDTH * 0.03, height: HEIGHT * 0.01 }} source={star} resizeMode="contain" />
                            <Text style={{ fontSize: 10, fontWeight: "bold", color: COLORS.green1 }}>4.5</Text>
                        </View>
                    </View>
                    <View style={[{ paddingHorizontal: WIDTH * 0.05, alignItems: "center" }, STYLES.flexDirection(lang)]}>
                        <Image style={{ marginHorizontal: WIDTH * 0.05, width: WIDTH * 0.04, height: HEIGHT * 0.05 }} source={locationoutline} resizeMode="contain" />
                        <Text style={[{ fontWeight: "bold", color: COLORS.activeTabColor, width: WIDTH * 0.8 }, STYLES.textAlign(lang)]}>8931 Prince Mohammed Bin Fahad Road,
Abdullah Fouad, Dammam</Text>
                    </View>
                    <View style={[{ paddingHorizontal: WIDTH * 0.05, alignItems: "center" }, STYLES.flexDirection(lang)]}>
                        <Image style={{ marginHorizontal: WIDTH * 0.05, width: WIDTH * 0.05, height: HEIGHT * 0.05 }} source={calloutline} resizeMode="contain" />
                        <Text style={{ fontWeight: "bold", color: COLORS.activeTabColor }}>+966 562 445 651</Text>
                    </View>
                    <View style={[{ paddingHorizontal: WIDTH * 0.05, alignItems: "center" }, STYLES.flexDirection(lang)]}>
                        <Image style={{ marginHorizontal: WIDTH * 0.05, width: WIDTH * 0.05, height: HEIGHT * 0.05 }} source={mailoutline} resizeMode="contain" />
                        <Text style={{ fontWeight: "bold", color: COLORS.activeTabColor }}>info@redtablerestaurant.com</Text>
                    </View>
                    <View style={[{ paddingHorizontal: WIDTH * 0.05, alignItems: "center" }, STYLES.flexDirection(lang)]}>
                        <Image style={{ marginHorizontal: WIDTH * 0.05, width: WIDTH * 0.05, height: HEIGHT * 0.05 }} source={clockoutline} resizeMode="contain" />
                        <Text style={{ fontWeight: "bold", color: COLORS.activeTabColor }}>Open Now daily time 9:30 am to 11:00 pm</Text>
                    </View>
                </View>
                {/* FEATURED */}
                <View style={{ flex: 1, width: WIDTH }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={[{ marginHorizontal: WIDTH * 0.05, fontSize: 20, }, STYLES.textAlign(lang)]}>
                            Today's Special</Text>
                        <View>
                            <FlatList
                                horizontal
                                data={newItems}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                contentContainerStyle={[STYLES.alignItems(lang)]}
                                renderItem={({ item, index }) => <RenderItem item={item} lang={lang} />}
                            />
                            <Text style={[{ marginHorizontal: WIDTH * 0.05, fontSize: 20, }, STYLES.textAlign(lang)]}>
                                Best Offers</Text>
                            <View style={{}}>
                                <FlatList
                                    horizontal
                                    data={newItems}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    contentContainerStyle={[STYLES.alignItems(lang)]}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={{ height: WIDTH * 0.4, width: WIDTH * 0.6, marginLeft: lang == "en" ? WIDTH * 0.07 : 0, marginRight: lang == "ar" ? WIDTH * 0.07 : 0, borderRadius: WIDTH * 0.07, backgroundColor: COLORS.white, elevation: 3, marginBottom: HEIGHT * 0.02, marginTop: WIDTH * 0.03 }}>

                                                <Image style={{ height: WIDTH * 0.25, width: WIDTH * 0.6, marginTop: WIDTH * 0.01, borderTopRightRadius: WIDTH * 0.05, borderTopLeftRadius: WIDTH * 0.05 }} source={item.image} resizeMode="cover" />
                                                <View style={{ flex: 1, marginHorizontal: WIDTH * 0.05 }}>
                                                    <Text style={[STYLES.textAlign(lang)]}>
                                                        Chicken Salad  | Discount Offer !
                                                </Text>
                                                </View>
                                                <View style={[{ backgroundColor: COLORS.green, width: WIDTH * 0.1, height: WIDTH * 0.1, borderRadius: WIDTH * 0.05, position: "absolute", top: -WIDTH * 0.03, justifyContent: "center", alignItems: "center" }, lang == "ar" ? { right: -WIDTH * 0.02, } : { left: -WIDTH * 0.02, }]}>
                                                    <Text>
                                                        50 %
                                                </Text>
                                                </View>
                                            </View>
                                        )
                                    }}
                                />

                            </View>
                        </View>
                    </ScrollView>
                </View>
                {/* REVIEW */}
                <View style={{ flex: 1, width: WIDTH }}>
                    <Text style={[{ marginHorizontal: WIDTH * 0.05, fontSize: 20, }, STYLES.textAlign(lang)]}>
                        Reviews & Ratings</Text>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={newItems}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={[STYLES.alignItems(lang)]}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ width: WIDTH * 0.8, marginLeft: lang == "en" ? WIDTH * 0.1 : 0, marginRight: lang == "ar" ? WIDTH * 0.1 : 0, borderRadius: WIDTH * 0.05, backgroundColor: COLORS.white, elevation: 3, marginVertical: HEIGHT * 0.01, padding: WIDTH * 0.05, justifyContent: "space-between" }}>
                                        <View style={{ flexDirection: "row", marginBottom: HEIGHT * 0.01 }}>
                                            <Image style={{ height: WIDTH * 0.1, width: WIDTH * 0.1, borderRadius: WIDTH * 0.03, }} source={item.image} resizeMode="cover" />
                                            <View style={{ paddingHorizontal: WIDTH * 0.02 }}>
                                                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                                                    Maxime Barbosa
                                                </Text>
                                                <Text style={{ fontSize: 8, }}>
                                                    April 7,2020
                                                </Text>
                                                <Text style={{ fontSize: 8, }}>
                                                    Dammam
                                                </Text>
                                            </View>
                                        </View>
                                        <Text style={{ fontSize: 12, }}>
                                            Superb experience. The Hunters Menu was excellent
                                            along with the wine pairing. Anna, who served us,
                                            was incredible.
                                            </Text>
                                    </View>
                                )
                            }}
                        />

                    </View>
                </View>
            </ScrollView>
        </View>


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
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetailsScreen)
