import { ImageBackground, Modal, StyleSheet, View, Switch } from "react-native"
import { Text } from "./Text"
import { colors } from "../theme"
import { Calendar } from "react-native-calendars"
import { useEffect, useState } from "react"
import { Button } from "./Button"

export const AppModel = (props) => {
  const { isdisplay, setIsDisplay, ascendingDoctor } = props
  const [ascending, setAscending] = useState(false)

  useEffect(() => {
    if (ascending) {
      ascendingDoctor()
    }
  }, [ascending])
  return (
    <Modal
      animationType="slide"
      visible={isdisplay}
      onRequestClose={() => setIsDisplay(false)}
      transparent={true}
    >
      <View style={styles.main}>
        <View style={styles.second}>
          <ImageBackground
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
              paddingTop: "6%",
              height: "90%",
              width: "100%",
              borderRadius: 20,
            }}
            resizeMode="cover"
            source={require("../../assets/images/hotel4.jpg")}
          >
            <Text text="Select one to Sorts " preset="subheading" style={{ color: "white" }} />
            <View style={{ flexDirection: "row" }}>
              <Text text="Ascending " style={{ color: "white" }} />
              <Switch
                // ={"red"}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={ascending ? colors.blue : colors.blue100}
                value={ascending}
                onValueChange={() => {
                  setAscending(!ascending)
                }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text text="Low - High" style={{ color: "white" }} />
              <Switch thumbColor={"red"} value={true} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text text="High - low" style={{ color: "white" }} />
              <Switch thumbColor={"red"} value={true} />
            </View>
            <Button
              preset="filled"
              text="Close a Model"
              style={{ width: "70%", marginTop: 15 }}
              onPress={() => setIsDisplay(false)}
            />

            {/* <Calendar
              initialDate="2024-05-10"
              minDate="2024-01-01"
              maxDate="2024-10-10"
              // showSixWeeks={true}
              // style={{ backgroundColor: "pink" }}
              showWeekNumbers={true}
              onDayPress={(day) => {
                // setSelected(day.dateString)
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
              //   markedDates={marked}
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
            /> */}
          </ImageBackground>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  second: {
    height: 350,
    padding: 10,
    width: "90%",

    // backgroundColor: colors.blue200,
    borderRadius: 20,
  },
})
