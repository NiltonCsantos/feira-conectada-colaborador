import { AxiosResponse } from "axios";
import { Address } from "../interfaces/addres";
import { OrderProductDto } from "../interfaces/orderProduct";
import { OrderProductForm } from "../interfaces/orderProductForm";
import { Pageable } from "../interfaces/shared/Pageable";
import {
  Niche,
  Product,
  ProductFilter,
  Seller,
  SellerFilter,
} from "../interfaces/product";
import { User } from "../interfaces/user";
import { UserEdit } from "../interfaces/userEdit";
import api from "./api";
import { tokens } from "react-native-paper/lib/typescript/styles/themes/v3/tokens";
import { userRegister } from "../interfaces/userRegister";
import { Stock } from "../interfaces/management/Stock";

export interface idRequest {
  id: number;
}

export interface nicheResquets {
  nicTxNome: string;
  nicNrId: number;
  venNrId: number;
}

export interface RefrashTokenRequest {
  refrashToken: string;
}

export interface Response {
  acessToken: string;
  refreshToken: string;
}

export default class UserData {
  createAcount(params: userRegister) {
  }

  editUserData(params: UserEdit): Promise<AxiosResponse<User>> {
    return api.put("usuarios", params);
  }

  findAllAdressesOfUsers(): Promise<AxiosResponse<Pageable<Address>>> {
    var res = api.get("/usuarios/enderecos");
    return res;
  }

  async findAddressOfUser(): Promise<AxiosResponse<Pageable<Address>>> {
    const res = api.get("/usuarios/enderecos");
    return res;
  }


  associateAddresToUser(endnrId: number) {
    return api.post(`usuarios-associar-enderecos/${endnrId}`);
  }

  updateTokenExpo(expoToken: string) {

    type expoToken = {
      token: string;
    };

    const expo: expoToken = { token: expoToken };
    return api.patch(`/usuarios/atualizar-token`, {
      ...expo,
    });
  }


}
