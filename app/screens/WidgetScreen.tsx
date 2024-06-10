import React from "react"
import { Text } from "../components"
import { StyleSheet, View } from "react-native"
import { FlexWidget, TextWidget, WidgetPreview } from "react-native-android-widget"
import { HelloWidget } from "./HelloWidget"

export const WidgetScreen = () => {
  return (
    <View style={styles.container}>
      <WidgetPreview renderWidget={() => <HelloWidget />} width={320} height={300} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
