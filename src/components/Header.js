import React from 'react'
import { Pressable } from 'react-native'
import { View, Text, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { logo, menu, notification, backarrow } from "./../../assets/images"
import { StatusBar } from 'react-native'

const Header = (props) => {
    const navigation = useNavigation()
    const { backgroundColor = COLORS.white, transparent = false, lang, title, titleColor = COLORS.white } = props

    return (
        <View style={{ flex: 1, backgroundColor, }}>
            <StatusBar barStyle="dark-content" backgroundColor={`${COLORS.black}12`} />
            {!transparent && <View style={[{ height: HEIGHT * 0.07, paddingHorizontal: WIDTH * 0.05, justifyContent: "space-between", alignItems: "center", }, STYLES.flexDirection(lang)]}>
                <Pressable onPress={() => navigation.openDrawer()}>
                    <Image source={menu} style={{}} resizeMode="contain" />
                </Pressable>
                {!transparent ? <Image source={logo} style={{ height: HEIGHT * 0.07, width: WIDTH * 0.2 }} /> : <View style={{ width: WIDTH * 0.8 }}>
                </View>}
                <Pressable onPress={() => { }}>
                    <Image source={notification} style={{}} resizeMode="contain" />
                </Pressable>
            </View>}
            <View style={{ flex: 1 }}>
                {title && <View style={[{ height: HEIGHT * 0.07, paddingHorizontal: WIDTH * 0.05, alignItems: "center" }, STYLES.flexDirection(lang)]}>
                    <Image source={backarrow} style={{ height: HEIGHT * 0.04, width: WIDTH * 0.05, tintColor: titleColor, transform: [{ scaleX: lang == "ar" ? -1 : 1 }] }} />
                    <Text style={{ color: titleColor, marginHorizontal: WIDTH * 0.05, fontSize: 20 }}>
                        {title}
                    </Text>
                </View>}
                {props.children}
            </View>
            {transparent && <View style={[{ height: HEIGHT * 0.07, paddingHorizontal: WIDTH * 0.05, justifyContent: "space-between", alignItems: "center", position: "absolute" }, STYLES.flexDirection(lang)]}>
                <Pressable onPress={() => navigation.openDrawer()}>
                    <Image source={menu} style={{ tintColor: COLORS.white }} resizeMode="contain" />
                </Pressable>
                <View style={{ width: WIDTH * 0.8 }}>
                </View>
                <Pressable onPress={() => { }}>
                    <Image source={notification} style={{ tintColor: COLORS.white }} resizeMode="contain" />
                </Pressable>
            </View>}
        </View>
    )
}

Header.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState }) => {
    return {
        lang: i18nState.lang,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
