import { Text, View } from "react-native"
import { Card } from "react-native-shadow-cards"
import style from "../style"
import { MaterialIcons } from "@expo/vector-icons"
import BtnEnter from "../../BtnEnter"

export default ()=>{
    return(
        <Card>
        <View style={style.card}>

        <MaterialIcons name="notifications-none" size={24} color="black" />

            <Text>
                Notificações
            </Text>

            <BtnEnter/>

        </View>
    </Card>
    )
}