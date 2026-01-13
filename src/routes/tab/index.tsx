import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import Main from "../../pages/Main";

import { Feather, Ionicons } from "@expo/vector-icons";
import User from "../../pages/User";
import Home from "../../screens/Home";
import Stock from "../../screens/Stock";
import Orders from "../../screens/Orders";
import OrdersRoutes from "../private/order.routes";


const Tab = createBottomTabNavigator();

const tabBarOptions = {
    activeTintColor: 'red', // Define a cor do texto quando a aba está ativa
    labelStyle: { color: 'red' }, // Define a cor do texto da aba
    style: { backgroundColor: 'white' }, // Define a cor de fundo da barra de navegação
};

export default () => {
    return (

        <Tab.Navigator
            screenOptions={{ headerShown: false, animation: 'shift', }}>

            <Tab.Screen name="Feed" component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
                    tabBarLabel: "Início",
                    tabBarActiveTintColor: "#EE6928"
                }}
            />
            <Tab.Screen name="Stock" component={Stock}
                options={({ navigation }) => ({
                    headerShown: true,
                    tabBarIcon: ({ color, size }) => <Ionicons name="layers-outline" size={size} color={color} />,
                    tabBarLabel: "Estoque",
                    tabBarActiveTintColor: "#EE6928",
                    headerTitle: "Meus Estoques",
                    headerStyle: {
                        backgroundColor: "#fff",
                        height: 80,
                        paddingVertical: 5,
                    },
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 20,
                        paddingVertical: 5, // padding interno do título
                    },
                    headerTitleAlign: "center",
                })}
            />
            <Tab.Screen name="Orders" component={OrdersRoutes}

                options={({ navigation }) => ({
                    headerShown: true,
                    tabBarIcon: ({ color, size }) => <Ionicons name="clipboard-outline" size={size} color={color} />,
                    tabBarLabel: "Pedidos",
                    tabBarActiveTintColor: "#EE6928",
                    headerTitle: "Meus Pedidos",
                    headerStyle: {
                        backgroundColor: "#fff",
                        height: 80,
                        paddingVertical: 5,
                    },
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 20,
                        paddingVertical: 5, // padding interno do título
                    },
                    headerTitleAlign: "center",
                })}

            />
            <Tab.Screen name="Profile" component={User}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
                    tabBarLabel: "Perfil",
                    tabBarActiveTintColor: "#EE6928"
                }}
            />
        </Tab.Navigator>


    )
}