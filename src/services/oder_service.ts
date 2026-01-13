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
import { Order, QuantityOrder } from "../interfaces/orderProduct";


export default class OrderService {

  findQuantityOrders(): Promise<AxiosResponse<QuantityOrder[]>> {
    return api.get('pedidos/vendedores/contabilizar');
  }

  findOrders(status: string): Promise<AxiosResponse<Pageable<Order>>> {
    return api.get('pedidos', { params: { pedTxStatus: status } })
  }

  updateStatus(pedNrId: number): Promise<void> {
    return api.patch(`pedidos/${pedNrId}`)
  }

  cancel(pedNrId: number) {
    return api.patch(`pedidos/cancelar/${pedNrId}`)
  }

}