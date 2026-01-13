import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CardStock from "../../components/Management/CardStock"
import FormButton from "../../components/shared/FormButton"
import useOrders from "../../hooks/stock/useStock"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { Stock } from "../../interfaces/management/Stock"
import StockSkeleton from "../../components/shared/StockSkeleton"

export default () => {
    const { data, refetch, isFetching, isStale, hasNextPage, isFetchingNextPage, fetchNextPage, navigateToForm } = useOrders();

    const stocks: Stock[] = useMemo<Stock[]>(() => {
        if (!data?.pages) return [];

        const allStocks = data.pages.flatMap(page => page.data);

        const uniqueStocksMap = new Map<number, Stock>();
        allStocks.forEach(stock => {
            if (!uniqueStocksMap.has(stock.estNrId)) {
                uniqueStocksMap.set(stock.estNrId, stock);
            }
        });

        return Array.from(uniqueStocksMap.values());
    }, [data]);

    useFocusEffect(
        useCallback(() => {
            if (isStale) refetch();
        }, []) // 👈 SEM dependências
    );

    return (
        <SafeAreaView className="flex-1 bg-white">

            {isFetching ? (
                <View className="p-5">
                    <StockSkeleton />
                </View>
            ) : (
                <FlatList
                    data={stocks} // 🔹 usar array estável
                    keyExtractor={(item) => item.estNrId.toString()} // 🔹 chave única
                    renderItem={({ item }) => <CardStock stock={item} />}
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
            <FormButton onPress={() => navigateToForm()} />
        </SafeAreaView>
    )
}