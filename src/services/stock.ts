
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import { decode as atob } from 'base-64';
import { Address } from "../interfaces/addres";
import { authResponse } from "../interfaces/authResponse";
import { Niche, Product } from "../interfaces/product";
import { User } from "../interfaces/user";
import { UserLogin } from "../interfaces/userLogin";

import api from "../data/api";
import { Pageable } from "../interfaces/shared/Pageable";
import { Stock, StockForm } from "../interfaces/management/Stock";
import { PageRequest } from "../interfaces/shared/PageRequest";


export default class StockService {

  findStocks(params: PageRequest): Promise<AxiosResponse<Pageable<Stock>>> {
    return api.get('vendedores/estoques', { params });
  }

  cadastreStock(form: StockForm): Promise<void> {
    return api.post('estoques', form);
  }

  findNiches(): Promise<AxiosResponse<Pageable<Niche>>> {
    return api.get('nichos');
  }

}