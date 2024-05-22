import {
  FlatList,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import { Button, Text } from "../components"
import { useEffect, useState } from "react"
import { colors } from "../theme"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"
import ChatScreen from "./ChatScreen"
import ChatUsers from "./mock/ChatUsers"

const dataHor = [
  {
    id: 100,
    title: "Tue 07",
    name: "akram ali",
    img: require("../../assets/images/hotel1.jpeg"),
  },
  {
    id: 200,
    title: "Wed 08",
    name: "wajid khan",
    img: require("../../assets/images/hotel2.webp"),
  },
  {
    id: 300,
    title: "Thurs 08",
    name: "dola akr",
    img: require("../../assets/images/hotel3.jpg"),
  },
  {
    id: 400,
    title: "Sat 10",
    name: "shafqt",
    img: require("../../assets/images/hotel4.jpg"),
  },
  {
    id: 400,
    title: "Sun 11",
    name: "nope e",
    img: require("../../assets/images/hotel4.jpg"),
  },
  {
    id: 400,
    title: "Mon 12",
    name: "ali ahmed",
    img: require("../../assets/images/hotel4.jpg"),
  },
]

export const Appointment = ({ navigation }) => {
  const date = new Date()
  const [mindex, setIndex] = useState(0)
  const width = useSharedValue(100)
  const [animatedWidth, setAnimatedWidth] = useState(width.value)
  const pressed = useSharedValue<boolean>(false)

  const offset = useSharedValue<number>(0)

  const onLayout = (event: LayoutChangeEvent) => {
    width.value = event.nativeEvent.layout.width
  }

  const pan = Gesture.Pan()
    .onChange((event) => {
      offset.value += event.changeX
    })
    .onFinalize((event) => {
      offset.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [-(width.value / 2) + 100 / 2, width.value / 2 - 100 / 2],
      })
    })

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }))

  // ***************** apply logic of manage navigation button  *****************
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ padding: 8 }} onPress={() => console.log("Button Pressed")}>
          <Text text="Info" style={{ color: "white" }} preset="subheading" />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  const handlePress = (anm) => {
    if (anm === "plus") {
      width.value = width.value + 20
    } else {
      width.value = width.value - 20
    }
    if (width.value > 20) {
      setAnimatedWidth(width.value)
    }
  }

  const renderHor = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          margin: 10,
          padding: 8,
          borderRadius: 3,
          backgroundColor: index == mindex ? colors.blue200 : colors.blue100,
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
        <Text
          style={styles.mainTitle}
          // onPress={() => navigation.goBack()}
          text="Select Date"
          preset="subheading"
        />
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
      <ChatUsers />
      {/* <GestureHandlerRootView style={styles.container}>
        <View onLayout={onLayout} style={styles.wrapper}>
          <GestureDetector gesture={pan}>
            <Animated.View style={[styles.box, animatedStyles]} />
          </GestureDetector>
        </View>
      </GestureHandlerRootView> */}

      {/* <View
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
      </View> */}
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  wrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    cursor: "grab",
    alignItems: "center",
    justifyContent: "center",
  },
  mainTitle: {
    paddingTop: 10,
    // borderBottomColor: colors.blue,
    // borderBottomWidth: 2,
    paddingBottom: 7,
    marginBottom: 12,
  },
})
