import { Dimensions, StyleSheet, StatusBar } from "react-native";


const {width}= Dimensions.get("screen")
export default StyleSheet.create(
    {

        container: {
            flex: 1,
            paddingHorizontal:20,
            alignItems: "center",
            justifyContent:'center',
            gap:80,
            backgroundColor: "#EE6928",
            paddingTop:StatusBar.currentHeight
        },
        animation:{
                width:width/1.8,
                height:width/1.8
        },
       
        text:{
            fontSize: 20,
            fontWeight: "bold",
            textAlign:'center',
            color:"#FFF"
        }
    }
)