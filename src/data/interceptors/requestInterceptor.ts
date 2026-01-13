import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosInstance, AxiosHeaders } from "axios";

export const requestInterceptor = (
  Api: AxiosInstance,
  setLoadingCount: React.Dispatch<React.SetStateAction<number>>
) => {
  Api.interceptors.request.use(
    async (config) => {

      if (config.method === 'post')
        setLoadingCount((prev) => prev + 1);

      const token = await AsyncStorage.getItem("@RNAuth:acesstoken");

      console.log("Tokenfilter");


      if (token) {
        // garante que headers existe e é AxiosHeaders
        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }

        config.headers.set("Authorization", `Bearer ${token}`);
      }

      return config;
    },
    (error) => {
      if (error.config?.method === 'post') {
        setLoadingCount(prev => Math.max(prev - 1, 0));
      }

      return Promise.reject(error);
    }
  );
};
