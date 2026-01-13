import { Text, View } from "react-native";
import { Stock } from "../../../interfaces/management/Stock";

interface CardStockProps {
  stock: Stock;
}

export default function CardStock({ stock }: CardStockProps) {
  return (
    <View className="px-5 mb-4">
      <View className="bg-dev w-full h-44 rounded-xl shadow-md overflow-hidden">
        {/* Conteúdo central */}
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-white font-title-main text-2xl">
            {stock.estTxNome}
          </Text>
          <Text className="text-white font-medium text-lg mt-2">
            Investimento: {stock.estNrValor} R$
          </Text>
        </View>

        <View className="items-end pr-4 pb-3">
          <Text className="text-white font-medium text-base">
            {stock.nicTxNome}
          </Text>
        </View>
      </View>
    </View>
  );
}
