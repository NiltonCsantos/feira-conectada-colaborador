import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import './global.css';


import {
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
} from "@expo-google-fonts/roboto";

import Toast from "react-native-toast-message";

import { LoadingProvider, useLoading } from "./src/context/LoadingContext";
import { setupApiInterceptors } from "./src/data/SetupApiInterceptors";
import LoadingOverlay from "./src/components/shared/LoadingOverLay";
import { AuthProvider } from "./src/context/AuthContext";
import Routes from "./src/routes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Evita que a splash desapareça antes de tudo estar pronto
SplashScreen.preventAutoHideAsync().catch(() => { });

// =========================
// 🔔 CONFIGURAÇÃO GLOBAL DE NOTIFICAÇÕES
// =========================
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,     // Android
    shouldShowBanner: true,    // iOS (banner)
    shouldShowList: true,      // iOS (central de notificações)
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});



// =========================
// 🔔 REGISTRO DE PUSH (FCM NATIVO)
// =========================
async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    console.log("❌ Push notifications só funcionam em dispositivo físico");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert(
      "Permissão negada",
      "Ative as notificações para continuar"
    );
    return null;
  }

  // 🔥 RETORNA TOKEN FCM NATIVO
  const token = (await Notifications.getDevicePushTokenAsync()).data;
  console.log("🔥 FCM TOKEN:", token);
  return token;
}

// =========================
// 📦 APP CONTENT
// =========================
function AppContent() {


  const { setLoadingCount } = useLoading();
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  // Registro do token FCM
  useEffect(() => {
    if (!Device.isDevice) return;

    async function initPush() {
      const token = await registerForPushNotifications();
      if (token) {
        // TODO: enviar token para backend Spring Boot
        console.log("📤 Enviar token para backend:", token);
      }
    }

    initPush();
  }, []);

  // Listeners de notificações
  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("📩 Notificação recebida:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("👉 Usuário clicou na notificação:", response);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  // Interceptores da API
  useEffect(() => {
    setupApiInterceptors(setLoadingCount);
  }, [setLoadingCount]);

  return <Routes />;
}

// =========================
// 🚀 APP ROOT
// =========================
export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          Roboto_400Regular,
          Roboto_400Regular_Italic,
          Roboto_500Medium,
          Roboto_500Medium_Italic,
          Roboto_700Bold,
          Roboto_700Bold_Italic,
        });
        setIsReady(true);
      } catch (error) {
        console.error("Erro ao carregar fontes:", error);
      }
    }

    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) await SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;
  onLayoutRootView();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 1000 * 60, // 1 minuto
        refetchOnWindowFocus: true,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <AuthProvider>
          <LoadingOverlay />
          <AppContent />
        </AuthProvider>
        <Toast />
      </LoadingProvider>
    </QueryClientProvider>
    //   <View className="flex-1 items-center justify-center bg-red">

    //    {/* Quadrado */}
    //    <View className="h-16 w-16 bg-black rounded-lg" />

    //    {/* Texto */}
    //    <Text className="mt-4 text-base text-black">
    //      NativeWind funcionando 🚀
    //    </Text>

    //  </View>
  );
}
