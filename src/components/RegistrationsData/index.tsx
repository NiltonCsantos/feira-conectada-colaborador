import { AntDesign } from "@expo/vector-icons"
import { SafeAreaView, Text, View } from "react-native"
import style from "./style"
import Title from "../Auth/Title"
import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import InputBox from "../Auth/InputBox"
import { TextInput } from "react-native-paper"
import useAuth from "../../hooks/useAuth"
import ProgressLoader from "../shared/ProgressLoader"

export default () => {

    const { user } = useContext(AuthContext)
    const [text, setText] = React.useState(user?.usuTxNome);

    const { editDataUser, load } = useAuth()

    const handleConfirm = () => {
        if (text) {
            editDataUser(text)
        }
    }

    return (
        <SafeAreaView style={style.container}>

            <Text style={{ fontWeight: 'bold', fontSize: 20, fontStyle: 'italic', padding: 10 }}>
                Meus Dados
            </Text>


            {load ? (
                <ProgressLoader />
            ) : (
                <View style={style.content}>
                    <View style={{ width: '100%' }}>


                        <TextInput
                            label="Nome"
                            value={text} // Associe o valor do TextInput ao estado
                            onChangeText={setText} // Atualize o estado sempre que o texto mudar
                            style={{
                                backgroundColor: '#fff',
                                borderBottomColor: 'transparent',
                                width: '100%',
                                paddingHorizontal: 10,
                            }}
                            theme={{
                                colors: {
                                    primary: '#000',
                                    text: '#000',
                                    placeholder: 'gray',
                                    background: 'white',
                                },
                            }}
                            right={<TextInput.Icon icon="pencil" />}
                            onSubmitEditing={handleConfirm}
                            returnKeyType="done"
                        />


                    </View>


                    <View style={style.data}>
                        <Text>
                            {user?.usuTxEmail}
                        </Text>
                    </View>

                </View>
            )
            }

        </SafeAreaView >
    )
}