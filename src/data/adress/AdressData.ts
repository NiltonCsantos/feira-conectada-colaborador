import { Address } from "../../interfaces/addres";
import { Pageable } from "../../interfaces/shared/Pageable";
import api from '../api'
import { AxiosResponse } from "axios";
import { AdressFilter } from "./AdressFilter";

export default class AdressData{


findAllAdresses(filter:AdressFilter): Promise<AxiosResponse<Pageable<Address>>> {
  console.log("cvhamou");
    return api.get("/enderecos");
  }
}