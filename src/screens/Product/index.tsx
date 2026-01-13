import { SafeAreaView } from "react-native-safe-area-context"
import SearchBar from "../../components/shared/SearchBar"
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native"
import CardProduct from "../../components/Management/CardProduct"
import StockSkeleton from "../../components/shared/StockSkeleton"
import { useProductQuery } from "../../hooks/product/useProductQuery"
import { useEffect, useMemo } from "react"
import { Product } from "../../interfaces/product"
import FormButton from "../../components/shared/FormButton"
import useProduct from "../../hooks/product/useProduct"

export default () => {
    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, refetch, isStale } = useProductQuery();
    const {navigateToFomrProduct} = useProduct()

    const products: Product[] = useMemo<Product[]>(() => {
        if (!data?.pages) return [];

        const allStocks = data.pages.flatMap(page => page.data);

        const uniqueStocksMap = new Map<number, Product>();
        allStocks.forEach(product => {
            if (!uniqueStocksMap.has(product.proNrId)) {
                uniqueStocksMap.set(product.proNrId, product);
            }
        });

        return Array.from(uniqueStocksMap.values());
    }, [data]);

    useEffect(()=>{
        refetch()
    },[isStale])

    return (
        <SafeAreaView className="flex-1 bg-white">

            <View className="px-5">
                <SearchBar placeholder="Buscar meus produtos" />
            </View>

            {isFetching ? (
                <View className="p-5">
                    <StockSkeleton />
                </View>
            ) : (
                <FlatList
                    style={{paddingVertical:15}}
                    data={products}
                    keyExtractor={(item) => item.proNrId.toString()}
                    renderItem={({ item }) => <CardProduct product={item} />}
                    onEndReached={() => {
                        if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                        }
                    }}
                    onEndReachedThreshold={0.7}
                    refreshControl={
                        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
                    }
                    ListFooterComponent={
                        isFetchingNextPage ? (
                            <ActivityIndicator
                                size="large"
                                style={{ transform: [{ scale: 1.8 }] }}
                            />
                        ) : null
                    }
                />
            )}

            <FormButton onPress={navigateToFomrProduct}/>

        </SafeAreaView>
    )
}