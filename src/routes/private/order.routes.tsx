import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Orders from "../../screens/Orders";

export type OrdersStatusParamList = {
    CRIADO: undefined;
    EM_PREPARACAO: undefined;
    FINALIZADO: undefined;
    CANCELADO: undefined;
};

const OrdersStack = createNativeStackNavigator<OrdersStatusParamList>();

export const ORDERCREATED = 'CRIADO';
export const ORDERPRODUCTION = 'EM_PREPARACAO';
export const ORDERFINISH= 'FINALIZADO';
export const ORDERCANCELED = 'CANCELADO';

export default function OrdersRoutes() {
    return (
        <OrdersStack.Navigator screenOptions={{ headerShown: false, animation: "none", }}>
            <OrdersStack.Screen name={ORDERCREATED} component={Orders} />
            <OrdersStack.Screen name={ORDERPRODUCTION} component={Orders} />
            <OrdersStack.Screen name={ORDERFINISH} component={Orders} />
            <OrdersStack.Screen name={ORDERCANCELED} component={Orders} />
        </OrdersStack.Navigator>
    );
}
