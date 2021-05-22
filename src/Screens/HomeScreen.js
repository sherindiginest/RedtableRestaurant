import React from 'react'
import { View, Text, FlatList, Image, ScrollView, ImageBackground } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { dummy, search, filter } from '../../assets/images'
import { COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { Header, RestaurantComponent, CustomTextInput, ProductComponent } from "./../components"

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

const HomeScreen = (props) => {
    const { lang } = props

    return (
        <Header
            backgroundColor={"#FFFFFF70"}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ height: HEIGHT * 0.235, marginTop: HEIGHT * 0.02, }}>
                    <FlatList
                        horizontal
                        inverted={lang == "ar"}
                        data={newItems}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <RestaurantComponent item={item} />}
                    />
                </View>
                <View style={{ backgroundColor: `${COLORS.statusbar}50`, flex: 1 }}>
                    <View style={[{ height: HEIGHT * 0.07, borderRadius: HEIGHT * 0.035, marginTop: -HEIGHT * 0.035, backgroundColor: COLORS.white, borderColor: COLORS.borderColor1, alignItems: "center", borderWidth: 1 }, STYLES.flexDirection(lang)]}>
                        {/*  <Image style={{}} source={search} resizeMode="contain" /> */}
                        <CustomTextInput style={{ flex: 1, height: HEIGHT * 0.07, borderWidth: 0, }}
                            placeholder="Search"
                            image={search}
                            placeholderTextColor={COLORS.placeHolderColor}
                            textColor={COLORS.black}
                        />
                        <Image style={{ marginHorizontal: WIDTH * 0.05, }} source={filter} resizeMode="contain" />
                    </View>
                    <View style={{ height: HEIGHT * 0.2, justifyContent: "space-evenly" }}>
                        <Text style={[{ color: COLORS.white, marginHorizontal: WIDTH * 0.05, marginVertical: WIDTH * 0.025, }, STYLES.textAlign(lang)]}>Meals</Text>
                        <FlatList
                            horizontal
                            inverted={lang == "ar"}
                            showsHorizontalScrollIndicator={false}
                            style={{ marginHorizontal: WIDTH * 0.05, }}
                            data={newItems}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => <ProductComponent item={item} meals />}
                        />
                    </View>
                    <View style={{ height: HEIGHT * 0.27, justifyContent: "space-evenly" }}>
                        <Text style={[{ color: COLORS.white, marginHorizontal: WIDTH * 0.05, marginVertical: WIDTH * 0.025, }, STYLES.textAlign(lang)]}>Our Restaurants</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            inverted={lang == "ar"}
                            style={{}}
                            data={newItems}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => <RestaurantComponent item={item} />}
                        />
                    </View>
                    <View style={{
                        marginBottom: HEIGHT * 0.09
                    }}>
                        <Text style={[{
                            color: COLORS.white, marginHorizontal: WIDTH * 0.05,
                        }, STYLES.textAlign(lang)]}>Categories</Text>
                        <FlatList
                            scrollEnabled={false}

                            style={{}}
                            numColumns={3}
                            data={[...newItems, ...newItems]}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (<View style={{ height: WIDTH * 0.3, width: WIDTH * 0.3, marginLeft: WIDTH * 0.03, borderRadius: WIDTH * 0.05, overflow: "hidden", marginTop: WIDTH * 0.03 }}>
                                    <ImageBackground source={dummy} style={{ flex: 1, padding: WIDTH * 0.02, justifyContent: "center" }} resizeMode="cover">
                                        <Text style={{ color: COLORS.white, marginHorizontal: WIDTH * 0.05, marginVertical: WIDTH * 0.025, }}>Our Restaurants</Text>
                                    </ImageBackground>
                                </View>)
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </Header>
    )
}

HomeScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState }) => {
    return {
        lang: i18nState.lang,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
