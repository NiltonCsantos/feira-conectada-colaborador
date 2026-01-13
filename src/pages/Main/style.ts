import { StyleSheet } from "react-native";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");



export default StyleSheet.create(
    {
        container: {


            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:"#ffffff97"

        },
      
        content: {
            paddingTop: 20,
            flex: 1,
            gap: 15,
            alignItems: "center",

            

        },
        search: {

            backgroundColor: "#BBFAED",
            width: width / 1.05,
            height:50,
            padding: 5,
            borderRadius: 8,
            marginTop: 16,
            

        },
        mainCard: {
            width: width / 1.05,
            height: 172,
            backgroundColor: "#EE6928",
            borderRadius: 8

        },
        doubleCard: {
            flexDirection: "row",
            gap: 8,
            height: width / 1.2
        },
        doubleVerticalCard: {
            gap: 8
        },
        verticalCard: {

            backgroundColor: "#756B66",
            width: width / 2.4,
            height: "100%",
            borderRadius: 8

        },
        squareCard: {
            backgroundColor: "#8CF569",
            height: "60%",
            width: width / 2,
            borderRadius: 8

        },
        smallCard: {
            backgroundColor: "#696BF5",
            width: width / 2,
            height: "37.5%",
            borderRadius: 8
        },

        contentAsset:{

            flexDirection:"row",
            gap:8,


        },
        rectangleCard:{
            width:width/2,
            height:width/2.25,
            backgroundColor: "#EE6928",
            borderRadius: 8

        },
        squareCardAssets:{
            backgroundColor: "#8CF569",
            height: width/2.25,
            width:width/2.4,
            borderRadius: 8
        },
        containerText:{

            // borderColor:"red",
            // borderWidth:5,
            paddingLeft:5,

            marginTop:25,
            marginBottom:5,
            width:width/1.05



        },
        text:{
            fontSize:25,
            fontWeight:"bold",
            
        }
    }
)