import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { InfinitPage } from "../../interfaces/shared/InfinitePage";
import { QueryFunctionContext, queryOptions, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Product, ProductForm } from "../../interfaces/product";
import { PageRequest } from "../../interfaces/shared/PageRequest";
import * as Yup from "yup";
import { SaleUnitTypeEnum } from "../../enums/SaleUnitTypeEnum";
import useChangeInput from "../shared/useChangeInput";
import StockService from "../../services/stock";
import ProductService from "../../services/product_service";
import useToast from "../shared/useToast";
import { PRODUCTS_QUERY_KEY } from "./useProductQuery";

export default function useProduct() {

    const navigation = useNavigation();
    const [form, setForm] = useState<Partial<ProductForm>>({
        proNrQuantidade: null,
        proNrPeso: null
    });
    const { handleChange } = useChangeInput<ProductForm>(setForm);
    const [image, setImage] = useState<string>("");
    const [selectedRadius, setSelectedRadius] = useState<SaleUnitTypeEnum>(SaleUnitTypeEnum.UN);
    const productService = new ProductService();
    const { sucess } = useToast();
    const stockService: StockService = new StockService();
     const queryClient = useQueryClient();

    const productSchema = Yup.object().shape({
        name: Yup.string()
            .required('O nome é obrigatório')
            .min(3, 'O nome deve ter pelo menos 3 caracteres'),

        price: Yup.number()
            .typeError('Informe um valor válido')
            .required('O valor é obrigatório')
            .positive('O valor deve ser maior que zero'),

        image: Yup.string()
            .required('A imagem é obrigatória'),

        saleUnit: Yup.mixed<SaleUnitTypeEnum>()
            .oneOf([SaleUnitTypeEnum.UN, SaleUnitTypeEnum.KG])
            .required('Selecione o tipo de venda'),

        quantity: Yup.number()
            .when('saleUnit', {
                is: SaleUnitTypeEnum.UN,
                then: schema =>
                    schema
                        .typeError('Informe uma quantidade válida')
                        .required('A quantidade é obrigatória')
                        .integer('A quantidade deve ser inteira')
                        .min(1, 'Quantidade mínima é 1'),
                otherwise: schema => schema.notRequired(),
            }),

        weight: Yup.number()
            .when('saleUnit', {
                is: SaleUnitTypeEnum.KG,
                then: schema =>
                    schema
                        .typeError('Selecione um peso válido')
                        .required('O peso é obrigatório'),
                otherwise: schema => schema.notRequired(),
            }),
    });


    const isFormValid = () => {
        // campos sempre obrigatórios
        if (!form.proTxNome || form.proTxNome.trim().length < 3) return false;
        if (!form.proNrPreco || form.proNrPreco <= 0) return false;
        if (!image) return false;
        if (!form.estNrId) return false;

        // regras condicionais
        if (selectedRadius === SaleUnitTypeEnum.UN) {
            if (!form.proNrQuantidade || form.proNrQuantidade < 1) return false;
        }

        if (selectedRadius === SaleUnitTypeEnum.KG) {
            if (!form.proNrPeso) return false;
        }

        return true;
    };


    function navigateToProduct() {
        navigation.navigate("Product");
    }

    function navigateToFomrProduct() {
        navigation.navigate("FormProduct");
    }


    async function getStocks() {
        return (await stockService.findStocks({ page: 0, size: 10000 })).data.content
    }

    async function cadastreProduct() {
       
        const completeForm: ProductForm = {
            proTxNome: form.proTxNome!,
            proNrPreco: form.proNrPreco!,
            proNrQuantidade: form.proNrQuantidade!,
            estNrId: form.estNrId!,
            proNrPeso: form.proNrPeso!,
            ipTxImagem: image
        };

        try {
            await productService.cadastreProducts(completeForm);
            setForm({});
            sucess("Estoque cadastrado!")

            await queryClient.invalidateQueries({
                queryKey: [PRODUCTS_QUERY_KEY],
            });
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao cadastrar estoque:", error);
        }
    }

    return {
        navigateToProduct, navigateToFomrProduct, form, handleChange, getStocks, setForm,
        selectedRadius, setSelectedRadius, image, setImage, isFormValid, cadastreProduct
    }
}
