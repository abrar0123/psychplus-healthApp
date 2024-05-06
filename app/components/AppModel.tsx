import { Modal, StyleSheet, View } from "react-native"
import { Text } from "./Text"
import { colors } from "../theme"
import { Calendar } from "react-native-calendars"
import { useState } from "react"

export const AppModel = (props) => {
  const { isdisplay, setIsDisplay } = props
  return (
    <Modal
      animationType="slide"
      visible={isdisplay}
      onRequestClose={() => setIsDisplay(false)}
      transparent={true}
    >
      <View style={styles.main}>
        <View style={styles.second}>
          <View>
            <Text text="Model Cntainer" preset="subheading" />
            <Calendar
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
            />
          </View>
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
    height: 380,
    padding: 10,
    width: "85%",
    backgroundColor: colors.palette.secondary100,
    borderRadius: 10,
  },
})
