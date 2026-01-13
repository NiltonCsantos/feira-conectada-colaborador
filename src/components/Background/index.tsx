import { View, Image, Text, ActivityIndicator } from "react-native"


import style from "./style"
import Title from "../Auth/Title"

export default () => {
    return (
        <View style={style.container}>

            <Title title={"Feira conectada"} />


            <View style={style.containerImage}>
                <Image source={require("../../../assets/images/logo.png")} style={style.image} ></Image>
            </View>

            <Text
                style={style.text}    >
                Descubra o melhor das feiras agora no seu celular!.
                Conecte-se à tradição das feiras de um jeito moderno.
                Vamos explorar juntos!
            </Text>

            <View>
                <Text style={style.loader}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </Text>
            </View>
        </View>
    )
}