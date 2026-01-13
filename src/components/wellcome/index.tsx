
import { SafeAreaView, Text } from "react-native"
import style from "./style"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import LottieView from 'lottie-react-native';

export default () => {

    const navigation = useNavigation();

    useEffect(() => {

        setTimeout(() => {

            navigation.navigate("Location")

        }, 3000)

    }, [])


    return (
        <SafeAreaView style={style.container}>

            <Text style={style.text}>
                Descubra, aproveite e viva a feira completa na palma da sua mão, com tudo o que você precisa ao seu alcance!"
            </Text>

            <LottieView
                source={require('../../../assets/animations/Animation - 1728432134991.json')}
                autoPlay={true}
                loop={true}
                style={style.animation}
            />


        </SafeAreaView>
    )
}