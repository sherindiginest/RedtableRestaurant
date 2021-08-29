import React, { useEffect, useRef } from 'react'
import { View, Text, Modal, Image, FlatList, Pressable, Animated } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { logo } from '../../assets/images'
import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants'

const CustomAlert = () => {
    const AnimatedValue = useRef(new Animated.Value(0)).current
    const alertParams = useSelector(state => state.alertReducer.alertParams)

    useEffect(() => {
        fade(1)
    }, [alertParams])

    const fade = (toValue) => {
        Animated.timing(AnimatedValue, {
            toValue,
            duration: 500,
            useNativeDriver: false
        }).start()
    }

    const backgroundColor = AnimatedValue.interpolate({
        inputRange: [0.1, 0.5],
        outputRange: ["#00000000", "#00000040"],
        extrapolate: "clamp"
    })

    return (<Modal visible={alertParams.visible} transparent animationType="fade">
        <Animated.View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor }}>
            <View style={{ width: WIDTH * 0.9, borderRadius: WIDTH * 0.05, backgroundColor: COLORS.white, elevation: 4 }}>
                <View style={{ height: HEIGHT * 0.06, backgroundColor: COLORS.primary, borderTopRightRadius: WIDTH * 0.05, borderTopLeftRadius: WIDTH * 0.05, alignItems: "center" }}>
                    <Image source={logo} style={{ height: HEIGHT * 0.1, width: WIDTH * 0.2, marginTop: - HEIGHT * 0.04 }} resizeMode="contain" />
                </View>
                <View style={{ alignItems: "center", padding: WIDTH * 0.02 }}>
                    <Text style={[{ fontSize: 18, color: COLORS.title3, marginTop: HEIGHT * 0.02 }, STYLES.fontMedium()]}>
                        {alertParams.title}
                    </Text>
                    <Text style={[{ color: COLORS.title3, fontSize: 15, marginVertical: HEIGHT * 0.02, textAlign: "center" }, STYLES.fontMedium()]}>
                        {alertParams.message}
                    </Text>
                </View>
                <View style={{ height: HEIGHT * 0.07, borderBottomRightRadius: WIDTH * 0.05, borderBottomLeftRadius: WIDTH * 0.05, flexDirection: "row", overflow: "hidden", backgroundColor: `${COLORS.placeHolderColor}30` }}>
                    {
                        alertParams.buttons?.map((item, index) => {
                            return <Pressable key={index} style={{ flex: 1, paddingVertical: HEIGHT * 0.02 }} onPress={item.onPress}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", borderLeftWidth: index != 0 ? 0.5 : 0 }}>
                                    <Text style={[{ color: COLORS.primary, fontSize: 15, }, STYLES.fontMedium()]}>
                                        {item.title}
                                    </Text>
                                </View>

                            </Pressable>
                        })
                    }
                </View>
            </View>
        </Animated.View>
    </Modal >)
}

export default CustomAlert
