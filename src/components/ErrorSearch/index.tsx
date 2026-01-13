import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native"
import useAuth from "../../hooks/useAuth";

const { width } = Dimensions.get("screen")

type MessageProp = {
    message: string;
};

export default ({ message }: MessageProp) => {

    const {navigateToProducts}=useAuth()

    return (
        <View style={[{ alignItems: "center", paddingHorizontal: 15, marginTop:80 }]}>

            <View style={[{gap:25, alignItems: "center", }]}>
                <Text style={[{ fontStyle: "italic", fontWeight:"800", fontSize:20, textAlign:"center" }]}>
                    Ops! {message}
                </Text>


                <TouchableOpacity style={[{backgroundColor:"red", borderRadius:5, padding:2, height:35, width:150, justifyContent:"center"}]} onPress={()=> navigateToProducts(null, null)}>
                    <Text style={[{fontStyle:"italic", fontWeight:"500", color:"#fff", textAlign:"center"}]}>
                        Checar produtos
                    </Text>
                </TouchableOpacity>
            </View>

            <Image source={require("../../../assets/images/errorImage.png")}
                style={{ width: width, height: width }} />


        </View>
    )

}