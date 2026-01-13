import { authResponse } from "../interfaces/authResponse";
import { User } from "../interfaces/user";
import { UserLogin } from "../interfaces/userLogin";
import Api from "../data/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Address } from "../interfaces/addres";
import { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { Seller } from "../interfaces/auth/auth";


export default class AuthService {

    signin(params: UserLogin): Promise<void> {
        return Api.post("auth/registrar-usuarios", params);
    }


    async login(params: UserLogin): Promise<User> {
        try {
            const res = await Api.post<authResponse>("auth/login", params);

            const data = res.data;
            const decoded = this.decodeToken(data.acessToken);

            await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(decoded.usuario));
            await AsyncStorage.setItem('@RNAuth:acesstoken', data.acessToken);
            await AsyncStorage.setItem('@RNAuth:refreshtoken', data.refreshToken);

            return decoded.usuario as User;

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    }



    private decodeToken(token: string) {
        try {
            const base64Url = token.split('.')[1]; // Extrai a parte do payload
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Corrige o formato Base64
            const jsonPayload = JSON.parse(atob(base64)); // Decodifica Base64 e converte para JSON
            return jsonPayload;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
        }
    }

    async findAddressOfUser(): Promise<Address[]> {
        try {            
            const addresses: Address[] = (await Api.get("/usuarios/enderecos")).data.content;
            console.log("ENDEREÇOS AO LOGAR");
            if (addresses.length > 0) {
                await AsyncStorage.setItem("@RNAuth:addresses", JSON.stringify(addresses));
            }
            return addresses;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async findDataUser(venNrId:number): Promise<AxiosResponse<Seller>> {
        try {            
            return (await Api.get(`/vendedores/${venNrId}`));
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}