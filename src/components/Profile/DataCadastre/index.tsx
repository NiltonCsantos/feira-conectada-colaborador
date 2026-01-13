import { Text, TouchableOpacity, View } from "react-native";


import { AntDesign } from '@expo/vector-icons';

import { Card } from "react-native-shadow-cards"
import style from "../style";
import BtnEnter from "../../BtnEnter";
import { useNavigation } from "@react-navigation/native";

export default () => {

    const navigation= useNavigation()

    function navigateToDataUser(){
        navigation.navigate("DataUser")
    }

    return (
        <Card>
            <TouchableOpacity style={style.card} onPress={navigateToDataUser} >
                <AntDesign name="profile" size={24} color="black" />
                <Text>
                    Meus Dados
                </Text>

                <BtnEnter/>
            </TouchableOpacity>
        </Card>
    )
}