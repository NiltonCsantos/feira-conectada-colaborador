import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { StatusBar, TouchableOpacity } from "react-native";


import Wellcome from "../../components/wellcome";
import { AuthContext } from "../../context/AuthContext";
import Address from "../../pages/Address";
import DataUser from "../../pages/DataUser";
import Payment from "../../pages/Payment";
import Tab from "../tab";
import FormStock from "../../screens/Stock/Form";
import { Ionicons } from "@expo/vector-icons";
import FormProduct from "../../screens/Product/Form";
import Product from "../../screens/Product";
import Salles from "../../screens/Salles";
import Metrics from "../../screens/Metrics";
import Main from "../../pages/Main";
import Home from "../../screens/Home";

const Stack = createNativeStackNavigator();

export default () => {
  const { isAddress } = useContext(AuthContext);

  console.log("ADDRES NAS ROTAS: ");
  console.log(isAddress);


  const navigationRef = React.useRef<any>(null);

  // Auto redirect quando isAddress muda
  useEffect(() => {
    if (navigationRef.current) {
      if (isAddress) {
        // Redireciona para a stack principal e limpa a stack anterior
        navigationRef.current.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      } else {
        // Redireciona para Welcome se isAddress for false
        navigationRef.current.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        });
      }
    }
  }, [isAddress]);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right", }
        }>

        <>
          <Stack.Screen name="Main" component={Tab} />
          <Stack.Screen name="Salles" component={Salles}
            options={() => ({
              headerShown: true,
              headerTitle: "Produtos em alta",
              headerStyle: {
                backgroundColor: "#fff",
                height: 80,
                paddingVertical: 5,
              },
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
                paddingVertical: 5,
              },
              headerTitleAlign: "center",
            })}
          />

           <Stack.Screen name="Metrics" component={Metrics}
            options={() => ({
              headerShown: true,
              headerTitle: "Produtos em alta",
              headerStyle: {
                backgroundColor: "#fff",
                height: 80,
                paddingVertical: 5,
              },
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
                paddingVertical: 5,
              },
              headerTitleAlign: "center",
            })}
          />

          <Stack.Screen name="DataUser" component={DataUser} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="FormStock"
            component={FormStock}
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: "Meus Estoques",
              headerStyle: {
                backgroundColor: "#fff",
                height: 80,
                paddingVertical: 5,
              },
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
                paddingVertical: 5,
              },
              headerTitleAlign: "center",
            })}
          />

          <Stack.Screen name="Product"
            component={Product}
            options={() => ({
              headerShown: true,
              headerTitle: "Meus Produtos",
              headerStyle: {
                backgroundColor: "#fff",
                height: 80,
                paddingVertical: 5,
              },
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
                paddingVertical: 5,
              },
              headerTitleAlign: "center",
            })}
          />
          <Stack.Screen name="FormProduct"
            component={FormProduct}
            options={() => ({
              headerShown: true,
              headerTitle: "Meus Produtos",
              headerStyle: {
                backgroundColor: "#fff",
                height: 80,
                paddingVertical: 5,
              },
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
                paddingVertical: 5,
              },
              headerTitleAlign: "center",
            })}
          />



          {/* <Stack.Screen name="ErrorConnect" component={ErrorConnect}/> */}
        </>
        <>
          <Stack.Screen name="Welcome" component={Wellcome} />
          <Stack.Screen name="Location" component={Address} />
        </>

      </Stack.Navigator>
    </NavigationContainer>
  );
};
