import { setLanguage } from "redux-i18n"

const setLang = (lang) => {
    return async dispatch => {
        dispatch(setLanguage(lang))
    }

}
export default {
    setLang
}