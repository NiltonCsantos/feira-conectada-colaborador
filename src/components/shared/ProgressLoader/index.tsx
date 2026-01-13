import React from "react";
import {  View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default()=>{
    return(
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#EE6928" />
        </View>
    )
}