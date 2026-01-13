
import { AxiosResponse } from "axios";

import api from "../data/api";
import { Pageable } from "../interfaces/shared/Pageable";
import { Stock, StockForm } from "../interfaces/management/Stock";
import { PageRequest } from "../interfaces/shared/PageRequest";
import { Metrics, Product, ProductForm } from "../interfaces/product";


export default class ProductService {

  findProducts(params: PageRequest): Promise<AxiosResponse<Pageable<Product>>> {
    return api.get('vendedores/produtos', { params });
  }

  cadastreProducts(form: ProductForm): Promise<void> {
    const formData = new FormData();

    formData.append("proTxNome", form.proTxNome);
    formData.append("proNrPreco", String(form.proNrPreco));
    formData.append("estNrId", String(form.estNrId));

    if (form.proNrQuantidade != null)
      formData.append("proNrQuantidade", String(form.proNrQuantidade));

    if (form.proNrPeso)
      formData.append("proNrPeso", String(form.proNrPeso));

    console.log("Teste");
    console.log(form.proNrQuantidade);
    console.log(form.proNrPeso);




    const fileName = form.ipTxImagem.split("/").pop() ?? "image.jpg";
    const fileType = fileName.endsWith(".png")
      ? "image/png"
      : "image/jpeg";

    formData.append("imagemProduto", {
      uri: form.ipTxImagem,
      name: fileName,
      type: fileType,
    } as any);

    return api.post("produtos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }


  updateProducts(form: ProductForm): Promise<void> {
    return api.post('produtos', form);
  }


  updateStatus(proNrId: number): Promise<number> {
    return api.patch(`/produtos/${proNrId}`);
  }

  findAllInHighlight(venNrId: number | null): Promise<AxiosResponse<Product[]>> {
    return api.get('produtos-em-alta', { params: { venNrId: venNrId } });
  }

  findAllMetrics(): Promise<AxiosResponse<Metrics>> {
    return api.get('vendedores/metricas');
  }

}