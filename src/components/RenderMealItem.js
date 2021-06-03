import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { dummy } from '../../assets/images'
import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants'

const RenderMealItem = (props) => {
    const navigation = useNavigation()
    const { item, lang, lastelement } = props
    return (
        <Pressable onPress={() => navigation.navigate("ChooseRestaurantsScreen", { item, type: "meal" })} style={{ width: WIDTH * 0.3, height: WIDTH * 0.3, borderRadius: WIDTH * 0.075, marginLeft: lang != "ar" ? WIDTH * 0.05 : lastelement ? WIDTH * 0.05 : 0, marginRight: lang == "ar" ? WIDTH * 0.05 : lastelement ? WIDTH * 0.05 : 0, backgroundColor: COLORS.white, padding: WIDTH * 0.03, justifyContent: "space-between", alignItems: "center" }}>
            <Image style={{ height: WIDTH * 0.2, width: WIDTH * 0.2 }} source={item?.image ? { uri: item.image } : dummy} resizeMode="cover" />
            <Text style={[{ fontSize: 12 }, STYLES.fontRegular()]}>{item?.name}</Text>
        </Pressable>
    )
}

RenderMealItem.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState }) => {
    return {
        lang: i18nState.lang,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RenderMealItem)
