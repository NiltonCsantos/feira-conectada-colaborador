import { Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../../interfaces/user";
import useAuth from "../../../hooks/useAuth";
import { FontAwesome5 } from "@expo/vector-icons";


export default () => {

    const { data } = useAuth();

    return (
        <View className="flex-row items-center justify-start gap-5 h-32 p-5">

            <View className="h-16 w-16 bg-red-200 rounded-full items-center justify-center" >
                {data?.ivTxImagem == null ? (
                    <FontAwesome5 name="user" size={30} color="#666" />

                ) : (
                    <Image source={data?.ivTxImagem} className="w-full h-full"/>
            )}
            </View>
            <View>
                <Text className="font-bold ">
                    {data?.usuTxNome ?? 'Carregando...'}
                </Text>
                <Text>
                    Loja: {data?.venTxNumeroLoja ?? '—'}
                </Text>
            </View>
        </View>
    );
};
