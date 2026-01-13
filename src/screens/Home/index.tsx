import { SafeAreaView } from "react-native-safe-area-context"
import Profile from "../../components/Main/Profile"
import MainCard from "../../components/Main/Card"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import Statistics from "../../components/Main/Statistics"
import Orders from "../../components/Management/OrdersDetails"
import useOrders from "../../hooks/orders/useOrders"
import { useFocusEffect } from "@react-navigation/native"
import OrdersDetails from "../../components/Management/OrdersDetails"
import StockSkeleton from "../../components/shared/StockSkeleton"
import { useCallback } from "react"

export default () => {

    const { navigateToOrders, orders, getOrdersForStatus } = useOrders();

    async function loadData() {
        await getOrdersForStatus(false);
    }


    useFocusEffect(
        useCallback(() => {
            const timer = setTimeout(() => {
                loadData();
            }, 500);

            return () => clearTimeout(timer);
        }, [])
    );
    return (
        <SafeAreaView className="flex-1">
            <View className="gap-5">
                <Profile />
                <MainCard />
                <Statistics />
                <View className="px-5">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-title-main font-title-main">
                            Pedidos
                        </Text>

                        <TouchableOpacity onPress={navigateToOrders}>
                            <Text className="text-xl font-title-main">
                                Ver Mais
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {orders === null && (
                    <View className="p-5 mt-5">
                        <StockSkeleton />
                    </View>
                )}

                {orders?.length === 0 ? (
                    <View className="h-32 justify-center items-center">
                        <Text className="text-title-main font-title-main">
                            Ainda não há pedidos
                        </Text>
                    </View>
                ) : (
                    <View className="p-5 mt-5 flex-1">

                        <FlatList
                            data={orders}
                            keyExtractor={(item) => item.pedNrId.toString()}
                            renderItem={({ item }) => <OrdersDetails order={item}
                            />}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingHorizontal: 10,
                                paddingBottom: 20, 
                            }}
                            ItemSeparatorComponent={() => <View style={{ width: 15, height:15 }} />}
                            style={{ paddingBottom: 150, height: 500 }}
                        />


                    </View>
                )
                }
            </View>
        </SafeAreaView>
    )
}