import { Button, Text, TouchableOpacity, View } from "react-native"
import style from "../style";

import { Address } from "../../../interfaces/addres";
import useAddres from "../../../hooks/useAddres";


export default (address: Address) => {

    const { selectLocation } = useAddres();

    return (
        <TouchableOpacity
            style={[{ backgroundColor: address.endNrId % 2 == 0 ? '#E6591C' : '#4A52C4FF', width: '100%', borderRadius: 8 }, style.itemList]}
            onPress={() => console.log(selectLocation(address))}
        >
            <View>
                <View style={{ gap: 10 }}>
                    <Text style={{ color: '#fff', fontWeight:'900' }}>
                        {address.endTxNome} - {address.endTxEstado}
                    </Text>
                    <Text style={{ color: '#fff' }}>
                        Cep: {address.endTxCep}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}