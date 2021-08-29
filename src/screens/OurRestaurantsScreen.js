import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { has } from "lodash"

import { Header, RestaurantComponent } from '../components'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { LoadingAction } from '../redux/actions'


const OurRestaurantsScreen = (props, context) => {
    const { route, navigation, lang, showLoader, hideLoader } = props
    const [restaurantList, setRestaurantList] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        showLoader()
        await Axios.get(API.restaurants())
            .then(async (response) => {
                if (has(response, "success") && response.success) {
                    setRestaurantList(response.data)
                }
                hideLoader()
            }).catch((error) => {
                hideLoader()
            })
    }

    return (<Header backgroundColor={COLORS.buttonYellow} title="our_restaurants">
        <View style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{}}
                contentContainerStyle={{ alignItems: "center" }}
                data={restaurantList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <RestaurantComponent item={item}
                    style={{ width: WIDTH * 0.75, height: HEIGHT * 0.3 }} vertLast={restaurantList.length - 1 == index}
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

const mapDispatchToProps = {
    hideLoader: () => LoadingAction.hideLoader(),
    showLoader: () => LoadingAction.showLoader()
}

export default connect(mapStateToProps, mapDispatchToProps)(OurRestaurantsScreen)
