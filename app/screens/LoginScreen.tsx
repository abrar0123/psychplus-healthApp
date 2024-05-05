import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: {
      authEmail,
      authPassword,
      setAuthEmail,
      setAuthPassword,
      setAuthToken,
      validationErrors,
    },
  } = useStores()

  useEffect(() => {
    setAuthEmail("abc@gmail.com")
    setAuthPassword("ign1teIsAwes0m3")
  }, [])

  const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (Object.values(validationErrors).some((v) => !!v)) {
      return
    }

    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            size={20}
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  useEffect(() => {
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" text="Psych Plus" preset="heading" style={$signIn} />
      <Text testID="login-heading" text="Sign In" preset="heading" style={$signIn} />
      <Text
        text="Hi! Welcome bacpk, you've been missed"
        preset="subheading"
        style={$enterDetails}
      />
      {attemptsCount > 2 && (
        <Text
          text="Hint: you can use any email address and your favorite password :)"
          size="sm"
          weight="light"
          style={$hint}
        />
      )}
      <TextField
        // value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        label="Email"
        placeholder={authEmail}
        helper={errors?.authEmail}
        status={errors?.authEmail ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />
      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        label="Password"
        placeholder="Super secret password here"
        helper={errors?.authPassword}
        status={errors?.authPassword ? "error" : undefined}
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />
      <Text style={{ color: colors.blue, textAlign: "right" }} text="Forgot Password? " />
      <Button
        testID="login-button"
        text="Sign In"
        style={$tapButton}
        preset="reversed"
        onPress={login}
      />
      <View style={$second}>
        <Text style={{}} text="Don't have an account? " preset="subheading" />
        <Text style={{ color: colors.palette.accent300, fontWeight: "bold" }} text="  sign up" />
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
  backgroundColor: "white",
  flex: 1,
  // alignItems: "center",
}

const $signIn: TextStyle = {
  marginBottom: spacing.small,
  alignSelf: "center",
}
const $second: ViewStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.large,
  color: colors.gray,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.medium,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
  marginTop: 10,
}

const $tapButton: ViewStyle = {
  // marginTop: spacing.large,
  borderRadius: 30,
  marginVertical: 50,
  backgroundColor: colors.blue,
}

// @demo remove-file
