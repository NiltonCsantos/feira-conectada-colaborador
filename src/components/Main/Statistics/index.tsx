import { Text, TouchableOpacity, View } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import useProduct from "../../../hooks/product/useProduct";
import useSalles from "../../../hooks/salles";


export default () => {

    const {navigateToProduct} = useProduct()
    const {navigateToSales,navigateToMetrics } = useSalles()

    return (
        <View className="w-full px-5 py-0  gap-5">
            <Text className="text-title-main font-title-main">
                Estatísticas
            </Text>
            <View className="w-full gap-5 flex-row justify-center items-center">
                <TouchableOpacity className="bg-blue-500 rounded-md items-center justify-center gap-2 h-[115px] w-[105px]"
                onPress={()=> navigateToProduct()}
                >
                    <FontAwesome5 name="boxes" size={24} color="white" />
                    <View className="flex justify-center items-center gap-0.5">
                        <Text className="text-[16px] text-white">
                            Produtos
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className="bg-blue-500 rounded-md items-center justify-center gap-2 h-[115px] w-[105px]"
                onPress={navigateToSales}
                >
                    <FontAwesome5 name="chart-line" size={24} color="white" />
                    <View className="flex justify-center items-center gap-0.5">
                        <Text className="text-[16px] text-white">
                            Vendas
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity className="bg-blue-500 rounded-md items-center gap-2 justify-center h-[115px] w-[105px]"
                onPress={navigateToMetrics}
                >
                <FontAwesome5 name="coins" size={24} color="white" />
                                   <View className="flex justify-center items-center gap-0.5">
                        <Text className="text-[16px] text-white">
                            Faturamento
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}