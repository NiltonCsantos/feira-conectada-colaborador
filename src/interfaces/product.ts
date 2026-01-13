import { NicheEnum } from "../enums/niche-enum";

export interface Product {
  proNrId: number;
  proTxNome: string;
  proNrPreco: number;
  proNrQuantidade: number;
  estNrId: number;
  proBlAtivo: boolean;
  ipTxImagem: string;
  proNrPeso:number
}

export interface Metrics {
    estNrInvestimento: number;
    totalVendas: number;
    diferencaInvestimentoVendas: number;
}


export interface ProductForm {
  proNrId?: number;
  proTxNome: string;
  proNrPreco: number;
  proNrQuantidade: number | null;
  proNrPeso:number | null,
  estNrId: number;
  ipTxImagem:string
}

export interface ProductFilter {
  proTxNome?: string;
  proNrPreco?: number;
  nicNrId?: number;
  venNrId?: number;
  endNrId?: number;
  nicTxNome?: NicheEnum;
}


export interface Niche {
  nicNrId: number;
  nicTxNome: string;
}
