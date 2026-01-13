import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import Login from "../../components/Auth/Login";

import { StatusBar } from "react-native";

import Cadastre from "../../components/Auth/Cadastre";
import Redefine from "../../components/Auth/RedefinePass/Redefine";
import ForgetPassword from "../../pages/ForgetPassword";
import Start from "../../components/Auth/Start";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor={"transparent"} />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />

        <Stack.Screen name="Redefine" component={Redefine} />
        <Stack.Screen name="Cadastre" component={Cadastre} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
