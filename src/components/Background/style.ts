import { StyleSheet } from "react-native"

export default StyleSheet.create(
    {
        container: {

            flex: 1,
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-around",
            backgroundColor: "#EE6928",
            padding: 8
        },
        containerImage: {
            width: "auto",
            justifyContent: "center",
            alignItems: 'center'
        },
        image: {
    
            width: 360,
            height: 200

        },

        loader: {
            textAlign: "center",
            color: "#FFFFFF"
        },
        text: {
            textAlign: "center",
            color: "#FFFFFF"
        }
    }
)