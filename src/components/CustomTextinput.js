import React, { useState } from 'react'
import { View, Text, TextInput, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { HEIGHT, COLORS, WIDTH, STYLES } from '../constants'
import { Pressable } from 'react-native'

const CustomTextinput = (props) => {
  const { image, placeholder, onChangeText, style, lang, secureEntry = false, secureEntryIcon, placeholderTextColor = COLORS.white, textColor = COLORS.white } = props
  const [secureTextEntry, setSecureTextEntry] = useState(secureEntry)

  return (
    <View
      style={[
        {
          borderWidth: 2,
          height: HEIGHT * 0.076,
          alignSelf: 'stretch',
          borderRadius: HEIGHT * 0.038,
          borderColor: COLORS.textInputBorder,
          backgroundColor: COLORS.textInputBackground,
          alignItems: 'center',
        },
        { ...style },
        STYLES.flexDirection(lang),
      ]}>
      <Image
        style={{ marginHorizontal: WIDTH * 0.05 }}
        source={image}
        resizeMode="contain"
      />
      <TextInput
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={[
          { flex: 1, fontSize: 19, color: textColor },
          STYLES.textAlign(lang),
        ]}
      />
      {secureEntry && <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
        <Image
          style={{ marginHorizontal: WIDTH * 0.05 }}
          source={secureEntryIcon}
          resizeMode="contain"
        /></Pressable>}
    </View>
  )
}

CustomTextinput.contextTypes = {
  t: PropTypes.func,
}
const mapStateToProps = ({ i18nState }) => {
  return {
    lang: i18nState.lang,
  }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTextinput)
