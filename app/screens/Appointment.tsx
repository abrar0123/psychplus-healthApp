import { FlatList, Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "../components"
import { useState } from "react"
import { colors } from "../theme"

export const Appointment = () => {
  const date = new Date()
  const [mindex, setIndex] = useState(0)

  const dataHor = [
    {
      id: 100,
      title: "Tue 07",
      name: "One drive hospital",
      img: require("../../assets/images/hotel1.jpeg"),
    },
    {
      id: 200,
      title: "Wed 08",
      name: "AKG hospital",
      img: require("../../assets/images/hotel2.webp"),
    },
    {
      id: 300,
      title: "Thurs 08",
      name: "two ne hospital",
      img: require("../../assets/images/hotel3.jpg"),
    },
    {
      id: 400,
      title: "Sat 10",
      name: "One hospital",
      img: require("../../assets/images/hotel4.jpg"),
    },
    {
      id: 400,
      title: "Sun 11",
      name: "One hospital",
      img: require("../../assets/images/hotel4.jpg"),
    },
    {
      id: 400,
      title: "Mon 12",
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
          padding: 8,
          borderRadius: 3,
          backgroundColor: index == mindex ? colors.blue200 : "white",
          marginBottom: 20,
        }}
        onPress={() => setIndex(index)}
      >
        <Text text={item?.title} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.main}>
      <Text text="Book Appointmet " preset="heading" />

      <View
        style={{
          display: "flex",
          marginTop: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.mainTitle} text="Select Date" preset="subheading" />
        <Text
          style={{ ...styles.mainTitle, borderBottomColor: "white" }}
          text={` ${date.getMonth() + 1} - ${date.getFullYear()} `}
          preset="subheading"
        />
      </View>
      <FlatList
        style={{ maxHeight: 80 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dataHor}
        renderItem={renderHor}
      />
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 300,
          marginTop: 30,
          backgroundColor: colors.palette.neutral200,
        }}
      >
        <Text text="No Data Founded" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    paddingHorizontal: 15,
  },
  mainTitle: {
    paddingTop: 10,
    // borderBottomColor: colors.blue,
    // borderBottomWidth: 2,
    paddingBottom: 7,
    marginBottom: 12,
  },
})
