import { StyleSheet, View } from "react-native"
import { Button, Text } from "../components"
import { colors } from "../theme"
import { useNavigation } from "@react-navigation/native"

export const PreLogin = () => {
  const navigation = useNavigation()
  return (
    <View style={style.main}>
      <Text style={style.textstyle} text="PsychPlus" preset="heading" />

      <View style={style.mainCont}>
        <Text style={style.textstyle2} text="Peace of Mind is a Plus" preset="heading" />
        <Text
          style={style.textstyle2}
          text="Your journey to wellness starts here"
          preset="subheading"
        />
        <Button
          style={style.btn}
          preset="filled"
          text="Sign In"
          onPress={() => navigation.navigate("Login")}
        />

        <View style={style.second}>
          <Text style={style.textstyle2} text="Don't have an account? " preset="subheading" />
          <Text
            onPress={() => navigation.navigate("Login")}
            style={{ color: colors.palette.accent300, fontWeight: "bold" }}
            text=" sign up"
          />
        </View>
        <Text style={style.textstyle2} text="Privacy Policy | EULA  " preset="subheading" />
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  main: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: colors.blue,
  },
  mainCont: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 120,
    // alignItems: "center",
  },
  second: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  textstyle: {
    alignSelf: "center",
  },
  textstyle2: {
    color: "white",
    alignSelf: "center",
    marginTop: 10,
  },
  btn: {
    borderRadius: 50,
    marginHorizontal: 20,
    marginTop: 40,
    backgroundColor: "white",
    marginBottom: 20,
  },
})
