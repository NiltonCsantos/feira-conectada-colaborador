import { SafeAreaView } from "react-native-safe-area-context"
import Card from "../../components/Salles/Card"
import { Dimensions, FlatList, Text, View } from "react-native"
import useSalles from "../../hooks/salles"
import { useEffect } from "react"
const { width, height } = Dimensions.get("screen")

export default () => {

    const { findProducts, products } = useSalles();

    useEffect(() => {
        findProducts()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className=" w-full pb-5 px-5 flex-col gap-5">
                <Text className="font-title-main text-title-main">
                    Produtos em alta
                </Text>
            </View>

            <View className="p-5 mt-5 flex-1">

                <FlatList
                    data={products}
                    keyExtractor={(item) => item.proNrId.toString()}
                    renderItem={({ item }) => <Card product={item}
                    />}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        paddingBottom: 20,
                    }}
                    ItemSeparatorComponent={() => <View style={{ width: 15, height: 15 }} />}
                    style={{ paddingBottom: 150, width: "100%", height: height }}
                />
            </View>
        </SafeAreaView>
    )
}