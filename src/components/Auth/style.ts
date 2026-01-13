import { Dimensions, StatusBar, StyleSheet } from "react-native";

const { width } = Dimensions.get("screen")

export default StyleSheet.create({
    container: {
        flex:1,
        padding: StatusBar.currentHeight,
        backgroundColor: "#EE6928",
    },

    contentInputs:{
        flex:1,
        // borderWidth:10,
        // justifyContent:"center",
        alignItems:"center",
        gap:24
    },
    containerTitle: {

        height: width / 2,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor:"black"
    },

    login: {
        padding:5,
        alignItems:"center",
        paddingTop:80,
        gap: 25,
        // backgroundColor:"yellow"
    },
    input: {
        backgroundColor:"#ffffff",
        width: "90%",
        height: 50,
        borderRadius: 8,
        paddingLeft:20
    },
    forgetPassword: {
        marginTop:-8,
        paddingHorizontal:30,
        textAlign: "right",
        width:width/1.05
    },
    button:{
        width:200,
        borderRadius:33,
        overflow:"hidden"
    },
    icon:{
        backgroundColor:"#FF785B",
        textAlign:"center",
        fontSize:25,
        fontWeight:"bold",
        color:"#fff",
        width:50,
        height:50,
        borderRadius:50
    }
})