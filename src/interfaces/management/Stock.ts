export interface Stock {
    estNrId: number;
    estTxNome: string;
    estNrValor: number;
    nicTxNome: string;
}

export interface StockForm {
    estNrId?: number;
    estTxNome: string;
    estNrValor: number | null;
    nicNrId:number 
}