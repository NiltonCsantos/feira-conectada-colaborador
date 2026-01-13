import { useNavigation } from "@react-navigation/native";
import ProductService from "../../services/product_service";
import { useState } from "react";
import { Metrics, Product } from "../../interfaces/product";

export default function useSalles() {

    const productService = new ProductService();
    const navigation = useNavigation();
    const [metrics, setMetrics] = useState<Metrics>({
        estNrInvestimento: 0,
        totalVendas: 0,
        diferencaInvestimentoVendas: 0,
    });


    const [products, setProducts] = useState<Product[]>([])

    function navigateToSales() {
        navigation.navigate("Salles")
    }

    async function findProducts(venNrId: number | null = null) {
        const response = await productService.findAllInHighlight(venNrId);
        setProducts(response.data)
    }

    function navigateToMetrics() {
        navigation.navigate("Metrics")
    }

    async function findMetrics() {
        const response = await productService.findAllMetrics();
        setMetrics(response.data)
    }

    return { navigateToSales, navigateToMetrics, findProducts, products, findMetrics, metrics }
}