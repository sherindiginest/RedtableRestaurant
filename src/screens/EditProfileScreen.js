import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Image, FlatList, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { isEmpty, has } from "lodash"

import { backarrow, dummy, email, phone, user } from '../../assets/images'
import { Header, RestaurantComponent, CustomTextInput, CustomButton } from '../components'
import { API, Axios, COLORS, HEIGHT, STYLES, validateEmail, validatePhone, WIDTH } from '../constants'
import { AlertAction, profileAction } from '../redux/actions'


const EditProfileScreen = (props, context) => {
    const { route, navigation, lang, userData, setProfileData } = props
    const [form, setForm] = useState({ name: userData.name, email: userData.email, phone: userData.phone })
    const [errors, setErrors] = useState({})
    const [loading, setloading] = useState(false)
    const refList = { email: useRef(null), phone: useRef(null) }
    const dispatch = useDispatch()
    useEffect(() => {
        setForm({ name: userData.name, email: userData.email, phone: userData.phone })
    }, [userData])

    const setData = (field, value) => {
        form[field] = value
        setForm({ ...form })
    }

    const handleLogin = async () => {
        const { api_token, id } = userData
        if (validate()) {
            setloading(true)
            await Axios.post(API.userUpdate(id), { ...form, api_token }).then(async (response) => {
                if (has(response, "success") && response.success) {
                    setProfileData(response.data)
                    dispatch(AlertAction.handleAlert({
                        visible: true,
                        title: "Success",
                        message: "Profile data updated successfully",
                        buttons: [{
                            title: "Okay",
                            onPress: () => {
                                dispatch(AlertAction.handleAlert({ visible: false, }))
                                navigation.goBack()
                            }
                        }]
                    }))
                }
                setloading(false)
            }).catch((error) => {
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
        const { name, email, phone } = form
        const error = {}
        if (isEmpty(name)) {
            error.name = "Please enter the name"
        }
        if (isEmpty(email)) {
            error.email = "Please enter the email id"
        }
        if (!isEmpty(email) && !validateEmail(email)) {
            error.email = "Invalid email id"
        }
        if (isEmpty(phone)) {
            error.phone = "Please enter the phone"
        }
        if (!isEmpty(phone) && !validatePhone(phone)) {
            error.phone = "Invalid phone number"
        }
        setErrors({ ...error })
        console.log(error);
        return isEmpty(error)
    }

    return (<Header
        titleColor={COLORS.black}
        title={"edit_profile"}
    >
        <View style={{ flex: 1, paddingHorizontal: WIDTH * 0.05 }}>
            <CustomTextInput
                outerStyle={{ marginBottom: HEIGHT * 0.02, marginTop: HEIGHT * 0.1 }}
                image={user}
                placeholder={context.t('name')}
                onChangeText={(text) => setData("name", text)}
                returnKeyType="next"
                nextRef={refList.phone}
                error={errors?.name}
                placeholderTextColor={COLORS.title3}
                tintColor={COLORS.black}
                value={form.name}
                textColor={COLORS.title3}
                errorTextColor={COLORS.statusbar}
            />
            <CustomTextInput
                outerStyle={{ marginBottom: HEIGHT * 0.02 }}
                image={email}
                placeholder={context.t('email')}
                onChangeText={(text) => setData("email", text.trim())}
                keyboardType="email-address"
                returnKeyType="next"
                currentRef={refList.email}
                nextRef={refList.phone}
                error={errors?.email}
                placeholderTextColor={COLORS.title3}
                tintColor={COLORS.black}
                value={form.email}
                textColor={COLORS.title3}
                errorTextColor={COLORS.statusbar}
                editable={false}
            />
            <CustomTextInput
                //editable={false}
                outerStyle={{ marginBottom: HEIGHT * 0.04 }}
                image={phone}
                placeholder={context.t('phone_number')}
                onChangeText={(text) => setData("phone", text.trim())}
                keyboardType="number-pad"
                error={errors?.phone}
                returnKeyType="next"
                currentRef={refList.phone}
                onSubmitAction={() => handleLogin()}
                maxLength={10}
                placeholderTextColor={COLORS.title3}
                tintColor={COLORS.black}
                value={form.phone}
                textColor={COLORS.title3}
                errorTextColor={COLORS.statusbar}
            />
            <CustomButton
                onPress={() => handleLogin()}
                title={"Update"}
                style={{
                    marginTop: HEIGHT * 0.02,
                    marginBottom: HEIGHT * 0.03,
                    backgroundColor: COLORS.primary
                }}
                loading={loading}
            />
        </View>

    </Header>
    )
}

EditProfileScreen.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, ProfileReducer }) => {
    return {
        lang: i18nState.lang,
        userData: ProfileReducer.userData
    }
}

const mapDispatchToProps = {
    setProfileData: (userData) => profileAction.setProfileData(userData)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
