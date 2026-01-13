import { StyleSheet } from "react-native";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");


export default StyleSheet.create(
    {


        containerTitle:{
            backgroundColor:"#00000052",
            position:"absolute",
            width:"100%",
            textAlign:"center",
            height:"100%",
            flex:1,
            alignItems:"center",
            justifyContent:"center",
            borderRadius:8
        },
        title:{
            color:"#FFF",
            fontSize:21,
            fontWeight:"600",
            fontStyle:"italic"
        }

    }
)