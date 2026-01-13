import { Octicons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"
import { Card } from "react-native-shadow-cards"
import BtnEnter from "../../BtnEnter"
import style from "../style"

import { useNavigation } from "@react-navigation/native";


export default () => {

    const navigation= useNavigation();

    function handleClick(){

        navigation.navigate("Location")

    }

    return (
        <Card>
            <TouchableOpacity style={style.card} onPress={handleClick}> 
                <Octicons name="location" size={24} color="black" />
                <Text>
                    Endereços
                </Text>
                <BtnEnter/>
            </TouchableOpacity>
        </Card>
    )
}