import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { SearchDoctors, Text } from "../components"
import { colors } from "../theme"
import { useMemo, useState } from "react"
import { Calendar, LocaleConfig } from "react-native-calendars"
import { AppModel } from "../components/AppModel"
import { useNavigation } from "@react-navigation/native"
import { doctors, myData } from "../utils/doctorsData"

export const HomeScreen = () => {
  const [mindex, setIndex] = useState(0)
  const [selected, setSelected] = useState("")
  const [isdisplay, setIsDisplay] = useState(false)
  const navigation = useNavigation()

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

  const renderList = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.mainView}
        // onPress={handlePress.bind(this, item)}
      >
        <Image
          source={{ uri: item.img }}
          style={{ height: 50, width: 50, borderRadius: 40, marginRight: 15 }}
        />
        <View>
          <Text preset="bold" text={item?.name} />
          <Text text={`random text ${item?.name}`} />
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <ScrollView>
      <View style={styles.main}>
        <SearchDoctors />
        {/*  ******* Use For Booking Appointment **********  */}

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
          data={doctors}
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
        <FlatList data={myData} renderItem={renderVert} numColumns={2} />
        {/* <View style={styles.container1}>
          <Text style={styles.text1} text="Home screen" preset="heading" />
        </View> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.mainTitle} text="Top Therapist" preset="subheading" />
          <Text
            style={{ ...styles.mainTitle, borderBottomColor: "white", width: "17%" }}
            text="See All"
            preset="subheading"
          />
        </View>

        <FlatList data={doctors} renderItem={renderList} />
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
    paddingTop: 15,
    // borderBottomColor: colors.blue,
    // borderBottomWidth: 2,
    width: "48%",
    paddingBottom: 7,
    marginBottom: 12,
  },
  mainView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginVertical: 4,
    padding: 10,
    borderRadius: 3,
    shadowOpacity: 0.1,
    shadowColor: "lightgrey",
    elevation: 15,
    // borderWidth: 1,
    // borderColor: "gold",

    backgroundColor: "white",
  },
})
