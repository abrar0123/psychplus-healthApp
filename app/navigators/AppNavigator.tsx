import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams, // @demo remove-current-line
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { useStores } from "../models" // @demo remove-current-line
import {
  LoginScreen, // @demo remove-current-line
} from "../screens"
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator" // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { HomeScreen } from "../screens/HomeScreen"
import AnimatedSplash from "react-native-animated-splash-screen"
import { PreLogin } from "../screens/PreLogin"

export type AppStackParamList = {
  Welcome: undefined
  Login: undefined // @demo remove-current-line
  Demo: NavigatorScreenParams<DemoTabParamList> // @demo remove-current-line
  // 🔥 Your screens go here
}

const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "HomeScreen" : "PreLogin"} // @demo remove-current-line
      // initialRouteName={"Home"}
    >
      {isAuthenticated ? (
        <React.Fragment>
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* <Stack.Screen name="Demo" component={DemoNavigator} /> */}
        </React.Fragment>
      ) : (
        <>
          <Stack.Screen name="PreLogin" component={PreLogin} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()
  const [loading, setLoading] = useState(false)
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))
  const welcomeFace = require("../../assets/images/onboarding.png")

  useEffect(() => {
    const ss = setTimeout(() => {
      setLoading(true)
    }, 2000)
    return () => ss
  }, [])

  return (
    <AnimatedSplash
      isLoaded={loading}
      translucent={true}
      logoImage={welcomeFace}
      backgroundColor={"white"}
      logoWidth={300}
      logoHeight={300}
    >
      <NavigationContainer
        ref={navigationRef}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        {/* {...props} */}
        <AppStack />
      </NavigationContainer>
    </AnimatedSplash>
  )
})
