import React, { useState } from 'react'
import { View, Text, TextInput, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { HEIGHT, COLORS, WIDTH, STYLES } from '../constants'
import { Pressable } from 'react-native'

const CustomTextinput = (props) => {
  const { image, placeholder, onChangeText, style, lang, secureEntry = false, secureEntryIcon, placeholderTextColor = COLORS.white, textColor = COLORS.white, keyboardType = "default", returnKeyType = "done", currentRef, nextRef = null, onSubmitAction, error, errorTextColor = COLORS.white, maxLength = 50, outerStyle, value, editable = true, tintColor } = props
  const [secureTextEntry, setSecureTextEntry] = useState(secureEntry)

  return (<View style={[{ alignSelf: "stretch" }, outerStyle]}>
    <View style={[{
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
        style={[{ marginHorizontal: WIDTH * 0.05, }, tintColor && { tintColor }]}
        source={image}
        resizeMode="contain"
      />
      <TextInput
        editable={editable}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={[{ fontSize: 15, color: textColor, flex: 1 }, STYLES.textAlign(lang),]}
        keyboardType={keyboardType}
        autoCapitalize="none"
        returnKeyType={returnKeyType}
        ref={currentRef}
        onSubmitEditing={() => {
          nextRef?.current != null ? nextRef.current.focus() : onSubmitAction && onSubmitAction()
        }}
        maxLength={maxLength}
        value={value}
      />
      {secureEntry && <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
        <Image
          style={{ marginHorizontal: WIDTH * 0.05 }}
          source={secureEntryIcon}
          resizeMode="contain"
        /></Pressable>}
    </View>
    {error && <Text style={{ textAlign: lang == "ar" ? "right" : "left", fontSize: 12, color: errorTextColor, marginHorizontal: WIDTH * 0.1 }}>{error}</Text>}
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
