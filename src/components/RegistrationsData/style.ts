import { Dimensions, StatusBar, StyleSheet } from "react-native";

const {width}= Dimensions.get("screen")

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFFFFF",
        alignItems:"center",
        paddingHorizontal:20,
        paddingTop:StatusBar.currentHeight,
        gap:100
    },

    content:{
        gap:40,
       width:'100%'
    },
    data:{
        gap:24,
        borderBottomColor:"#000000",
        borderBottomWidth:0.5,
        paddingBottom:15,
        justifyContent:"space-between"
    },
   
})