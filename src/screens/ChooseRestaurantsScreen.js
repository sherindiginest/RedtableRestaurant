import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, has } from "lodash"

import { backarrow, dummy } from '../../assets/images'
import { Header, RestaurantComponent } from '../components'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { LoadingAction } from '../redux/actions'

const ChooseRestaurantsScreen = (props) => {
    const { route, navigation, lang, hideLoader, showLoader } = props
    const [restaurantList, setRestaurantList] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        showLoader()
        const { item: { id }, type } = route.params
        const url = type == "meal" ? API.mealRestaurants(id) : API.restaurantsCategories(id)
        await Axios.get(url).then(async (response) => {
            setRestaurantList(response)
            if (has(response, "success") && response.success) {
                setRestaurantList(response.data)
            }
            hideLoader()
        }).catch((error) => {
            hideLoader()
            console.log("error ==>", error);
        })
    }

    return (<Header backgroundColor={COLORS.white} title="choose_restaurants">
        <View style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{}}
                contentContainerStyle={{ alignItems: "center" }}
                data={restaurantList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <RestaurantComponent item={item}
                    style={{ width: WIDTH * 0.75, height: HEIGHT * 0.3 }} vertLast={restaurantList.length - 1 == index} type={route.params.type} mealId={route.params.type == "meal" ? route.params.item.id : null} categoryId={route.params.type == "category" ? route.params.item.id : null}
                />}
            />
        </View>

    </Header>
    )
}
ChooseRestaurantsScreen.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ChooseRestaurantsScreen)
