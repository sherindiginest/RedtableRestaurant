import React from 'react'
import { Pressable } from 'react-native'
import { View, Text, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { logo, menu, notification, backarrow } from "./../../assets/images"
import { StatusBar } from 'react-native'

const Header = (props, context) => {
    const navigation = useNavigation()
    const { backgroundColor = COLORS.white, transparent = false, lang, title, titleColor = COLORS.title4, cartAction, cartButton = false, notificationButton = true, userData } = props

    return (
        <View style={{ flex: 1, backgroundColor, }}>
            <StatusBar barStyle="dark-content" backgroundColor={`${COLORS.black}12`} />
            {!transparent && <View style={[{ height: HEIGHT * 0.07, paddingHorizontal: WIDTH * 0.05, justifyContent: "space-between", alignItems: "center", }, STYLES.flexDirection(lang)]}>
                <Pressable onPress={() => navigation.openDrawer()}>
                    <Image source={menu} style={{}} resizeMode="contain" />
                </Pressable>
                {!transparent ? <Image source={logo} style={{ height: HEIGHT * 0.07, width: WIDTH * 0.15 }} resizeMode="contain" /> : <View style={{ width: WIDTH * 0.8 }}>
                </View>}
                {notificationButton ? <Pressable onPress={() => { navigation.navigate("NotificationScreen") }}>
                    <Image source={notification} style={{}} resizeMode="contain" />
                    {userData?.notificationCount > 0 && <View style={{ position: "absolute", backgroundColor: COLORS.primary, width: WIDTH * 0.04, height: WIDTH * 0.04, borderRadius: WIDTH * 0.025, justifyContent: "center", alignItems: "center", right: -WIDTH * 0.02, top: -WIDTH * 0.02 }}>
                        <Text style={[{ color: COLORS.white, fontSize: 10 }, STYLES.fontRegular()]}>
                            {userData?.notificationCount}
                        </Text>
                    </View>}
                </Pressable> : <View />}
            </View>}
            <View style={{ flex: 1 }}>
                {title && <View style={[{ height: HEIGHT * 0.07, paddingHorizontal: WIDTH * 0.05, alignItems: "center" }, STYLES.flexDirection(lang)]}>
                    <View style={[STYLES.flexDirection(lang), { flex: 1 }]}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={backarrow} style={{ height: HEIGHT * 0.04, width: WIDTH * 0.05, tintColor: titleColor, transform: [{ scaleX: lang == "ar" ? -1 : 1 }] }} />
                        </Pressable>
                        <Text style={{ color: titleColor, marginHorizontal: WIDTH * 0.05, fontSize: 20 }}>
                            {context.t(title)}
                        </Text>
                    </View>
                    {cartButton && cartAction && <Pressable onPress={() => cartAction && cartAction()}>
                        <Text style={{ color: COLORS.statusbar, fontSize: 15 }}>
                            Clear all
                        </Text>
                    </Pressable>}
                </View>}
                {props.children}
            </View>
            {transparent && <View style={[{ height: HEIGHT * 0.07, paddingHorizontal: WIDTH * 0.05, justifyContent: "space-between", alignItems: "center", position: "absolute" }, STYLES.flexDirection(lang)]}>
                <Pressable onPress={() => navigation.openDrawer()}>
                    <Image source={menu} style={{ tintColor: COLORS.white }} resizeMode="contain" />
                </Pressable>
                <View style={{ width: WIDTH * 0.8 }}>
                </View>
                <Pressable onPress={() => { navigation.navigate("NotificationScreen") }}>
                    <Image source={notification} style={{ tintColor: COLORS.white }} resizeMode="contain" />
                    {userData?.notificationCount > 0 && <View style={{ position: "absolute", backgroundColor: COLORS.primary, width: WIDTH * 0.04, height: WIDTH * 0.04, borderRadius: WIDTH * 0.025, justifyContent: "center", alignItems: "center", right: -WIDTH * 0.02, top: -WIDTH * 0.02 }}>
                        <Text style={[{ color: COLORS.white, fontSize: 10 }, STYLES.fontRegular()]}>
                            {userData?.notificationCount}
                        </Text>
                    </View>}
                </Pressable>
            </View>}
        </View>
    )
}

Header.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        userData: ProfileReducer.userData
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
