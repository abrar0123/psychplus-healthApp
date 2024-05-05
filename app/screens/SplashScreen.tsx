import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button, // @demo remove-current-line
  Text,
} from "../components"
import { useStores } from "../models" // @demo remove-current-line
import { AppNavigator, AppStackScreenProps, useNavigationPersistence } from "../navigators" // @demo remove-current-line
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import AnimatedSplash from "react-native-animated-splash-screen"
import { NAVIGATION_PERSISTENCE_KEY } from "../app"
import * as storage from "../utils/storage"

const welcomeFace = require("../../assets/images/onboarding.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {} // @demo remove-current-line

export const SplashScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const {
    authenticationStore: { logout },
  } = useStores()
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [loading, setLoading] = useState(false)

  useHeader({
    rightText: "",
    onRightPress: logout,
  })
  // @demo remove-block-end

  useEffect(() => {
    const ss = setTimeout(() => {
      console.log(" this is timout ")
      setLoading(true)
      // navigation.navigate("Demo", { screen: "DemoShowroom" })
    }, 1500)
    return () => ss
  }, [])

  console.log("loading ", loading)
  const isAuth = true
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <>
      {/* <AnimatedSplash
        isLoading={loading}
        logoImage={welcomeFace}
        backgroundColor={"white"}
        logoWidth={300}
        logoHeight={300}
      > */}
      <AppNavigator />
      {/* <View style={$container}>
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          text="Welcome here ! "
          preset="heading"
        />
        <Text text="(ohh, this is exciting!)" preset="subheading" />
        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
      </View> */}
      {/* </AnimatedSplash> */}
    </>
  )
})

const $container: ViewStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.background,
  paddingHorizontal: 20,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
}

const $welcomeFace: ImageStyle = {
  height: 400,
  // backgroundColor: "red",
  // width: 400,
  // position: "absolute",
  // bottom: -47,
  // right: -80,
  // transform: [{ scaleX: 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
