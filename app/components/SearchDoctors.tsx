import React, { useState } from "react"
import { View } from "react-native"
import { Text } from "./Text"
import { TextField } from "./TextField"

export const SearchDoctors = () => {
  const [searchDoctor, setSerchDoctor] = useState("")
  return (
    <View>
      <TextField
        placeholder="Search any Doctors"
        value={searchDoctor}
        onChangeText={(e) => setSerchDoctor(e)}
      />
    </View>
  )
}
