
export interface Order {
  pedNrId: number;
  pedDtCriado: Date; 
  pedNrValorTotal: number;
  usuTxNome: string;
  pedTxStatus: OrderStatusEnum;
  pedidosProdutos:ProductsOrders[]
}

interface ProductsOrders{
   proTxNome: string;          
  ppNrQuantidade: number;    
  proNrPreco: number;  
}

export interface QuantityOrder {
  pedNrQuantidade: number;
  pedTxStatus: OrderStatusEnum;
}


export enum OrderStatusEnum {
  CRIADO = "Criado",
  EM_PREPARACAO = "Em preparação",
  CANCELADO = "Cancelado",
  FINALIZADO = "Finalizado",
}
