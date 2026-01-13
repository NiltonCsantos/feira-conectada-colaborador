import { Text, TouchableOpacity, View } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import ButtonPost from "../../shared/ButtonPost";
import { Order, OrderStatusEnum } from "../../../interfaces/orderProduct";


interface Props {
    order: Order
    onCancel?: () => void;
    onConfirm?: () => Promise<void> | void;
    currentRoute?:string,
    
}


export default ({ order, onCancel, onConfirm, currentRoute }: Props) => {
    return (
        <View>

            <View className="pb-5 w-full rounded-md bg-white"
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 10, // para Android
                }}
            >

                {order && order.pedidosProdutos.length > 0 ? (
                    order.pedidosProdutos.map((produto, index) => (
                        <View
                        key={index}
                        className="flex-row justify-between pr-5">
                            <View className="p-5 gap-3">

                                <View className="gap-1">
                                    <Text className="font-bold">
                                        {produto.proTxNome}
                                    </Text>
                                    <Text className="font-medium">
                                        Quantidade: {produto.proNrPreco}
                                    </Text>
                                </View>

                                <View className="flex-row gap-2 items-center">
                                    <FontAwesome5 name="clock" size={20} color="black" />
                                    <Text>
                                        26-12-2025
                                    </Text>
                                </View>

                            </View>

                            <View className="gap-2 px-5 justify-end pb-6">
                                <Text className="font-medium">
                                    Valor: 10 R$
                                </Text>

                                <Text className="font-medium">
                                    Total: 10 R$
                                </Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text>Nenhum produto</Text>
                )}


                <View className="p-5 gap-2 items-center flex-row">
                    <View className="bg-primary h-8 w-8 rounded-full items-center justify-center">
                        <Text className="text-white">
                            N
                        </Text>
                    </View>
                    <Text>
                        Nilton César
                    </Text>
                </View>

                {currentRoute != 'CANCELADO' && currentRoute != 'FINALIZADO' &&(
                    <View className="flex-row justify-end px-5 gap-5">
                    <TouchableOpacity className="bg-red-500 p-2 rounded-md" onPress={onCancel}>
                        <Text className="text-white">
                            Cancelar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-blue-500 p-2 rounded-md" onPress={onConfirm}>
                        <Text className="text-white">
                            Confirmar
                        </Text>
                    </TouchableOpacity>
                </View>
                )}

            </View>
        </View>
    )
}