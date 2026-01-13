import { Seller } from "./product";

export type RootStackParamList = {
  Login: undefined;
  Cadastre: undefined;
  ForgetPassword: undefined;
  Main: undefined;
  Products: {
    nicTxNome: string | null;
    nicNrId: number | null;
    venNrId: number | null;
  };
  ErrorConnect: undefined;
  Niches: { venNrId: number };
  Cart: undefined;
  ProductsFromSeller: { seller: Seller };
  Orders:undefined
};
