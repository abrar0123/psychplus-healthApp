import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "../components"
import { colors } from "../theme"
import { useMemo, useState } from "react"
import { Calendar, LocaleConfig } from "react-native-calendars"

export const HomeScreen = () => {
  const [mindex, setIndex] = useState(0)
  const [selected, setSelected] = useState("")

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
        onPressIn={() => console.log("do")}
        activeOpacity={0.8}
        style={{
          margin: 10,
          width: "45%",
          height: 200,
          borderRadius: 8,
          backgroundColor: colors.palette.neutral200,
          padding: 7,
          marginBottom: 20,
        }}
        onPress={() => setIndex(index)}
      >
        <Text text={item?.title} />
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
        <Calendar
          initialDate="2024-05-10"
          minDate="2024-01-01"
          maxDate="2024-10-10"
          // showSixWeeks={true}
          // style={{ backgroundColor: "pink" }}
          showWeekNumbers={true}
          onDayPress={(day) => {
            setSelected(day.dateString)
          }}
          disableArrowLeft={true}
          // hideArrows={true}
          firstDay={1}
          // disableArrowRight={true}
          // disableAllTouchEventsForDisabledDays={true}
          current="2024-10-10"
          onPressArrowLeft={(mon) => {
            console.log("onLeft Arrow Pressed : ")
            mon()
          }}
          // onMonthChange={(ee) => console.log("on MonthChange ", ee)}
          markingType="custom"
          markedDates={marked}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#00adf5",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e",
          }}
        />
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
        <View style={styles.container1}>
          <Text style={styles.text1} text="Home screen" preset="heading" />
        </View>
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
