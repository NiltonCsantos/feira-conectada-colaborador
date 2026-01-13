import { useNavigation } from "@react-navigation/native";
import UserData from "../../data/userData";
import { Stock, StockForm } from "../../interfaces/management/Stock";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import StockService from "../../services/stock";
import { Pageable } from "../../interfaces/shared/Pageable";
import { InfinitPage } from "../../interfaces/shared/InfinitePage";
import { PageRequest } from "../../interfaces/shared/PageRequest";
import { useState } from "react";
import useChangeInput from "../shared/useChangeInput";
import * as Yup from "yup";
import useToast from "../shared/useToast";
import { Niche } from "../../interfaces/product";


export default function useStock() {

    const navigation = useNavigation();
    const stockService = new StockService();
    const [loadingCount, setLoadingCount] = useState(0);
    const { sucess } = useToast();


    const [form, setForm] = useState<Partial<StockForm>>({
        nicNrId: undefined,
    });

    const { handleChange } = useChangeInput<StockForm>(setForm);
    const [errors, setErrors] = useState<
        Partial<Record<keyof StockForm, string>>
    >({});


    const stockSchema = Yup.object({
        estTxNome: Yup.string().required("Nome é obrigatório"),
        estNrValor: Yup.number()
            .typeError("Valor deve ser numérico")
            .required("Valor é obrigatório")
            .positive("Valor deve ser maior que zero"),
        nicNrId: Yup.number()
            .required("Categoria é obrigatória")
            .moreThan(0, "Categoria é obrigatória"),
    });

    async function validate(): Promise<boolean> {
        try {
            await stockSchema.validate(form, { abortEarly: false });
            setErrors({});
            return true;
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const fieldErrors: Partial<Record<keyof StockForm, string>> = {};
                err.inner.forEach(e => {
                    if (e.path) {
                        fieldErrors[e.path as keyof StockForm] = e.message;
                    }
                });
                setErrors(fieldErrors);
            }
            return false;
        }
    }

    function navigateToForm() {
        navigation.navigate("FormStock");
    }

    function navigateToStock() {
        navigation.navigate("Stock");
    }

    function backToStock() {
        navigation.goBack();
    }
    async function fetchData(context: QueryFunctionContext): Promise<InfinitPage<Stock>> {
        const page = (context.pageParam as number) ?? 0;
        const response = await stockService.findStocks(PageRequest.of({ page }));
        return new InfinitPage(response.data.number, response.data.totalPages, response.data.content);
    }

    const stocksQuery = useInfiniteQuery<InfinitPage<Stock>, Error>({
        queryKey: ["stocks"],
        initialPageParam: 0,
        queryFn: fetchData,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.isLastPage ? undefined : pages.length;
        },
        staleTime: 5_000,
        gcTime: 60_000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });


    async function cadastreStock() {
        const completeForm: StockForm = {
            estTxNome: form.estTxNome!,
            estNrValor: form.estNrValor!,
            nicNrId: form.nicNrId!,
            estNrId: form.estNrId
        };

        try {
            await stockService.cadastreStock(completeForm);
            setForm({});
            sucess("Estoque cadastrado!")
            backToStock();
        } catch (error) {
            console.error("Erro ao cadastrar estoque:", error);
        }
    }

    async function getNiches(){
        console.log("Meu deus");
        
       try {
         return (await stockService.findNiches()).data.content
       } catch (error) {
        
        console.log(error);
        throw error
       }
    }
    return { navigateToForm, ...stocksQuery, errors, handleChange, form, validate, setForm, cadastreStock, navigateToStock, getNiches }
}
