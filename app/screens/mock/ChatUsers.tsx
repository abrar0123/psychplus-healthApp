import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "../../components"
import { colors } from "../../theme"
import { useNavigation } from "@react-navigation/native"

const dataHor = [
  {
    id: "0239KSJDKSK003",
    title: "Tue 07",
    name: "SamsungA50",
    img: require("../../../assets/images/hotel1.jpeg"),
  },
  {
    id: "0239KSJDKSOWE3",
    title: "Wed 08",
    name: "InfinixZero30",
    img: require("../../../assets/images/hotel2.webp"),
  },
  {
    id: "0239KSJKSJDDSWE3",
    title: "Thurs 08",
    name: "SamsungA501",
    img: require("../../../assets/images/hotel3.jpg"),
  },
  {
    id: "0239KSJD9W83WE3",
    title: "Sat 10",
    name: "shafqt khan",
    img: require("../../../assets/images/hotel4.jpg"),
  },
  {
    id: "023SDJSHJDDKSOWE3",
    title: "Sun 11",
    name: "israr ahmed",
    img: require("../../../assets/images/hotel1.jpeg"),
  },
  {
    id: "0P938DJDKSOWE3",
    title: "Mon 12",
    name: "ali ahmed",
    img: require("../../../assets/images/hotel2.webp"),
  },
]

const ChatUsers = () => {
  const nav = useNavigation()

  const handlePress = (item) => {
    nav.navigate("Chat", { data: item })
  }
  const renderVert = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.mainView}
        onPress={handlePress.bind(this, item)}
      >
        <Image
          source={item.img}
          style={{ height: 50, width: 50, borderRadius: 40, marginRight: 15 }}
        />
        <View>
          <Text preset="bold" text={item?.name} />
          <Text text={`random text ${item?.name}`} />
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.mainStyle}>
      <Text preset="heading" text="Chat" style={{ marginTop: 15, marginBottom: 10 }} />
      <FlatList data={dataHor} renderItem={renderVert} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  mainView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 4,
    padding: 10,
    borderRadius: 7,
    shadowOpacity: 0.1,
    shadowColor: "white",
    elevation: 10,
    // borderWidth: 1,
    // borderColor: "gold",

    backgroundColor: "#dbe9f6",
  },
})
export default ChatUsers
