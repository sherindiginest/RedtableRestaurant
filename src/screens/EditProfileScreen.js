import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { backarrow, dummy } from '../../assets/images'
import { Header, RestaurantComponent } from '../components'
import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants'

const newItems = [{
    title: "Edit Profile",
    path: ""
},
{
    title: "Manage Address",
    path: ""
},
{
    title: "Change Password",
    path: ""
}]

const EditProfileScreen = (props) => {
    const { route, navigation, lang } = props
    //const [title, setTitle] = useState(route.params?.title || "Our Restaurants")

    useEffect(() => {
        //console.log(route?.params?.title || "empreer")
        //setTitle(route.params?.title || "Our Restaurants")
    }, [props])

    return (<Header
        titleColor={COLORS.black}
        title={"edit_profile"}
    >
        <View style={{ flex: 1 }}>

        </View>

    </Header>
    )
}

EditProfileScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState }) => {
    return {
        lang: i18nState.lang,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
