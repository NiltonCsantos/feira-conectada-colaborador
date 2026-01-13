import { Image, Text, View } from "react-native";
import ToggleButton from "../../shared/ToggleButton";
import useProduct from "../../../hooks/product/useProduct";
import { useEffect, useState } from "react";
import { Product } from "../../../interfaces/product";
import { FontAwesome5 } from "@expo/vector-icons";
import { useUpdateProductStatus } from "../../../hooks/product/useProductQuery";



interface CardProductProps {
  product: Product;
}

export default ({ product }: CardProductProps) => {

  console.log(product.proNrPeso);
  

  const [isOn, setIsOn] = useState(product.proBlAtivo);

  const { mutate: updateStatus } = useUpdateProductStatus();

  function handleToogle() {

    updateStatus({
      id: product.proNrId,
      ativo: !isOn,
    });
    setIsOn(!isOn);

  }

  return (
    <View className="px-4  mb-4">
      <View
        className="w-full h-32 rounded-xl overflow-hidden"
        style={{
          backgroundColor: "#fff", // necessário para a sombra aparecer
          elevation: 12,           // quanto maior, mais intensa a sombra
        }}
      >
        <View className="flex-1 flex-row gap-5">

          <View className="h-32 w-32">
            {product.ipTxImagem == null ? (
              <View className="h-full w-full justify-center items-center">
                <FontAwesome5 name="ban" size={90} color="#666" />
              </View>
            ) : (
              <Image source={{ uri: product.ipTxImagem }} className="h-full w-full" />
            )}
          </View>
          <View className="pt-2">
            <Text className="font-title-main text-2xl">
              {product.proTxNome}
            </Text>
            <Text className="text mt-2">
              Disponíveis:
            </Text>
            <Text>
              {product.proNrQuantidade ? product.proNrQuantidade : product.proNrPeso + ' KG'}
            </Text>
            <Text className="text">
              Estoque: {product.estNrId}
            </Text>
          </View>

          <View className="flex-1 justify-start items-end px-5 py-2">
            <Text className="text-xl font-title-main">
              {product.proNrPreco} R$
            </Text>
            <View className="flex-1 justify-center items-end w-full pb-2 ">
              <ToggleButton isActive={isOn} onPress={handleToogle} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
