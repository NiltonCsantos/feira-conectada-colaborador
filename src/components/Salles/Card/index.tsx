import { Image, Text, View } from "react-native"
import { Product } from "../../../interfaces/product";
import { FontAwesome5 } from "@expo/vector-icons";
const banana = require('../../../../assets/images/banana.jpg');
const apple = require('../../../../assets/images/apples.jpg');

interface Props {
    product: Product
}

export default ({ product }: Props) => {
    return (
        <View className="w-full flex-col gap-5">
            <View className="bg-dev h-32 rounded-md flex-row gap-16 items-center">
                <View className="h-32 w-32">
                    {product.ipTxImagem == null ? (
                    <View className="h-full w-full justify-center items-center">
                        <FontAwesome5 name="ban" size={90} color="#666" />
                    </View>
                ) : (
                    <Image source={{ uri: product.ipTxImagem }} className="h-full w-full" />
                )}
                </View>
                <Text className="text-title-main font-title-main text-white">
                    {product.proTxNome}
                </Text>
            </View>
        </View>
    )
}