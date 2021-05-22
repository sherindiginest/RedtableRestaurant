import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { dummy } from '../../assets/images'
import { COLORS, HEIGHT, WIDTH } from '../constants'

const ProductComponent = (props) => {
    const navigation = useNavigation()
    const { item: { name }, lang } = props
    return (
        <Pressable onPress={() => navigation.navigate("OurRestaurantsScreen", { title: "Choose Restaurant" })} style={{ width: WIDTH * 0.3, height: WIDTH * 0.3, borderRadius: WIDTH * 0.075, marginLeft: lang == "ar" ? WIDTH * 0.05 : 0, marginRight: lang != "ar" ? WIDTH * 0.05 : 0, backgroundColor: COLORS.white, padding: WIDTH * 0.03, justifyContent: "space-between", alignItems: "center" }}>
            <Image style={{ height: WIDTH * 0.2, width: WIDTH * 0.2 }} source={dummy} resizeMode="cover" />
            <Text>{name}</Text>
        </Pressable>
    )
}

ProductComponent.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState }) => {
    return {
        lang: i18nState.lang,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent)
