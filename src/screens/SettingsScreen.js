import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, Pressable } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { backarrow, dummy } from '../../assets/images'
import { Header, RestaurantComponent } from '../components'
import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants'

const newItems = [{
    title: "Edit Profile",
    path: "EditProfileScreen"
},
{
    title: "Manage Address",
    path: "ManageAddressScreen"
},
{
    title: "Change Password",
    path: "ChangePasswordScreen"
}]

const SettingsScreen = (props) => {
    const { route, navigation, lang } = props
    //const [title, setTitle] = useState(route.params?.title || "Our Restaurants")

    useEffect(() => {
        //console.log(route?.params?.title || "empreer")
        //setTitle(route.params?.title || "Our Restaurants")
    }, [props])

    return (<Header
        titleColor={COLORS.black}
        title={"settings"}
    >
        <View style={{ flex: 1 }}>
            <View style={{ height: HEIGHT * 0.07, backgroundColor: `${COLORS.activeTabColor}10`, paddingHorizontal: WIDTH * 0.05, justifyContent: "center" }}>
                <Text style={[STYLES.textAlign(lang), { color: COLORS.title2 }]}>Account</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{}}
                data={newItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Pressable onPress={() => navigation.navigate(item.path)} style={[{ height: HEIGHT * 0.07, paddingHorizontal: WIDTH * 0.05, justifyContent: "space-between", borderTopWidth: index == 1 ? 0.5 : 0, borderBottomWidth: index == 1 ? 0.5 : 0, borderColor: COLORS.borderColor2, alignItems: "center" }, STYLES.flexDirection(lang)]}>
                    <Text style={[STYLES.textAlign(lang), { color: COLORS.title2, fontWeight: "bold" }]}>{item.title}</Text>
                    <Image source={backarrow} style={{ height: HEIGHT * 0.04, width: WIDTH * 0.05, tintColor: COLORS.arrowColor, transform: [{ scaleX: lang == "en" ? -1 : 1 }] }} />
                </Pressable>}
            />
        </View>

    </Header>
    )
}
SettingsScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState }) => {
    return {
        lang: i18nState.lang,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
