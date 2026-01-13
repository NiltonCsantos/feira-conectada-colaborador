import React, { useContext, useEffect, useState } from "react";
import { Address } from "../interfaces/addres";
import UserData from "../data/userData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AdressData from "../data/adress/AdressData";

export default function useAddres() {

    const adressData = new AdressData();
    const [address, setAddress] = useState<Address[]>([]);
    const [addressSave, setAddressSave] = useState<Address[]>([]);
    const { isAddress, setIsAddres, setAddressContext } = useContext(AuthContext)
    const navigation = useNavigation();
    const userData = new UserData()

    function getFirtsAdresses() {
        adressData.findAllAdresses({endTxCep:''}).
            then((res) => {
                setAddress(res.data.content);
            })
            .catch((err) => {
                console.log("CAIU NO CATCH:", err);
            });
    }

    async function getLocationUsers() {
        try {
            const response: Address[] = (await userData.findAllAdressesOfUsers()).data.content;
            setAddress(response)
        } catch (error) {
            let errorMessage: string = ''
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || 'Erro desconhecido';
            } else {
                errorMessage = 'Erro desconhecido'
            }
        }
    }

    async function getNewLocations(endTxNome: string) {
        const response: Address[] = (await userData.findAllAdresses(endTxNome)).data.content;
        setAddress(response);
        const addressesString: string = await AsyncStorage.getItem("@RNAuth:addresses") as string;
        const addresses: Address[] = JSON.parse(addressesString);
        setAddressSave(addresses);
    }

    async function selectLocation(address: Address) {
        try {
            await AsyncStorage.setItem('@RNAuth:address', JSON.stringify(address));
            setAddressContext(address)

            const addressesString: string = await AsyncStorage.getItem("@RNAuth:addresses") as string;
            const addresses: Address[] = addressesString?JSON.parse(addressesString):[];

            if (addresses && addresses.length > 0) {


                // Verifica se o endereço já está associado ao usuário
                const containsAddress = addresses.some(storedAddress => storedAddress.endNrId === address.endNrId);

                if (!containsAddress) {
                    addresses.push(address)
                    await AsyncStorage.setItem("@RNAuth:addresses", JSON.stringify(addresses))
                    await userData.associateAddresToUser(address.endNrId);
                }
            } else {
                // Caso seja o primeiro login ou a lista de endereços esteja vazia, associa diretamente o endereço
                addresses.push(address)
                console.log("Primeiro login ou sem endereços associados previamente.");
                await AsyncStorage.setItem("@RNAuth:addresses", JSON.stringify(addresses))
                await userData.associateAddresToUser(address.endNrId);
            }

            if (!isAddress) {
                setIsAddres(true);
            }

            // navigation.navigate("Main");

        } catch (error) {
            let errorMessage: string = ''
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || 'Erro desconhecido';
            } else {
                console.log(error);

                errorMessage = 'Erro desconhecido bb'
            }
        }
    }


    async function getCurrentLocation(): Promise<Address> {
        const addressString = await AsyncStorage.getItem('@RNAuth:address');
        const address: Address = JSON.parse(addressString as string);
        return address;
    }

    return { getFirtsAdresses, getCurrentLocation, selectLocation, getNewLocations, getLocationUsers, address, addressSave }
}
