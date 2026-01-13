import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import { Text, TouchableHighlight, View } from "react-native"
import style from "../style"

export default () => {
    return (
        <View style={{alignItems:'center', gap:10}}>
            <View style={style.pay}>
                <MaterialIcons name="pix" size={48} color="black" />
            </View>
            <Text style={{fontWeight:'500'}}>
                PIX
            </Text>
        </View>
    )
}