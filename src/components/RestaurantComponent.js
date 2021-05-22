import React from 'react'
import { ImageBackground, Pressable, Image, Text, View } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { dummy, star } from '../../assets/images'
import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants'

const RestaurantComponent = (props) => {
    const navigation = useNavigation()
    const { item: { name, status, starValue }, style, lang } = props
    return (
        <Pressable onPress={() => navigation.navigate("RestaurantDetailsScreen")} style={[{ height: HEIGHT * 0.2, width: WIDTH * 0.42, marginLeft: lang != "ar" ? WIDTH * 0.05 : 0, marginRight: lang == "ar" ? WIDTH * 0.05 : 0, borderRadius: WIDTH * 0.05, overflow: "hidden", backgroundColor: COLORS.white, marginBottom: WIDTH * 0.05 }, { ...style }]}>
            <ImageBackground source={dummy} style={{ flex: 1, padding: WIDTH * 0.02 }} resizeMode="cover">
                <View style={[{ height: HEIGHT * 0.025, justifyContent: "space-between", }, STYLES.flexDirection(lang)]}>
                    <View style={{ paddingHorizontal: WIDTH * 0.03, justifyContent: "center", borderRadius: WIDTH * 0.01, backgroundColor: COLORS.white }}>
                        <Text style={{ fontSize: 10, fontWeight: "bold", color: COLORS.green1 }}>{status}</Text>
                    </View>
                    <View style={{ paddingHorizontal: WIDTH * 0.02, justifyContent: "center", borderRadius: HEIGHT * 0.0125, flexDirection: "row", alignItems: "center", backgroundColor: COLORS.white, }}>
                        <Image style={{ marginRight: WIDTH * 0.02, width: WIDTH * 0.03, height: HEIGHT * 0.01 }} source={star} resizeMode="contain" />
                        <Text style={{ fontSize: 10, fontWeight: "bold", color: COLORS.green1 }}>{starValue}</Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={[{ height: HEIGHT * 0.05, paddingHorizontal: WIDTH * 0.02, justifyContent: "center" }, STYLES.alignItems(lang)]}>
                <Text>{name}</Text>
            </View>
        </Pressable>
    )
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
