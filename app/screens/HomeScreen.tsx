import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "../components"
import { colors } from "../theme"
import { useMemo, useState } from "react"
import { Calendar, LocaleConfig } from "react-native-calendars"
import { AppModel } from "../components/AppModel"
import { useNavigation } from "@react-navigation/native"
import { FlexWidget, TextWidget } from "react-native-android-widget"
import { WidgetPreview } from "react-native-android-widget"

export const HomeScreen = () => {
  const [mindex, setIndex] = useState(0)
  const [selected, setSelected] = useState("")
  const [isdisplay, setIsDisplay] = useState(false)
  const navigation = useNavigation()

  const dataHor = [
    {
      id: 100,
      title: "Doctors",
      name: "One drive hospital",
      img: require("../../assets/images/hotel1.jpeg"),
    },
    {
      id: 200,
      title: "Cardiologist",
      name: "AKG hospital",
      img: require("../../assets/images/hotel2.webp"),
    },
    {
      id: 300,
      title: "Neurologist",
      name: "two ne hospital",
      img: require("../../assets/images/hotel3.jpg"),
    },
    {
      id: 400,
      title: "Orhologist",
      name: "One hospital",
      img: require("../../assets/images/hotel4.jpg"),
    },
  ]

  const renderHor = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          margin: 10,

          paddingBottom: 7,
          borderBottomColor: index == mindex ? "red" : "white",
          borderBottomWidth: 2,
          marginBottom: 20,
        }}
        onPress={() => setIndex(index)}
      >
        <Text text={item?.title} />
      </TouchableOpacity>
    )
  }

  const renderVert = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPressIn={() => navigation.navigate("Appointment")}
        activeOpacity={0.8}
        style={{
          margin: 10,
          width: "45%",
          height: 200,
          borderRadius: 8,
          // backgroundColor: colors.palette.neutral200,
          padding: 7,
          marginBottom: 20,
        }}
        onPress={() => setIndex(index)}
      >
        <Image
          source={item.img}
          style={{ height: 150, width: "100%", borderRadius: 10 }}
          resizeMode="contain"
        />
        <Text style={{ marginTop: 10 }} text={item?.title} />
        <Text text={item?.name} />
      </TouchableOpacity>
    )
  }
  // console.log(" this is calender : ", selected)

  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: "orange",
        marked: true,
        selectedTextColor: "yellow",
        dotColor: "white",
      },
      "2024-05-01": { selected: true, marked: true, selectedColor: "blue" },
    }),
    [selected],
  )
  return (
    <ScrollView>
      <View style={styles.main}>
        {/*  **************** Use For Booking Appointment ****************   */}

        <View style={styles.container1}>
          <Text style={styles.text1} text="Home screen" preset="heading" />
        </View>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.mainTitle} text="Doctor's Speciality" preset="subheading" />
          <Text
            style={{ ...styles.mainTitle, borderBottomColor: "white", width: "17%" }}
            text="See All"
            preset="subheading"
          />
        </View>
        <AppModel isdisplay={isdisplay} setIsDisplay={setIsDisplay} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dataHor}
          renderItem={renderHor}
        />
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.mainTitle} text="Premium Hostpitals" preset="subheading" />
          <Text
            style={{ ...styles.mainTitle, borderBottomColor: "white", width: "17%" }}
            text="See All"
            preset="subheading"
          />
        </View>
        <FlatList data={dataHor} renderItem={renderVert} numColumns={2} />
        <View style={styles.container}>
          {/* <WidgetPreview renderWidget={() => <HelloWidget />} width={320} height={200} /> */}
        </View>
        {/* p1 */}
        <FlexWidget
          style={{
            height: "match_parent",
            width: "match_parent",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 16,
          }}
        >
          <TextWidget
            text="Hello"
            style={{
              fontSize: 32,
              fontFamily: "Inter",
              color: "#000000",
            }}
          />
        </FlexWidget>
        {/* <View style={styles.container1}>
          <Text style={styles.text1} text="Home screen test" preset="heading" />
        </View> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    paddingTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    height: 200,
    backgroundColor: colors.blue,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  text1: {
    color: "white",
    textAlign: "center",
    paddingTop: 40,
  },
  mainTitle: {
    paddingTop: 10,
    // borderBottomColor: colors.blue,
    // borderBottomWidth: 2,
    width: "48%",
    paddingBottom: 7,
    marginBottom: 12,
  },
})
