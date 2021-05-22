import { Platform } from "react-native"
import AsyncStorage from "@react-native-community/async-storage";

import { PROFILE_INFO } from "../../constants/constants"
import { url, urlEndPoints } from "../../http/apiConfig"
import { networkApi } from "../../http/api"


const getProfileData = () => {
    return async dispatch => {
        const push_token = await AsyncStorage.getItem("deviceToken")
        const apiUrl = `${url.baseUrl}${urlEndPoints.profile(push_token, Platform.OS == "ios" ? "IOS" : "Android")}`
        const accessToken = await AsyncStorage.getItem("access_token")
        if (accessToken) {
            const header = {
                Authorization: `Bearer ${accessToken}`
            }
            const response = await networkApi(apiUrl, "GET", null, header)
            dispatch({
                type: PROFILE_INFO,
                payload: response.response.result.data
            })
        }
    }

}


export default {
    getProfileData
}