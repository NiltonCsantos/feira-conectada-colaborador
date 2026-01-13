import Api from "./api";
import { requestInterceptor } from "./interceptors/requestInterceptor";
import { responseErrorInterceptor } from "./interceptors/ErrorInterceptor";
import { responseInterceptor } from "./interceptors/responseInterceptor";

export const setupApiInterceptors = (
  setLoadingCount: React.Dispatch<React.SetStateAction<number>>
) => {

  console.log("SETUP");
  

  // Evita registrar interceptors múltiplas vezes (IMPORTANTE!)
  if ((Api as any)._interceptorsAlreadySet) return;
  (Api as any)._interceptorsAlreadySet = true;

  // Request → adiciona token e incrementa loading
  requestInterceptor(Api, setLoadingCount);

  // Response interceptor (sucesso)
  Api.interceptors.response.use(
    (response) => {
      setLoadingCount((prev) => Math.max(prev - 1, 0));
      return responseInterceptor(response);
    },

    // Response interceptor (erro)
    async (error) => {
      setLoadingCount((prev) => Math.max(prev - 1, 0));
      return responseErrorInterceptor(error);
    }
  );
};
