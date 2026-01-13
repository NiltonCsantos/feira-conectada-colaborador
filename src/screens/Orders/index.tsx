import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SatusIcon from "../../components/shared/SatusIcon";
import useOrders from "../../hooks/orders/useOrders";
import { ORDERCANCELED, ORDERCREATED, ORDERFINISH, ORDERPRODUCTION, OrdersStatusParamList } from "../../routes/private/order.routes";
import OrdersDetails from "../../components/Management/OrdersDetails";
import StockSkeleton from "../../components/shared/StockSkeleton";
import { OrderStatusEnum } from "../../interfaces/orderProduct";
import RoutesSkleton from "../../components/shared/RoutesSkleton";
import StatusIcon from "../../components/shared/SatusIcon";
import Warnning from "../../components/shared/Warnning";


export default () => {

    const { navigateToForStatus, getCurrentRouteName, orders, getQuantityOrders, quantityOrders, getStatusLabel, getOrdersForStatus,
        updateStatusOrder, cancelOrder
     } = useOrders();
    const currentRoute = getCurrentRouteName();
    const [isVisible, setIsVisible] = useState(false);
    const [isConfirmationOrders, setIsConfirmationOrders] = useState(false);
    const [isCanceltionOrders, setIsCanceltionOrders] = useState(false);
    const [isreload, setIsReload] = useState(false);
    const [pedNrId, setPedNrId] = useState<number | null>(null)


    async function loadData() {
        await getQuantityOrders();
        await getOrdersForStatus();
    }

    useEffect(() => {

        setTimeout(() => {
            loadData()
        }, 500)

    }, [])


    function handleCloseWarning() {
        setIsCanceltionOrders(false);
        setIsConfirmationOrders(false);
        setIsVisible(false);
        setPedNrId(null);
    }

    function handleClickCancel(pedNrId: number) {
        setIsCanceltionOrders(true);
        setIsVisible(true);
        setPedNrId(pedNrId);
    }

    function handleClickConfirm(pedNrId: number) {
        setIsConfirmationOrders(true);
        setIsVisible(true);
        setPedNrId(pedNrId);
    }

    function handleOrder() {
        if (isConfirmationOrders) {
            updateStatusOrder(pedNrId!);
        }

        if (isCanceltionOrders) {
            cancelOrder(pedNrId!)
        }
        setIsVisible(false)
    }


    return (
        <SafeAreaView className="bg-white flex-1" >

            <View className="flex-row justify-between px-5">
                {quantityOrders.length === 0 ? (
                    <RoutesSkleton />
                ) : (
                    quantityOrders.map((item) => (
                        <StatusIcon
                            key={item.pedTxStatus}
                            status={item.pedTxStatus}
                            title={getStatusLabel(item.pedTxStatus)}
                            colorSelectd="green"
                            isSelected={currentRoute === item.pedTxStatus.toString()}
                            count={item.pedNrQuantidade}
                            onPress={() => navigateToForStatus(item.pedTxStatus)}
                        />
                    ))
                )}
            </View>


            {orders === null && (
                <View className="p-5 mt-5">
                    <StockSkeleton />
                </View>
            )}

            {orders?.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-title-main font-title-main">
                        Ainda não há pedidos
                    </Text>
                </View>
            ) : (
                <View className="p-5 mt-5">

                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item.pedNrId.toString()}
                        renderItem={({ item }) => <OrdersDetails order={item} onCancel={() => handleClickCancel(item.pedNrId)}
                            currentRoute={currentRoute}
                            onConfirm={()=>handleClickConfirm(item.pedNrId)}
                        />}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                        style={{ paddingVertical: 15, height: 500 }}
                    />


                </View>
            )
            }

            <Warnning onCancel={() => handleCloseWarning()} isVisible={isVisible} onConfirm={handleOrder} />

        </SafeAreaView >
    );
};
