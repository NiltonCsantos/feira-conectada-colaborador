import { Dimensions, StatusBar, StyleSheet } from "react-native";

const {width}= Dimensions.get("screen")

export default StyleSheet.create(
    {
        container:{
            backgroundColor:"#FFFFFF",
            flex:1,
            gap:100,
            paddingTop: StatusBar.currentHeight,
            alignItems:"center",
            justifyContent:"center"
        },
        content:{

            flex:2,
            flexDirection:"row",
            gap:24

        },
        pay:{

            height:width/3.5,
            width:width/3.5,
            borderWidth:0.5,
            justifyContent:"center",
            alignItems:"center",
            borderRadius:8,
          

        },
        creditCard:{
            opacity:0.5
        }
    }
)