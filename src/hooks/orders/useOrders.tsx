import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OrdersStatusParamList } from "../../routes/private/order.routes";
import { useState } from "react";
import { Order, OrderStatusEnum, QuantityOrder } from "../../interfaces/orderProduct";
import OrderService from "../../services/oder_service";
import useToast from "../shared/useToast";


type OrdersRouteProp = RouteProp<OrdersStatusParamList>;



export default function useOrders() {

    const orderService = new OrderService()

    const navigation = useNavigation();
    const route = useRoute<OrdersRouteProp>();

    const [orders, setOrders] = useState<Order[] | null>(null);
    const [quantityOrders, setQuantityOrders] = useState<QuantityOrder[]>([]);
    const { sucess } = useToast();

    function navigateToForStatus(status: string) {
        navigation.navigate(status);
    }


    function getCurrentRouteName(): keyof OrdersStatusParamList {
        return route.name as keyof OrdersStatusParamList;
    }

    async function getQuantityOrders() {
        const data = (await orderService.findQuantityOrders()).data
        console.log(data);

        setQuantityOrders(data)
    }

    async function getOrdersForStatus(useRoute:boolean = true) {
        
        var data = (await orderService.findOrders(useRoute ? route.name : "CRIADO")).data.content;
        setOrders(data)
    }

    function getStatusLabel(statusKey: string): string {
        if (statusKey in OrderStatusEnum) {
            return OrderStatusEnum[statusKey as keyof typeof OrderStatusEnum];
        }
        // fallback caso venha algo inválido do backend
        return statusKey;
    }

    async function updateStatusOrder(pedNrId: number) {
        try {
            await orderService.updateStatus(pedNrId);
            sucess("Pedido atualizado com sucesso");
            setOrders([])

            await getQuantityOrders();
            await getOrdersForStatus();
        } catch (error) {
            console.log(error);
        }
    }

    async function cancelOrder(pedNrId: number) {
          try {
            await orderService.cancel(pedNrId);
            sucess("Pedido cancelado com sucesso");
            setOrders([])
            await getQuantityOrders();
            await getOrdersForStatus();
        } catch (error) {
            console.log(error);
        }
    }

    function navigateToOrders(){
        navigation.navigate("Orders")
    }

    return {
        navigateToForStatus, getCurrentRouteName, orders, setOrders, getQuantityOrders, quantityOrders, getStatusLabel, getOrdersForStatus,
        updateStatusOrder, cancelOrder, navigateToOrders
    }
}