import { Octicons } from "@expo/vector-icons"
import { Text, Touchable, TouchableOpacity, View } from "react-native"
import { Card } from "react-native-shadow-cards"
import BtnEnter from "../../BtnEnter"
import style from "../style"
import { useNavigation } from "@react-navigation/native"

export default ()=>{

    const navigation= useNavigation();

    function navigateToPayment(){
        navigation.navigate("Payment")
    }

    return(

        <Card>
            <TouchableOpacity style={style.card} onPress={navigateToPayment}>

            <Octicons name="credit-card" size={24} color="black" />

                <Text>
                    Pagamentos
                </Text>

                <BtnEnter/>

            </TouchableOpacity>
        </Card>

    )
}