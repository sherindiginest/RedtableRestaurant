import React, { useState } from 'react'
import { View, Text, FlatList, Image, Modal, Pressable, ImageBackground } from 'react-native'
import { dummy, close } from '../../assets/images'
import { Header } from '../components'
import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants'

const data = [{
    name: "ORDER #105",
    order: "1 x Sambal Shrimp",
    status: "Processing",
    time: "6:30 pm",
    image: dummy
},
{
    name: "ORDER #202",
    order: "5 x Chicken Chilly",
    status: "Completed",
    time: "Yesterday",
    image: dummy
}
]

const RenderItem = (props) => {
    const { item } = props

    const [visible, setVisible] = useState(false)
    return (<>
        <Pressable onPress={() => setVisible(true)}>
            <View style={{ height: HEIGHT * 0.13, flexDirection: "row", alignItems: "center" }}>
                <Image source={item.image} resizeMode="cover" style={{ width: WIDTH * 0.25, height: HEIGHT * 0.1, marginHorizontal: WIDTH * 0.03 }} />
                <View style={{ height: HEIGHT * 0.13, flex: 1, justifyContent: "space-evenly", padding: WIDTH * 0.03 }}>
                    <Text style={{ fontSize: 14 }}>
                        {item.name}
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                        {item.order}
                    </Text>
                </View>
                <View style={{ height: HEIGHT * 0.13, justifyContent: "space-evenly", marginHorizontal: WIDTH * 0.03, alignItems: "flex-end" }}>
                    <Text style={{ fontSize: 10 }}>
                        {item.status}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                        {item.time}
                    </Text>
                </View>
            </View>
            <View style={{ borderBottomWidth: 0.5, borderColor: COLORS.borderColor2, marginHorizontal: WIDTH * 0.15 }} />
        </Pressable>
        <Modal animationType="slide" visible={visible}
            onRequestClose={() => setVisible(false)}
            transparent
        >
            <View style={{ flex: 1, backgroundColor: "#00000030", }}>
                <Pressable onPress={() => setVisible(false)} style={{ flex: 1 }}>
                </Pressable>
                <View style={{ backgroundColor: COLORS.white, height: HEIGHT * 0.6, borderTopLeftRadius: WIDTH * 0.05, borderTopRightRadius: WIDTH * 0.05, overflow: "hidden" }}>
                    <ImageBackground style={{ width: WIDTH, height: WIDTH * 0.4, alignItems: "flex-end", justifyContent: "space-between" }} source={dummy} resizeMode="cover">
                        <Pressable style={{ backgroundColor: COLORS.white, margin: WIDTH * 0.03, borderRadius: WIDTH * 0.035 }} onPress={() => setVisible(false)}>
                            <Image style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, margin: WIDTH * 0.015, }} source={close} resizeMode="contain" />
                        </Pressable>

                    </ImageBackground>
                    <Text style={[{ fontSize: 16, textAlign: "center", marginVertical: HEIGHT * 0.02 }]}>
                        {item.name}
                    </Text>
                    <View style={{ marginHorizontal: WIDTH * 0.05, flexDirection: "row" }}>
                        <View style={{ flex: 1, height: HEIGHT * 0.03 }}>
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                                PRODUCT</Text>
                        </View>
                        <View style={{ width: WIDTH * 0.2 }}>
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                                QUANTITY</Text>
                        </View>
                        <View style={{ width: WIDTH * 0.2, alignItems: "flex-end" }}>
                            <Text style={{ color: COLORS.addToCartButton, fontSize: 10, fontWeight: "bold" }}>
                                PRICE</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: WIDTH * 0.05, flexDirection: "row", borderBottomWidth: 0.5, paddingBottom: HEIGHT * 0.015 }}>
                        <View style={{ flex: 1, height: HEIGHT * 0.03 }}>
                            <Text>
                                Sambal Shrimp</Text>
                        </View>
                        <View style={{ width: WIDTH * 0.2, alignItems: "center" }}>
                            <Text style={{}}>
                                1</Text>
                        </View>
                        <View style={{ width: WIDTH * 0.2, alignItems: "flex-end" }}>
                            <Text>
                                50 QAR</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: WIDTH * 0.05, borderBottomWidth: 0.5, paddingVertical: HEIGHT * 0.015, flexDirection: "row", }}>
                        <View style={{ flex: 1 }}>
                            <Text>Item Total</Text>
                            <Text>Discount</Text>
                            <Text>Delivery Fee</Text>
                        </View>
                        <View style={{ width: WIDTH * 0.2, alignItems: "flex-end" }}>
                            <Text>50 QAR</Text>
                            <Text>50 QAR</Text>
                            <Text>50 QAR</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02 }}>
                        <Text>
                            Total Bill
                        </Text>
                        <Text>
                            45SR
                        </Text>
                    </View>
                    <Pressable style={{ marginHorizontal: WIDTH * 0.05, height: HEIGHT * 0.07, backgroundColor: COLORS.addToCartButton, marginBottom: HEIGHT * 0.01, borderRadius: HEIGHT * 0.035, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                            Add To Order
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    </>
    )
}
const MyOrdersScreen = () => {
    return (
        <Header
            title="My Orders"
            titleColor={COLORS.black}
        >
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <RenderItem item={item} />}
            />

        </Header>
    )
}

export default MyOrdersScreen
