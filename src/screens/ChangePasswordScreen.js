import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { isEmpty, has } from "lodash"

import { backarrow, dummy, eye, password } from '../../assets/images'
import { CustomButton, CustomTextInput, Header, RestaurantComponent } from '../components'
import { API, Axios, COLORS, HEIGHT, STYLES, WIDTH } from '../constants'
import { AlertAction } from '../redux/actions'

const ChangePasswordScreen = (props, context) => {
    const { route, navigation, lang, userData } = props
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({})
    const [loading, setloading] = useState(false)
    const refList = { new_password: useRef(null), confirm_password: useRef(null) }

    const setData = (field, value) => {
        form[field] = value
        setForm({ ...form })
    }

    const handleReset = async () => {
        const { api_token, id } = userData
        const data = { api_token, old_password: form.current_password, password: form.new_password }
        if (validate()) {
            setloading(true)
            await Axios.post(API.passwordReset, data).then(async (response) => {
                if (has(response, "success") && response.success) {
                    dispatch(AlertAction.handleAlert({
                        visible: true,
                        title: "Success",
                        message: response.message,
                        buttons: [{
                            title: "Okay",
                            onPress: () => {
                                dispatch(AlertAction.handleAlert({ visible: false, }))
                                navigation.goBack()
                            }
                        }]
                    }))
                }
                console.log(response);
                setloading(false)
            }).catch((error) => {
                console.log(error);
                dispatch(AlertAction.handleAlert({
                    visible: true,
                    title: "Error",
                    message: error?.message,
                    buttons: [{
                        title: "Okay",
                        onPress: () => {
                            dispatch(AlertAction.handleAlert({ visible: false, }))
                        }
                    }]
                }))
                setloading(false)
            })
        }
    }

    const validate = () => {
        const { current_password, new_password, confirm_password } = form
        const error = {}
        if (isEmpty(current_password)) {
            error.current_password = "Please enter the current password"
        }
        if (isEmpty(new_password)) {
            error.new_password = "Please enter the new password"
        }
        if (isEmpty(confirm_password)) {
            error.confirm_password = "Please enter the confirm password"
        }
        if (new_password != confirm_password) {
            error.confirm_password = "Passwords are mismatch"
        }
        setErrors({ ...error })
        return isEmpty(error)
    }

    return (<Header
        titleColor={COLORS.black}
        title="change_password"
    >
        <View style={{ flex: 1, paddingHorizontal: WIDTH * 0.05 }}>
            <View style={{ height: HEIGHT * 0.35, }}>
                <CustomTextInput
                    image={password}
                    placeholder={"Current Password"}
                    secureEntry
                    secureEntryIcon={eye}
                    onChangeText={(text) => setData("current_password", text.trim())}
                    //onSubmitAction={() => handleLogin()}
                    placeholderTextColor={COLORS.placeHolderColor}
                    style={{ borderWidth: 1 }}
                    outerStyle={{ marginBottom: HEIGHT * 0.02 }}
                    tintColor={COLORS.placeHolderColor}
                    textColor={COLORS.black}
                    returnKeyType="next"
                    nextRef={refList.new_password}
                    error={errors?.current_password}
                    errorTextColor={COLORS.primary}
                />
                <CustomTextInput
                    image={password}
                    placeholder={"New Password"}
                    secureEntry
                    secureEntryIcon={eye}
                    onChangeText={(text) => setData("new_password", text.trim())}
                    onSubmitAction={() => handleLogin()}
                    placeholderTextColor={COLORS.placeHolderColor}
                    style={{ borderWidth: 1 }}
                    outerStyle={{ marginBottom: HEIGHT * 0.02 }}
                    tintColor={COLORS.placeHolderColor}
                    textColor={COLORS.black}
                    returnKeyType="next"
                    currentRef={refList.new_password}
                    nextRef={refList.confirm_password}
                    error={errors?.new_password}
                    errorTextColor={COLORS.primary}
                />
                <CustomTextInput
                    image={password}
                    placeholder={"Confirm Password"}
                    secureEntry
                    secureEntryIcon={eye}
                    onChangeText={(text) => setData("confirm_password", text.trim())}
                    onSubmitAction={() => handleReset()}
                    placeholderTextColor={COLORS.placeHolderColor}
                    style={{ borderWidth: 1 }}
                    outerStyle={{ marginBottom: HEIGHT * 0.02 }}
                    tintColor={COLORS.placeHolderColor}
                    textColor={COLORS.black}
                    currentRef={refList.confirm_password}
                    error={errors?.confirm_password}
                    errorTextColor={COLORS.primary}
                />
            </View>
            <View style={{ height: HEIGHT * 0.3, justifyContent: "center", paddingHorizontal: WIDTH * 0.05 }}>
                <CustomButton
                    title={"Update"}
                    onPress={() => {
                        handleReset()
                        //navigation.navigate('OtpScreen');
                    }}
                    loading={loading}
                    style={{ backgroundColor: COLORS.statusbar, height: HEIGHT * 0.06 }}
                />
            </View>
        </View>
    </Header>
    )
}
ChangePasswordScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        userData: ProfileReducer.userData,
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)
