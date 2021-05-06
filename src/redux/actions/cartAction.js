import AsyncStorage from "@react-native-community/async-storage";

import { CART_LIST } from "./../../constants/constants"
import { url, urlEndPoints } from "./../../http/apiConfig"
import { networkApi } from "./../../http/api"


const getCartList = () => {
    const apiUrl = `${url.baseUrl}${urlEndPoints.carts}`
    return async dispatch => {
        const accessToken = await AsyncStorage.getItem("access_token")
        if (accessToken) {
            const header = {
                Authorization: `Bearer ${accessToken}`
            }
            const response = await networkApi(apiUrl, "GET", null, header)
            dispatch({
                type: CART_LIST,
                payload: response.response.result.data.items,
                branchId: response.response.result.data.branch_id,
                serviceFee: response.response.result.data.service_fee,
            })
        }
    }

}


export default {
    getCartList
}