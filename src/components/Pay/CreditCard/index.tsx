import { AntDesign } from "@expo/vector-icons"
import { Text, View } from "react-native"
import style from "../style"

export default () => {
    return (

        <View style={{ alignItems: 'center', gap: 10 }}>
            <View style={[style.pay, style.creditCard]}>
                <AntDesign name="creditcard" size={48} color="black" />
            </View>
            <View style={{alignItems:'center'}}>
                <Text style={{ fontWeight: '500' }}>
                    Cartão de Crédito
                </Text>
                <Text style={{ fontSize: 10 }}>
                    Disponível em breve
                </Text>
            </View>
        </View>
    )
}