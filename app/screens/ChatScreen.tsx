import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { Text } from "../components"
import { colors } from "../theme"
import { io } from "socket.io-client"
import { useEffect, useState } from "react"

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

  const [messages, setMessages] = useState([
    { id: "1", text: "Hello!", sender: "other" },
    { id: "2", text: "Hi, how are you?", sender: "me" },
  ])
  const [inputText, setInputText] = useState("")

  const sendMessage = () => {
    if (inputText.trim() === "") return
    setMessages([...messages, { id: Date.now().toString(), text: inputText, sender: "me" }])
    setInputText("")
  }

  const renderItem = ({ item }) => (
    <View
      style={[styles.messageBubble, item.sender === "me" ? styles.myMessage : styles.otherMessage]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  )

  useEffect(() => {
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
      {/* <Text preset="heading" text="Chat" /> */}
      {/* <FlatList data={dataHor} numColumns={2} renderItem={renderVert} /> */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
          contentContainerStyle={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messageList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageBubble: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  myMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ECECEC",
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    backgroundColor: "#34B7F1",
    borderRadius: 25,
  },
  sendButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
})
export default ChatScreen
