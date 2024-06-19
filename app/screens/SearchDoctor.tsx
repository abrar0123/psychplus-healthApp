import React, { useEffect, useState } from "react"
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import { SearchDoctors, Text } from "../components"
import { doctors } from "../utils/doctorsData"
import { colors } from "../theme"
import { AppModel } from "../components/AppModel"

export const SearchDoctor = () => {
  const [searchDoctor, setSerchDoctor] = useState("")
  const [isdisplay, setIsDisplay] = useState<Boolean>(false)

  const [filterdDoctor, setFilteredDoctor] = useState<any>("")

  const filterDoctor = () => {
    const filter = doctors.filter((item) =>
      item.name.toUpperCase().includes(searchDoctor.toUpperCase()),
    )
    setFilteredDoctor(filter)
  }
  const ascendingDoctor = () => {
    const filter = doctors?.sort((a: any, b: any) => {
      if (a && b) {
        return a.fee - b.fee
      }
      return 0
    })
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
          <View style={styles.flexStyle}>
            <Text preset="bold" text={`$${item.fee}`} />
            <Text text={`$${item.category}`} />
          </View>
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
        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsDisplay(true)}>
          <Text
            style={{ ...styles.mainTitle, borderBottomColor: "white", width: "100%" }}
            text="Sort"
            preset="subheading"
          />
        </TouchableOpacity>
      </View>
      <AppModel
        isdisplay={isdisplay}
        ascendingDoctor={ascendingDoctor}
        setIsDisplay={setIsDisplay}
      />
      <FlatList data={filterdDoctor.length > 0 ? filterdDoctor : doctors} renderItem={renderList} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.palette.neutral100,

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
    marginVertical: 4,
    padding: 10,
    borderRadius: 7,
    paddingVertical: 12,
    shadowOpacity: 0.1,
    shadowColor: "grey",
    elevation: 15,
    // borderWidth: 1,
    // borderColor: "gold",
    backgroundColor: colors.blue100,
  },
  flexStyle: {
    display: "flex",
    flexDirection: "row",
    gap: 40,
    marginTop: 7,
    // width: "70%",
    // backgroundColor: "red",
    justifyContent: "space-between",
    alignItems: "center",
  },
})
