import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "../components"
import { colors } from "../theme"
import { useState } from "react"

export const HomeScreen = () => {
  const [mindex, setIndex] = useState(0)

  const dataHor = [
    {
      id: 100,
      title: "Doctors",
      name: "One drive hospital",
    },
    {
      id: 200,
      title: "Cardiologist",
      name: "AKG hospital",
    },
    {
      id: 300,
      title: "Neurologist",
      name: "two ne hospital",
    },
    {
      id: 400,
      title: "Orhologist",
      name: "One hospital",
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
        activeOpacity={0.8}
        style={{
          margin: 10,
          width: "48%",
          height: 200,
          borderRadius: 5,
          backgroundColor: colors.palette.neutral200,
          paddingBottom: 7,
          marginBottom: 20,
        }}
        onPress={() => setIndex(index)}
      >
        <Text text={item?.title} />
        <Text text={item?.name} />
      </TouchableOpacity>
    )
  }
  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.container1}>
          <Text style={styles.text1} text="Home screen" preset="heading" />
        </View>
        <Text style={styles.mainTitle} text="Doctor's Speciality" preset="subheading" />

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dataHor}
          renderItem={renderHor}
        />
        <Text style={styles.mainTitle} text="Premium Hostpitals" preset="subheading" />

        <FlatList data={dataHor} renderItem={renderVert} numColumns={2} />
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
  },
  container1: {
    height: 200,
    backgroundColor: colors.blue,
    borderRadius: 15,
  },
  text1: {
    color: "white",
    textAlign: "center",
    paddingTop: 10,
  },
  mainTitle: {
    paddingTop: 10,
    borderBottomColor: colors.blue,
    borderBottomWidth: 2,
    width: "48%",
    paddingBottom: 7,
    marginBottom: 12,
  },
})
