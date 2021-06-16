import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, has } from "lodash"
import { COLORS } from '../constants'

const Loader = (props) => {
    const { lang, loading } = props
    return (<Modal visible={loading} transparent style={{ flex: 1 }} animationType="fade">
        <View style={{ flex: 1, backgroundColor: COLORS.textInputBorder, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator color={COLORS.primary} size={50}></ActivityIndicator>
        </View>
    </Modal>)
}

Loader.contextTypes = {
    t: PropTypes.func,
}

const mapStateToProps = ({ i18nState, loadingReducer }) => {
    return {
        lang: i18nState.lang,
        loading: loadingReducer.loading
    }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
