import React, { useEffect, useState } from 'react'
import { View, Text, Platform, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout, CalloutSubview } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { has } from "lodash"
import RenderHtml from 'react-native-render-html';
import WebView from 'react-native-webview';

import { Header } from '../components';
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants';
import { LoadingAction } from '../redux/actions';
import { dummy, location, mappin } from '../../assets/images';
import { Linking } from 'react-native';


const CustomMarker = ({ item, lang, liveLocation, distanceUnit, context }) => {

    const distance = (lat1, lon1, lat2, lon2, unit) => {
        let radlat1 = Math.PI * lat1 / 180
        let radlat2 = Math.PI * lat2 / 180
        let theta = lon1 - lon2
        let radtheta = Math.PI * theta / 180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        dist = (dist * 1.609344).toFixed(2) + ` ${distanceUnit}`
        //if (unit=="M") { dist = dist * 0.8684 }
        return dist
    }

    return (<View>
        <View style={{ width: WIDTH * 0.8, backgroundColor: `${COLORS.statusbar}`, padding: WIDTH * 0.025, borderRadius: WIDTH * 0.025, flexDirection: "row", }}>
            <View style={{ width: WIDTH * 0.2, borderRadius: WIDTH * 0.025, height: HEIGHT * 0.1, overflow: "hidden" }}>
                <WebView source={{ uri: item?.media[0]?.url }} style={{ flex: 0, width: WIDTH * 0.2, height: HEIGHT * 0.1, resizeMode: 'cover', borderRadius: WIDTH * 0.02, }} />
            </View>
            <View style={{ flex: 1, marginLeft: WIDTH * 0.025, padding: WIDTH * 0.025, backgroundColor: COLORS.white, borderRadius: WIDTH * 0.02, justifyContent: "space-evenly" }}>
                <Text numberOfLines={2} style={[STYLES.fontBold(), { fontSize: 13 }]}>{item.name}</Text>
                <Text style={[STYLES.fontRegular(), { fontSize: 13 }]}>{item.address}</Text>
                <RenderHtml contentWidth={WIDTH * 0.4} source={{ html: item?.working_hours }} />
            </View>
        </View>
    </View>);
}

const SetLocationScreen = () => {

    const [restaurantList, setRestaurantList] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        //dispatch(LoadingAction.showLoader())
        await Axios.get(API.restaurants()).then(async (response) => {
            console.log("fewewfe", response.data);
            if (has(response, "success") && response.success) {
                setRestaurantList(response.data)
            }
            dispatch(LoadingAction.hideLoader())
        }).catch((error) => {
            dispatch(LoadingAction.hideLoader())
        })
    }

    return (<Header backgroundColor={COLORS.yellow2} title="Discover">
        <View style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 25.272196398539748,
                    longitude: 51.536846835937,
                    latitudeDelta: 1,
                    longitudeDelta: 1
                }}

                region={{
                    latitude: 26.42291155284332,
                    longitude: 50.113876175770336,
                    latitudeDelta: 1, longitudeDelta: 1
                }}
            /* onUserLocationChange={(loc) => {
                if (liveLocation == null) {
                    const { coordinate } = loc.nativeEvent
                    setLiveLocation(coordinate)
                }
            }} */
            >
                {/* {!_.isEmpty(liveLocation) && <Marker
                        style={{ borderWidth: 0, }}
                        coordinate={{
                            latitude: Number(liveLocation.latitude),
                            longitude: Number(liveLocation.longitude),
                            latitudeDelta: 1, longitudeDelta: 1
                        }}
                    >
                        <Image source={locationPinMap} style={{ width: WIDTH * 0.08, height: WIDTH * 0.1 }} resizeMode="contain" />
                    </Marker>} */}

                {restaurantList.length > 0 && restaurantList.map((item, index) => {
                    console.log(item);
                    return (<Marker key={index}
                        coordinate={{
                            latitude: Number(item.latitude),
                            longitude: Number(item.longitude)
                        }}
                        calloutAnchor={{ x: 0.5, y: 0, }}
                        image={mappin}
                    >
                        <MapView.Callout
                            onPress={() => {
                                Linking.openURL(`geo:0,0?q=${item.latitude},${item.longitude}`)
                            }}
                            tooltip={true} >
                            <CustomMarker item={item} />
                        </MapView.Callout>
                    </Marker>)
                })}
            </MapView>
        </View>
    </Header>
    )
}

export default SetLocationScreen
