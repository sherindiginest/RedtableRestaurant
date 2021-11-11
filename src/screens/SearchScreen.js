import React, { useState } from 'react'
import { View, Text, Image, Pressable, FlatList } from 'react-native'
import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AddAddressModal, CustomTextInput, RenderItem } from '../components'
import { backarrow, search } from '../../assets/images'

const SearchScreen = (props) => {
    const { lang, navigation, route: { params: { details } } } = props

    const [search, setsearch] = useState("")
    const [showAddAddress, setshowAddAddress] = useState(false)

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={[STYLES.flexDirection(lang), { borderBottomWidth: 0.5 }]}>
                <Pressable style={{ width: WIDTH * 0.15, height: HEIGHT * 0.07, justifyContent: "center", alignItems: "center", }} onPress={() => navigation.goBack()}>
                    <Image source={backarrow} style={{ height: HEIGHT * 0.04, width: WIDTH * 0.1, tintColor: COLORS.black }} resizeMode="contain" />
                </Pressable>
                <View style={{ flex: 1 }}>
                    <CustomTextInput style={{ height: HEIGHT * 0.07, borderWidth: 0, }}
                        placeholder="Search Menu"
                        //image={search}
                        placeholderTextColor={COLORS.placeHolderColor}
                        textColor={COLORS.black}
                        autoFocus
                        onChangeText={(value) => setsearch(value)}
                    />
                </View>
            </View>
            <View>
                <FlatList
                    data={details.foods.filter((item) => (item.name).toLowerCase().includes(search.toLowerCase())) || details.foods}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => "search" + item.id}
                    contentContainerStyle={[STYLES.alignItems(lang)]}
                    numColumns={2}
                    renderItem={({ item, index }) => <RenderItem item={item} restaurant_id={details.id} />}
                />
            </View>
        </View>
    )
}

SearchScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState }) => {
    return {
        lang: i18nState.lang,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
