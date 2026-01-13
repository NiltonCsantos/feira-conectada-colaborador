import React from "react"

import { SafeAreaView, Text, View } from "react-native"
import Pix from "./Pix"
import CreditCard from "./CreditCard"
import style from "./style"
import Title from "../Auth/Title"

export default () => {
    return (
        <SafeAreaView style={style.container}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, fontStyle: 'italic', padding: 10 }}>
                Formas De Pagamento
            </Text>
            <View style={style.content}>
                <Pix />
                <CreditCard />
            </View>
        </SafeAreaView>
    )
}