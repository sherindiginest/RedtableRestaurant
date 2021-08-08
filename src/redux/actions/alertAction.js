import { SHOWALERT } from '../../constants/constants'


const handleAlert = (obj = {}) => {
    return dispatch => {
        dispatch({
            type: SHOWALERT, payload: obj
        })
    }
}



export default { handleAlert }

