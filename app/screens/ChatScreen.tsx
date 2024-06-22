import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { Text } from "../components"
import { io } from "socket.io-client"
import { useEffect, useMemo, useState } from "react"

const ChatScreen = ({ route }) => {
  const { name } = route.params.data
  const [buid, setBuid] = useState("")
  const [otherUsers, setOtherUsers] = useState<any>([])

  // const socket = io("http://192.168.250.154:5566/") // just connect backend socket port
  const socket = io("http://192.168.191.154:5566/") // just connect backend socket port

  const [messages, setMessages] = useState([{}])
  const [inputText, setInputText] = useState("")
  const [otherSocketId, setOtherSocketId] = useState("")

  const renderItem = ({ item }) => (
    <View
      style={[styles.messageBubble, item.sender === "me" ? styles.myMessage : styles.otherMessage]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  )

  useEffect(() => {
    console.log("render ")

    socket.on("connect", () => {})

    socket.on("otherchat", (item) => {
      console.log("otherchat chat success : ", item)
      setMessages((prev) => [...prev, item])
    })

    socket.on("OtherUsers", (users) => {
      const ss = Object.entries(users).map(([v1, v2]) => ({ user: v1, id: v2 }))
      setOtherUsers(ss)
    })

    // socket.on("otherchat", (data) => {
    //   console.log("other User chat : ", data)
    // })

    const registerUser = () => {
      try {
        const data = { sid: socket.id, name }
        // p1
        socket.emit("register", data, (res) => {
          setBuid("res")
        })
      } catch (error) {}
    }
    registerUser()

    // p2
  }, [])
  const myuser = useMemo(() => {
    const idd = otherUsers?.filter((item) => item.id !== buid)
    return idd
  }, [otherUsers, buid])
  // useEffect(() => {
  //   const filterdata = () => {
  //     const idd = otherUsers?.filter((item) => item.id !== buid)
  //     console.log("iddd >>>>>  \n :::  ", idd)
  //     setOtherUsers(idd)
  //   }
  //   filterdata()
  // }, [])
  console.log("otherUsers", myuser)

  const handlePress = async () => {
    try {
      // const response = await fetch("http://192.168.250.154:5566/")
      if (inputText.trim() === "") return
      // setMessages([{ id: Date.now().toString(), text: inputText, sender: "me" }, ...messages])
      setInputText("")
      const data = { otherSocketId, uname: name, chat: inputText }

      socket.emit("chat", data)
      // console.log("Socket Chat", data)
    } catch (error) {
      console.log("Chat Error", error)
    }
  }

  // ************************ Socket Chat  ************************

  return (
    <>
      <KeyboardAvoidingView // prevent keyboard to cover inputA when keyboard is opend
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <TextInput
          style={styles.input1}
          value={otherSocketId}
          onChangeText={setOtherSocketId}
          placeholder="Type a message"
        />
        {messages.map((e) => (
          <Text text={`A :${e.chat}`} />
        ))}
        {myuser.map((e) => (
          <TouchableOpacity onPress={() => setOtherSocketId(e.id)}>
            <Text text={`A :${e.id}`} />
          </TouchableOpacity>
        ))}
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
          <TouchableOpacity style={styles.sendButton} onPress={handlePress}>
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
    // flex: 1,
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  input1: {
    // flex: 1,
    borderWidth: 1,
    marginTop: 20,
    marginHorizontal: 20,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  sendButton: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "#34B7F1",
    borderRadius: 25,
  },
  sendButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
})
export default ChatScreen
