import { Dimensions, FlatList, Text, View } from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Card from "../../components/Salles/Card";
import { SafeAreaView } from "react-native-safe-area-context";
import useSalles from "../../hooks/salles";
import { useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "../../context/AuthContext";


const chartConfig = {
    backgroundGradientFrom: "#0D1F33",   // fundo azul escuro
    backgroundGradientFromOpacity: 0.8,
    backgroundGradientTo: "#1A3D66",     // fundo azul médio
    backgroundGradientToOpacity: 0.9,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // branco puro para barras
    strokeWidth: 2,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,     // leve sombra para destaque
};



const { width, height } = Dimensions.get('screen');



export default () => {


    const { navigateToSales, findMetrics, metrics, products, findProducts } = useSalles();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        findMetrics();
        findProducts();
    }, [])



    const data = {
        labels: ["Aportes", "Vendas", "Lucro"],
        datasets: [
            {
                data: [metrics.estNrInvestimento, metrics.totalVendas, metrics.diferencaInvestimentoVendas < 0 ? 0 : metrics.diferencaInvestimentoVendas],
                // cores para cada barra (necessário para sombra)
                colors: [
                    (opacity = 1) => `rgba(255,255,255,${opacity})`,
                    (opacity = 1) => `rgba(255,255,255,${opacity})`,
                    (opacity = 1) => `rgba(255,255,255,${opacity})`,
                ],
            },
        ],
    };


    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="gap-5 px-5">
                <Text className="font-title-main text-title-main">
                    Meus investimentos
                </Text>
                <BarChart
                    data={data}
                    width={width / 1.1}
                    height={280}
                    yAxisLabel=""
                    yAxisSuffix=""  // ✅ adicione isto
                    chartConfig={chartConfig}
                    verticalLabelRotation={0}
                    fromZero={true}
                />

                <View className="gap-5 py-5">
                    <Text className="font-title-main text-title-main">
                        Meus Produtos em alta
                    </Text>

                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.proNrId.toString()}
                        renderItem={({ item }) => <Card product={item}
                        />}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 10,
                            paddingBottom: 20,
                        }}
                        ItemSeparatorComponent={() => <View style={{ width: 15, height: 15 }} />}
                        style={{ paddingBottom: 150, width: "100%", height: height }}
                    />

                </View>

            </View>
        </SafeAreaView>
    )
}