import { SHOW_ALERT } from '../../constants/constants'


const handleAlert = (obj = {}) => {
    return dispatch => {
        dispatch({
            type: SHOW_ALERT, payload: obj
        })
    }
}



export default { handleAlert }

