import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, ImageBackground } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, has } from "lodash"
import LinearGradient from 'react-native-linear-gradient';

import { backarrow, dummy } from '../../assets/images'
import { Header, RestaurantComponent } from '../components'
import { API, Axios, colorArray, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { LoadingAction } from '../redux/actions'

const OffersScreen = (props) => {
    const { route, navigation, lang, hideLoader, showLoader, userData, country } = props
    const [offersList, setOffersList] = useState([])

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [country])

    const getData = async () => {
        showLoader()
        const { api_token } = userData
        await Axios.get(API.coupons, { params: { api_token } }).then(async (response) => {
            if (has(response, "success") && response.success) {
                setOffersList(response.data)
            }
            hideLoader()
        }).catch((error) => {
            hideLoader()
            console.log("error ==>", error);
        })
    }

    return (<Header backgroundColor={COLORS.white} title="coupons" titleColor={COLORS.black}>
        <View style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{}}
                contentContainerStyle={{ alignItems: "center" }}
                data={offersList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <ImageBackground source={item?.media && item?.media.length > 0 ? { uri: item?.media[0]?.url } : dummy} style={{ height: HEIGHT * 0.2, width: WIDTH * 0.8, marginBottom: HEIGHT * 0.03, borderRadius: HEIGHT * 0.03, overflow: "hidden", justifyContent: "flex-end" }}>
                    <View style={{ height: HEIGHT * 0.06, borderRadius: HEIGHT * 0.03, justifyContent: "center", alignItems: "center" }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colorArray()} style={{ flex: 1, justifyContent: "center", alignItems: "center", opacity: 0.65, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: HEIGHT * 0.025, }} />
                        <Text style={{ color: COLORS.white, fontSize: 15, fontWeight: "bold" }}>{`${item.discount}${item.discount_type == "percent" ? " %" : " SR"} Off, Use code "${item.code}"`}</Text>
                    </View>
                </ImageBackground>}
            />
        </View>

    </Header>
    )
}
OffersScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        userData: ProfileReducer.userData,
        country: ProfileReducer.country
    }
}

const mapDispatchToProps = {
    hideLoader: () => LoadingAction.hideLoader(),
    showLoader: () => LoadingAction.showLoader()
}

export default connect(mapStateToProps, mapDispatchToProps)(OffersScreen)
