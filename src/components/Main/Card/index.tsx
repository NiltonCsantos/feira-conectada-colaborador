import { Image, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native"
import style from "./style"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import useAuth from "../../../hooks/useAuth"
import useStock from "../../../hooks/stock/useStock"

export default () => {

    const { navigateToStock } = useStock();

    return (
        <View className="items-center">
            <View className="w-11/12 h-52 rounded-md">
                <View >
                    <Image source={require("../../../../assets/images/stock.png")} className="w-full h-full rounded-md"></Image >
                    <View className="absolute w-full h-full bg-black/5 flex-1 items-center justify-center rounded-lg">
                        <View className="flex-1 w-full p-5 justify-start items-start">
                            <Text className="text-2xl font-normal text-white" >
                                Gerenciar
                            </Text>
                            <Text className="text-4xl font-title-main text-white" >
                                Estoque
                            </Text>
                        </View>

                        <View className="flex-1 w-full justify-center items-center">
                            <TouchableOpacity className="bg-blue-500 opacity-85 w-10/12 items-center p-3 rounded-md" onPress={() => navigateToStock()}>
                            <Text className="text-white text-xl font-title-main">
                                Acessar
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    )
}