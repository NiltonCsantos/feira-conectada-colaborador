import axios, { AxiosError, AxiosRequestConfig, AxiosHeaders } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../api";
import { showErrorToast } from "../../utils/toastConfig";

interface AuthDto {
  acessToken: string;
  refreshToken: string;
}

export const responseErrorInterceptor = async (
  error: AxiosError & { config: AxiosRequestConfig & { _retry?: boolean } }
) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const refreshToken = await AsyncStorage.getItem("@RNAuth:refreshtoken");

      if (refreshToken) {
        const response = await axios.post<AuthDto>(
          `http://192.168.1.5:8080/v1/auth/login-com-token/${refreshToken}`
        );

        if (response.status === 200) {
          const auth = response.data;

          await AsyncStorage.setItem("@RNAuth:acesstoken", auth.acessToken);
          await AsyncStorage.setItem("@RNAuth:refreshtoken", auth.refreshToken);

          console.log("Token");
          

          Api.defaults.headers.common["Authorization"] = `Bearer ${auth.acessToken}`;

          // ---------------------------
          // 🔧 CORREÇÃO AQUI
          // ---------------------------
          
          if (originalRequest.headers) {
            originalRequest.headers.set(
              "Authorization",
              `Bearer ${auth.acessToken}`
            );
          } else {
            originalRequest.headers = AxiosHeaders.from({
              Authorization: `Bearer ${auth.acessToken}`,
            });
          }
          // ---------------------------

          return Api(originalRequest);
        }
      }
    } catch (e) {
      console.error("Erro ao tentar refresh token:", e);
      showErrorToast("Sessão expirada. Faça login novamente.");
    }
  }

  const msg =
    (error.response?.data as any)?.message ||
    error.message ||
    "Erro inesperado. Tente novamente.";

  showErrorToast(msg);
  console.log("Erro API:", msg);

  return Promise.reject(error);
};
