import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { backarrow, dummy } from '../../assets/images'
import { Header, RestaurantComponent } from '../components'
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

const OurRestaurantsScreen = (props) => {
    const { route, navigation, lang } = props
    const [title, setTitle] = useState(route.params?.title || "Our Restaurants")

    useEffect(() => {
        //console.log(route?.params?.title || "empreer")
        setTitle(route.params?.title || "Our Restaurants")
    }, [props])

    return (<Header
        backgroundColor={`${COLORS.statusbar}50`}
        title={title}
    >

        <View style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{}}
                contentContainerStyle={{ alignItems: "center" }}
                data={newItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <RestaurantComponent item={item}
                    style={{ width: WIDTH * 0.75, height: HEIGHT * 0.3 }}
                />}
            />
        </View>

    </Header>
    )
}
OurRestaurantsScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState }) => {
    return {
        lang: i18nState.lang,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OurRestaurantsScreen)
