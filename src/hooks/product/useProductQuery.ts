import { InfinitPage } from "../../interfaces/shared/InfinitePage";
import { QueryFunctionContext, queryOptions, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, ProductForm } from "../../interfaces/product";
import ProductService from "../../services/product_service";
import { PageRequest } from "../../interfaces/shared/PageRequest";
import useToast from "../shared/useToast";

const productService = new ProductService();
const { sucess } = useToast();

export const PRODUCTS_QUERY_KEY = ["products"];


export function useProductQuery() {

    async function fetchData(context: QueryFunctionContext): Promise<InfinitPage<Product>> {
        const page = (context.pageParam as number) ?? 0;
        const response = await productService.findProducts(PageRequest.of({ page }));
        return new InfinitPage(response.data.number, response.data.totalPages, response.data.content);
    }

    const productQuery = useInfiniteQuery<InfinitPage<Product>, Error>({
        queryKey: [PRODUCTS_QUERY_KEY],
        initialPageParam: 0,
        queryFn: fetchData,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.isLastPage ? undefined : pages.length;
        },
        staleTime: 10_800_000,
        gcTime: 10_800_000,
        refetchOnWindowFocus: false,
        refetchOnMount: "always",  
    });

    return { ...productQuery }
}


type UpdateProductStatusDTO = {
    id: number;
    ativo: boolean;
};

export function useUpdateProductStatus() {

    const queryClient = useQueryClient();

    return useMutation<number, Error, UpdateProductStatusDTO>({
        mutationFn: async ({ id, ativo }) => {
            await productService.updateStatus(id);
            return id;
        },

        onSuccess: (updatedId, variables) => {
            sucess(
                variables.ativo
                    ? "Produto ativo com sucesso!"
                    : "Produto inativo com sucesso!"
            );
            queryClient.setQueryData([PRODUCTS_QUERY_KEY], (oldData: any) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        content: page.content.map((product: Product) =>
                            product.proNrId === updatedId
                                ? { ...product, proBlAtivo: variables.ativo }
                                : product
                        ),
                    })),
                };
            });
        },
    });
}
