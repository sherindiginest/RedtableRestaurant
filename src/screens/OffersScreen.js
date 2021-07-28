import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, ImageBackground } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, has } from "lodash"

import { backarrow, dummy } from '../../assets/images'
import { Header, RestaurantComponent } from '../components'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { LoadingAction } from '../redux/actions'

const OffersScreen = (props) => {
    const { route, navigation, lang, hideLoader, showLoader, userData } = props
    const [offersList, setOffersList] = useState([])

    useEffect(() => {
        getData()
    }, [])

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
            //error?.message && Alert.alert("Error", error?.message)
            // setloading(false)
        })
    }

    return (<Header backgroundColor={COLORS.white} title="offers" titleColor={COLORS.black}>
        <View style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{}}
                contentContainerStyle={{ alignItems: "center" }}
                data={offersList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <ImageBackground source={dummy} style={{ borderWidth: 1, height: HEIGHT * 0.2, width: WIDTH * 0.8, marginBottom: HEIGHT * 0.03, borderRadius: HEIGHT * 0.03, overflow: "hidden", justifyContent: "flex-end" }}>
                    <View style={{ height: HEIGHT * 0.06, borderRadius: HEIGHT * 0.03, backgroundColor: `${COLORS.primary}90`, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: COLORS.white, fontSize: 15, fontWeight: "bold" }}>{`${item.discount}${item.discount_type == "percent" ? " %" : "SR"} Off, Use code "${item.code}"`}</Text>
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
    }
}

const mapDispatchToProps = {
    hideLoader: () => LoadingAction.hideLoader(),
    showLoader: () => LoadingAction.showLoader()
}

export default connect(mapStateToProps, mapDispatchToProps)(OffersScreen)
