import React from 'react'
import { ImageBackground, Pressable, Image, Text, View } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { dummy, star } from '../../assets/images'
import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants'

const RestaurantComponent = (props) => {
    const navigation = useNavigation()
    const { item, style, lang, lastelement, vertLast, type, mealId, categoryId, slider = false } = props

    const navigateTo = () => {
        let route = "RestaurantDetailsScreen"
        if (slider && item.coupon_id > 0) {
            route = "OffersScreen"
        }
        navigation.navigate(route, { item, type, mealId, categoryId, selectedTab: slider ? 2 : 0 })
    }

    return (<Pressable onPress={navigateTo} style={[{ height: HEIGHT * 0.2, width: slider ? WIDTH * 0.9 : WIDTH * 0.6, marginLeft: lang != "ar" ? WIDTH * 0.05 : lastelement ? WIDTH * 0.05 : 0, marginRight: lang == "ar" ? WIDTH * 0.05 : lastelement ? WIDTH * 0.05 : 0, borderRadius: WIDTH * 0.05, overflow: "hidden", backgroundColor: COLORS.white, marginBottom: vertLast ? HEIGHT * 0.1 : WIDTH * 0.05, elevation: 3 }, { ...style }]}>
        <ImageBackground source={item?.media && item?.media.length > 0 ? { uri: item?.media[0]?.url } : dummy} style={{ flex: 1, }} resizeMode="cover">
            <View style={[{ height: HEIGHT * 0.025, justifyContent: "space-between", margin: WIDTH * 0.02 }, STYLES.flexDirection(lang)]}>
                {item?.button && <View style={{ paddingHorizontal: WIDTH * 0.03, justifyContent: "center", borderRadius: WIDTH * 0.01, backgroundColor: COLORS.white }}>
                    <Text style={[{ fontSize: 10, color: COLORS.green1 }, STYLES.fontBold()]}>{item?.button}</Text>
                </View>}
                {item?.rate && <View style={{ paddingHorizontal: WIDTH * 0.02, justifyContent: "center", borderRadius: HEIGHT * 0.0125, flexDirection: "row", alignItems: "center", backgroundColor: COLORS.white, }}>
                    <Image style={{ marginRight: WIDTH * 0.02, width: WIDTH * 0.03, height: HEIGHT * 0.01 }} source={star} resizeMode="contain" />
                    <Text style={[{ fontSize: 10, color: COLORS.green1 }, STYLES.fontBold()]}>{Number(item?.rate).toFixed(1)}</Text>
                </View>}
            </View>
            {!slider && (item.closed || !item.available_for_delivery) && <View style={{ backgroundColor: COLORS.primary, alignSelf: "flex-start" }}>
                <Text style={[{ color: COLORS.white, textAlign: "center", margin: WIDTH * 0.01 }, STYLES.fontMedium()]}>
                    {item.closed ? "Shop Closed" : item.available_for_delivery ? "" : "Only Pickup"}
                </Text>
            </View>}
        </ImageBackground>
        <View style={[{ height: HEIGHT * 0.05, paddingHorizontal: WIDTH * 0.05, justifyContent: "center" }, STYLES.alignItems(lang)]}>
            <Text numberOfLines={1} style={[{ textAlign: lang == "en" ? "left" : "right", fontSize: 13 }, STYLES.fontRegular()]}>{item?.name || item?.text}</Text>
            <Text numberOfLines={1} style={[{ textAlign: lang == "en" ? "left" : "right", fontSize: 10 }, STYLES.fontRegular()]}>{item?.address}</Text>
        </View>
    </Pressable>)
}

RestaurantComponent.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState }) => {
    return {
        lang: i18nState.lang,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantComponent)
