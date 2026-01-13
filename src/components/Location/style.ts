import { Dimensions, StyleSheet, StatusBar } from "react-native"

 
    const {width}= Dimensions.get("screen")


   export default StyleSheet.create({
        container:{
            backgroundColor:"#ffffff",
            flex:1,
            gap:15,
            alignItems:"center",
            paddingTop:StatusBar.currentHeight
        },
    

        currentLocation:{

            flexDirection:"row",
            gap:5,
            width:width/1.1,
            height:width/2.5,
            alignItems:"center",
            justifyContent:"center",
            backgroundColor:"#eff1f2"

        },
        list:{
            flex:1,
            gap:15,
            borderColor:"black",
        },
        itemList:{
            width:width/1.1,
            height:120,
            alignItems:"center",
            justifyContent:"center",
        }
    })
