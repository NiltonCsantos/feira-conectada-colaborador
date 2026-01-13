import { Dimensions, StatusBar, StyleSheet } from "react-native";

const {width}= Dimensions.get("screen");

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFFFFF",
        alignItems:"center",
        justifyContent:"space-around",
        paddingTop:StatusBar.currentHeight
    },
    logoContent:{
        paddingHorizontal:18,
        flexDirection:"row",
        gap:15,
        alignItems:"center",
        width:"100%"
    },
    logo:{
        width:width/8,
        height:width/8,
        borderRadius:50,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#EE6928"
    },
    logoText:{
        fontWeight:"bold",
        color:"#FFFFFF"
    },
    options:{

        height:"80%",

    },
    card:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        height:width/5
    }
})