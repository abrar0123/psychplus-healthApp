import React, { useEffect, useState } from "react"
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import { SearchDoctors, Text } from "../components"
import { doctors } from "../utils/doctorsData"

export const SearchDoctor = () => {
  const [searchDoctor, setSerchDoctor] = useState("")
  const [filterdDoctor, setFilteredDoctor] = useState<any>("")

  const filterDoctor = () => {
    const filter = doctors.filter((item) =>
      item.name.toUpperCase().includes(searchDoctor.toUpperCase()),
    )
    setFilteredDoctor(filter)
  }
  useEffect(() => {
    filterDoctor()
  }, [searchDoctor])

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
    <View style={styles.main}>
      {/* <Text text="Dotcors1" /> */}
      <SearchDoctors searchDoctor={searchDoctor} setSerchDoctor={setSerchDoctor} />
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
      <FlatList data={filterdDoctor.length > 0 ? filterdDoctor : doctors} renderItem={renderList} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
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
    marginVertical: 3,
    padding: 10,
    borderRadius: 3,
    paddingVertical: 15,
    shadowOpacity: 0.1,
    shadowColor: "grey",
    elevation: 15,
    // borderWidth: 1,
    // borderColor: "gold",

    backgroundColor: "white",
  },
})
