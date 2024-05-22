import { FlatList, TouchableOpacity } from "react-native"
import { Text } from "../components"
import { colors } from "../theme"
import { io } from "socket.io-client"
import { useEffect } from "react"

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

const ChatScreen = () => {
  const socket = io("http://192.168.250.154:5566/") // just connect backend socket port

  useEffect(() => {
    console.log("object ")

    socket.on("connect", () => {
      console.log("sockect connect >>> ", socket.id)
    })
    socket.on("chatRec", (data) => {
      console.log("chatRec", data)
    })
  }, [])

  const hanlePress = async () => {
    console.log("pressed")

    try {
      const response = await fetch("http://192.168.250.154:5566/")
      const result = await response.json()

      console.log("result :", result)

      const data = { id: 1002, chat: "how are u" }
      const ss = socket.emit("chat", data)
      console.log("socket chat")
    } catch (error) {
      socket.emit("chat error", error)
    }
  }

  const renderVert = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          margin: 10,
          width: "45%",
          height: 50,
          padding: 10,
          borderRadius: 5,
          shadowOpacity: 0.1,
          shadowColor: "gray",
          elevation: 7,
          backgroundColor: colors.palette.accent500,
          marginBottom: 10,
        }}
        onPress={hanlePress}
      >
        <Text text={item?.name} />
      </TouchableOpacity>
    )
  }

  // ************************ Socket Chat  ************************

  return (
    <>
      <Text preset="heading" text="Chat" />
      <FlatList data={dataHor} numColumns={2} renderItem={renderVert} />
    </>
  )
}

export default ChatScreen
