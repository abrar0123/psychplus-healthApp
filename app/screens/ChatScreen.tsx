import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { Button, Text } from "../components"
import { io } from "socket.io-client"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import {
  ScreenCapturePickerView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc"
import { VideoScreen } from "./VideoScreen"

const ChatScreen = ({ route }) => {
  const { name } = route.params.data
  const [buid, setBuid] = useState("")
  const [otherUsers, setOtherUsers] = useState<any>([])

  // const socket = io("http://192.168.250.154:5566/") // just connect backend socket port
  const socket = io("http://192.168.191.154:5566/") // just connect backend socket port

  const [messages, setMessages] = useState([{}])
  const [inputText, setInputText] = useState("")

  // video call
  const [localStream, setLocalStream] = useState<any>(null)
  const [remoteStream, setRemoteStream] = useState(null)
  const [otherSocketId, setOtherSocketId] = useState("")

  const [peerConnection, setPeerConnection] = useState<any>(null)
  const [isCaller, setIsCaller] = useState<Boolean>(false)
  const [callToUsername, setCallToUsername] = useState<any>("")

  const localStreamRef = useRef<any>()
  const remoteStreamRef = useRef<any>()
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
          setBuid(res)
        })
      } catch (error) {}
    }
    registerUser()
    handleCallUser()
    // socket.on("offer", async (data) => {
    //   console.log("offer on 1 \n : ", data)
    // })
    // p2
  }, [])

  const handleCallUser = useCallback(async () => {
    try {
      const sa = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      console.log("react natve video player >>> ", sa)
    } catch (error) {
      console.log("error >>> ", error)
    }
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
  useEffect(() => {
    socket.on("connect", () => {})

    socket.on("OtherUsers", (users) => {
      const ss = Object.entries(users).map(([v1, v2]) => ({ user: v1, id: v2 }))

      setOtherUsers(ss)
    })
    const pc: any = new RTCPeerConnection()

    pc.onicecandidate = (event) => {
      console.log("pc 1 >>>>  :", event)

      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate, to: otherSocketId })
      }
    }

    pc.onaddstream = (event) => {
      setRemoteStream(event.stream)
      //    remoteStreamRef.current.srcObject = event.stream
    }
    setPeerConnection(pc)

    const getUserMedia = async () => {
      const stream = await mediaDevices.getUserMedia({ video: true, audio: true })
      // console.log("stream  :", stream)

      setLocalStream(stream)
      localStreamRef.current.srcObject = stream
      pc.addStream(stream)
    }
    getUserMedia()

    socket.on("offer", async (data) => {
      console.log(isCaller, "offer on \n : ", data)

      if (!isCaller) {
        // console.log("isCaller on \n : ", isCaller)

        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
        const answer = await pc.createAnswer()
        await pc.setLocalDescription(answer)
        // console.log("data.from >>> \n : ", data)

        socket.emit("answer", { sdp: answer, to: data.to })
      }
    })
    console.log("am run *****************")

    socket.on("answer", async (data) => {
      console.log("data sdp >>> ", data)

      await pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
    })

    socket.on("ice-candidate", async (data) => {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate))
      } catch (e) {
        console.error("Error adding received ice candidate", e)
      }
    })
  }, [])

  // p1
  const startCall = async () => {
    setIsCaller(true)
    const offer = await peerConnection.createOffer()
    // console.log("offer", offer)

    await peerConnection.setLocalDescription(offer)
    socket.emit("offer", { sdp: offer, to: otherSocketId })
  }
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
        {/* {messages.map((e) => (
          <Text text={`A :${e.chat}`} />
        ))} */}
        <Button
          text="Call"
          preset="filled"
          style={{ marginHorizontal: 20, marginTop: 20 }}
          onPress={startCall}
        />

        {myuser.map((e) => (
          <TouchableOpacity onPress={() => setOtherSocketId(e.id)}>
            <Text text={`A :${e.id}`} />
          </TouchableOpacity>
        ))}

        {/* <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
          contentContainerStyle={styles.messageList}
        /> */}
        {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handlePress}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.videoContainer}>
          <RTCView streamURL={localStream && localStream.toURL()} style={styles.video} />
          {/* <RTCView streamURL={remoteStream && remoteStream.toURL()} style={styles.video} /> */}
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
  videoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  video: {
    width: "47%",
    height: "80%",
    backgroundColor: "black",
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
