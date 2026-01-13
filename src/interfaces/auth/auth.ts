import { Address } from "../addres";
import { User } from "../user";
import { UserLogin } from "../userLogin";

export interface AuthContextData{
    user:User | null,
    deleteUser():Promise<void>,
    signed:boolean,
    isAddress:boolean,
    addressContext:Address | null
    signin(params:UserLogin):Promise<void>,
    setIsAddres:(isAddress:boolean)=>void
    setAddressContext:(address:Address)=>void
    setuser:(user:User | null)=>void
}

export interface Seller{
    venNrId: number;          
    usuTxNome: string;
    venTxNumeroLoja: string;
    ivTxImagem: string;
    nicTxNome: string;
}