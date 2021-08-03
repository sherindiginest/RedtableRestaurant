import React from 'react'
import { View, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout, CalloutSubview } from 'react-native-maps';


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

    const getTimeInFormat = time => {
        if (time.includes("AM"))
            time = time.replace(/AM/g, context.t("AM"))

        if (time.includes("PM"))
            time = time.replace(/PM/g, context.t("PM"))

        return time;
    }

    return (
        <View
            style={{
                paddingVertical: HEIGHT * 0.02,
                paddingHorizontal: WIDTH * 0.03,
                // borderColor: "#eee",
                //position: "relative",
            }}
        >
            <View style={{
                width: WIDTH * .7, backgroundColor: colors.white, paddingVertical: HEIGHT * 0.018,
                paddingHorizontal: WIDTH * 0.05, borderRadius: WIDTH * 0.025
            }}>
                <View style={[commonStyle.flexDirection(lang), {
                    height: HEIGHT * 0.055, alignItems: 'center', borderWidth

                }]}>
                    <View style={{
                        width: WIDTH * 0.15, height: HEIGHT * 0.1, borderRadius: WIDTH * 0.025, marginBottom: WIDTH * 0.05,
                        shadowColor: colors.shadowColor, shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.4, shadowRadius: 3.5, elevation: 3,
                    }}>
                        <View style={{
                            width: WIDTH * 0.17, height: HEIGHT * 0.082, borderRadius: WIDTH * 0.025, overflow: "hidden", elevation: 3,
                        }}>
                            {Platform.OS == "android" ? <WebView source={{ uri: item.media }} style={{ flex: 0, width: WIDTH * 0.17, height: HEIGHT * 0.077, }} />
                                : <Image source={{ uri: item.media }} resizeMode={"cover"} style={{
                                    width: WIDTH * 0.17, height: HEIGHT * 0.08, borderRadius: WIDTH * 0.025,
                                }} />}
                        </View>
                    </View>
                    <View style={{ marginBottom: HEIGHT * 0.03, paddingHorizontal: WIDTH * 0.025, paddingTop: HEIGHT * 0.02 }}>
                        <View style={[commonStyle.flexDirection(lang), { marginHorizontal: WIDTH * 0.04, alignItems: 'center', paddingBottom: WIDTH * 0.03, }]}>
                            {Platform.OS == "android" ? <View style={{ width: WIDTH * 0.035, height: WIDTH * 0.035, }}>
                                <WebView source={{ uri: "http://salik.ml/api/icons/location_arrow.png" }} style={{ flex: 0, width: WIDTH * 0.035, height: WIDTH * 0.035, }} />
                            </View>
                                : <Image source={mapLocationIcon} resizeMode={"cover"} style={{ paddingHorizontal: WIDTH * 0.01, transform: [{ scaleX: lang == "ar" ? -1 : 1 }] }} />}
                            <Text style={[commonStyle.font12, commonStyle.fontBold(), { color: colors.headingText, paddingHorizontal: WIDTH * 0.02 }]}>{liveLocation && distance(liveLocation.latitude, liveLocation.longitude, item.latitude, item.longitude)}</Text>
                        </View>
                        <View style={[commonStyle.flexDirection(lang), { marginHorizontal: WIDTH * 0.04, alignItems: 'center' }]}>
                            {Platform.OS == "android" ? <View style={{ width: WIDTH * 0.036, height: WIDTH * 0.036, }}>
                                <WebView source={{ uri: "http://salik.ml/api/icons/clock.png" }} style={{ flex: 0, width: WIDTH * 0.036, height: WIDTH * 0.036, }} />
                            </View>
                                : <Image source={clockIcon} resizeMode={"cover"} style={{ paddingHorizontal: WIDTH * 0.01, transform: [{ scaleX: lang == "ar" ? -1 : 1 }] }} />}
                            <Text style={[commonStyle.font12, commonStyle.fontMedium(), { color: colors.subHeadingText, paddingHorizontal: WIDTH * 0.02 }]}>{`${getTimeInFormat(item.opening_time)}  ${getTimeInFormat(item.closing_time)}`}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ paddingTop: HEIGHT * 0.007, }}>
                    <Text style={[commonStyle.font18, commonStyle.textAlign(lang), commonStyle.fontBold(), { color: colors.headingText }]}>{item[`name_${lang}`]}</Text>
                    <Text style={[commonStyle.font12, commonStyle.textAlign(lang), commonStyle.fontMedium(), { color: colors.subHeadingText, paddingTop: HEIGHT * 0.006 }]}>{`${item[`location_${lang}`]}, ${item[`area_${lang}`]}, ${item[`city_${lang}`]}`} </Text>
                </View>
            </View>
            <View style={{ height: WIDTH * 0.02, width: WIDTH * 0.02, marginTop: -WIDTH * 0.012, alignSelf: "center", transform: [{ rotate: "45deg", }], backgroundColor: colors.white }} />
        </View >

    );
}


const SetLocationScreen = () => {
    return (
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
            /* 
            region={!_.isEmpty(region) ? {
                latitude: Number(region.latitude),
                longitude: Number(region.longitude),
                latitudeDelta: 1, longitudeDelta: 1
            } : {
                    latitude: liveLocation.latitude,
                    longitude: liveLocation.longitude,
                    latitudeDelta: 1, longitudeDelta: 1
                }} */
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
                {/* {branchList.length > 0 && branchList.map((item, index) => {
                        return (<Marker
                            //style={{ borderWidth: 1, }}
                            key={index}
                            coordinate={{
                                latitude: Number(item.latitude),
                                longitude: Number(item.longitude)
                            }}
                            calloutAnchor={{
                                x: 0.5,
                                y: 0.4,
                            }}
                            ref={refs => markerRef[item.id] = refs}
                            image={selected && selected.id == item.id ? ActiveBranch : locationRedDot}
                            onPress={() => { setSelected(item), setRegion(item) }}
                        >
                            <MapView.Callout
                                tooltip={true} >
                                {/* <CustomMarker item={item} lang={lang} liveLocation={liveLocation} distanceUnit={context.t("Km")} context={context} /> 
                            </MapView.Callout>
                        </Marker>)
                    })} */}
                <MapView.Callout
                    tooltip={true} >
                    <CustomMarker item={item} lang={lang} liveLocation={liveLocation} distanceUnit={context.t("Km")} context={context} />
                </MapView.Callout>
            </MapView>
        </View>
    )
}

export default SetLocationScreen
