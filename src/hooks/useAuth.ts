import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useContext, useState } from "react";
import { Platform } from "react-native";
import * as Yup from "yup";

// ==== Interfaces e serviços ====
import { AuthContext } from "../context/AuthContext";
import UserData from "../data/userData";
import { RootStackParamList } from "../interfaces/navigationTypes";
import { Seller } from "../interfaces/product";
import { UserEdit } from "../interfaces/userEdit";
import { UserLogin } from "../interfaces/userLogin";
import { userRegister } from "../interfaces/userRegister";
import AuthService from "../services/auth";
import { showToast } from "../services/toast";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { User } from "../interfaces/user";

export default function useAuth() {
  // ===============================
  // 🔹 Configuração de navegação
  // ===============================
  type ScreenProp = NativeStackNavigationProp<RootStackParamList, "Main">;
  const navigation = useNavigation<ScreenProp>();

  // ===============================
  // 🔹 Contexto e instâncias
  // ===============================
  const { setuser } = useContext(AuthContext);
  const userData = new UserData();
  const authService = new AuthService();
  // ===============================
  // 🔹 Estados gerais
  // ===============================
  const [load, setLoad] = useState<boolean>(false);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [seller, setSeller] = useState<User | null>(null);

  // ===============================
  // 🔹 Estados de formulários
  // ===============================
  const [formRegister, setFormRegister] = useState<userRegister>({
    usuTxNome: "",
    usuTxSenha: "",
    usuTxEmail: "",
    confirmPassword: "",
  });

  const [formLogin, setFormLogin] = useState<UserLogin>({
    usuTxEmail: "",
    usuTxSenha: "",
  });

  // ===============================
  // 🔹 Validações (Yup)
  // ===============================

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validationSchemaLogin = Yup.object().shape({
    usuTxEmail: Yup.string()
      .required("Email é obrigatório")
      .email("Email inválido"),

    usuTxSenha: Yup.string()
      .required("Senha é obrigatória")
      .min(8, "Senha deve ter pelo menos 6 caracteres")
      .matches(/[a-zA-Z]/, "Senha deve conter pelo menos uma letra")
      .matches(/[0-9]/, "Senha deve conter pelo menos um número"),
  });

  // ===============================
  // 🔹 Manipulação de formulários
  // ===============================
  function handleChangeRegister(key: keyof userRegister, value: string): void {
    setFormRegister({ ...formRegister, [key]: value });
  }

  function handleChangeLogin(key: keyof UserLogin, value: string): void {
    setFormLogin({ ...formLogin, [key]: value });
  }

  // ===============================
  // 🔹 Registro e autenticação
  // ===============================
  function onRegister(): void {
    authService.signin(formRegister)
      .then(() => {
        showToast({ title: 'Usuário cadastrado com sucesso!', type: 'success' })
        navigateToLogin()
      })
  }

  // ===============================
  // 🔹 Navegação
  // ===============================
  function navigateToForget() {
    navigation.navigate("ForgetPassword");
  }

  function navigateToCadastre() {
    navigation.navigate("Cadastre");
  }

  function navigateToProductsFromSeller({
    ivTxImagem,
    usuTxNome,
    venNrId,
    venTxNicho,
    venTxNumeroLoja,
    nicTxNome,
  }: Seller) {
    const sellerObj: Seller = {
      ivTxImagem,
      usuTxNome,
      venNrId,
      venTxNicho,
      venTxNumeroLoja,
      nicTxNome,
    };
    navigation.navigate("ProductsFromSeller", { seller: sellerObj });
  }

  function navigateToMain() {
    navigation.navigate("Main");
  }

  function navigateToOrders() {
    navigation.navigate("Orders");
  }

  function navigateToErrorLogin() {
    navigation.navigate("ErrorConnect");
  }

  function navigateToNiches(id: number) {
    navigation.navigate("Niches", { venNrId: id });
  }

  function navigateToLogin() {
    navigation.navigate("Login");
  }

  function navigateToCart() {
    navigation.navigate("Cart");
  }

  function clearStackRoutes() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Main" }],
      })
    );
  }

  // ===============================
  // 🔹 Logout
  // ===============================
  function signout() {
    setIsLogout(true);

    setTimeout(() => {
      setuser(null);
      AsyncStorage.clear();
    }, 800);
  }

  // ===============================
  // 🔹 Notificações Push
  // ===============================
  function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
  }

  async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      }).catch((e) => alert("Erro ao configurar canal: " + e));
    }

    if (!Device.isDevice) {
      handleRegistrationError("É necessário um dispositivo físico para notificações push");
      return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      handleRegistrationError("Permissão negada para notificações push");
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      handleRegistrationError("Project ID não encontrado");
      return;
    }

    try {
      const pushTokenString = (await Notifications.getDevicePushTokenAsync()).data;
      console.log("Expo Push Token:", pushTokenString);
      await userData.updateTokenExpo(pushTokenString);
      return pushTokenString;
    } catch (error) {
      handleRegistrationError(`${error}`);
    }
  }

  // ===============================
  // 🔹 Editar dados do usuário
  // ===============================
  async function editDataUser(usuTxNome: string) {
    setLoad(true);
    try {
      const params: UserEdit = { usuTxNome };
      const res = (await userData.editUserData(params)).data;

      await AsyncStorage.setItem("@RNAuth:user", JSON.stringify(res));
      setUser(res);
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      throw error;
    } finally {
      setLoad(false);
    }
  }


function useSellerQuery(): UseQueryResult<Seller> {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const userString = await AsyncStorage.getItem('@RNAuth:user');

      const user = JSON.parse(userString as string);
      
      return (await authService.findDataUser(user.usuNrId)).data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}




  // ===============================
  // 🔹 Retorno do Hook
  // ===============================
  return {
    formRegister,
    formLogin,
    load,
    isLogout,
    handleChangeRegister,
    handleChangeLogin,
    onRegister,
    validateEmail,
    navigateToForget,
    navigateToCadastre,
    navigateToProductsFromSeller,
    navigateToMain,
    navigateToOrders,
    navigateToErrorLogin,
    navigateToNiches,
    navigateToLogin,
    navigateToCart,
    signout,
    clearStackRoutes,
    registerForPushNotificationsAsync,
    editDataUser,
    ... useSellerQuery()
  };
}
