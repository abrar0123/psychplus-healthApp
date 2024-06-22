import React, { useEffect, useRef, useState } from "react"
import { Button, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { Text } from "../components"
import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices,
  RTCView,
} from "react-native-webrtc"
import { io } from "socket.io-client"

export const VideoScreen = ({ otherSocketId }: any) => {
  const socket = io("http://192.168.191.154:5566/") // just connect backend socket port

  const [localStream, setLocalStream] = useState<any>(null)
  const [remoteStream, setRemoteStream] = useState(null)
  const [otherSocketId1, setOtherSocketId] = useState("")

  console.log("otherSocketId", otherSocketId)

  const [peerConnection, setPeerConnection] = useState<any>(null)
  const [isCaller, setIsCaller] = useState<Boolean>(false)
  const [callToUsername, setCallToUsername] = useState<any>("")
  const [otherUsers, setOtherUsers] = useState<any>([])

  const localStreamRef = useRef<any>()
  const remoteStreamRef = useRef<any>()

  useEffect(() => {
    socket.on("connect", () => {})

    socket.on("OtherUsers", (users) => {
      const ss = Object.entries(users).map(([v1, v2]) => ({ user: v1, id: v2 }))
      console.log("ss", ss)

      setOtherUsers(ss)
    })
    const pc: any = new RTCPeerConnection()

    pc.onicecandidate = (event) => {
      console.log("pc 1 >>>>  :", event)

      if (event.candidate) {
        //  socket.emit("ice-candidate", { candidate: event.candidate, to: callToUsername })
      }
    }

    pc.onaddstream = (event) => {
      setRemoteStream(event.stream)
      //    remoteStreamRef.current.srcObject = event.stream
    }
    setPeerConnection(pc)

    const getUserMedia = async () => {
      const stream = await mediaDevices.getUserMedia({ video: true, audio: true })
      console.log("stream  :", stream)

      setLocalStream(stream)
      localStreamRef.current.srcObject = stream
      pc.addStream(stream)
    }
    getUserMedia()

    socket.on("offer", async (data) => {
      console.log("offer on \n : ", data)

      if (!isCaller) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
        const answer = await pc.createAnswer()
        await pc.setLocalDescription(answer)
        socket.emit("answer", { sdp: answer, to: data.from })
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Call to username"
        value={callToUsername}
        onChangeText={setCallToUsername}
      />
      <Button title="Call" onPress={startCall} />
      {otherUsers?.map((e) => (
        <TouchableOpacity onPress={() => setOtherSocketId(e.id)}>
          <Text text={`Id :${e.id}`} />
        </TouchableOpacity>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "80%",
    paddingHorizontal: 10,
  },
})
