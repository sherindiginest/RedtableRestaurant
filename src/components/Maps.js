import React, { useRef, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    PermissionsAndroid,
    Pressable
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const Maps = ({ latitude, longitude, onSelectLocation }) => {

    const map = useRef(null)
    const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

    const fitAllMarkers = () => {
        map.current.fitToCoordinates({ latitude, longitude }, {
            edgePadding: DEFAULT_PADDING,
            animated: true,
        });
    }


    return (
        <View style={styles.container}>
            {latitude && longitude &&
                <MapView
                    ref={map}
                    style={styles.map}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    onPress={onSelectLocation}
                >
                    <Marker identifier={`id`} coordinate={{
                        latitude,
                        longitude
                    }} />
                </MapView>}
            <Text>Latitude: {latitude} </Text>
            <Text>Longitude: {longitude} </Text>
        </View>
    )
}

export default Maps

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: width - 30,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
