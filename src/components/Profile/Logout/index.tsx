import { FontAwesome } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"
import { Card } from "react-native-shadow-cards"
import BtnEnter from "../../BtnEnter"
import style from "../style"

interface Props{
    onPress:()=>void
}

export default ({onPress}:Props) => {

    return (
        <Card>
            <TouchableOpacity style={style.card} onPress={onPress}>
            <FontAwesome name="sign-in" size={24} color="black" />
                <Text style={{width:65}}>
                    Sair
                </Text>
                <BtnEnter />
            </TouchableOpacity>
        </Card>
    )
}