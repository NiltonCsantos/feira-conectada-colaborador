
import { Button, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedForm from "../../../components/shared/AnimatedForm";
import InputBox from "../../../components/Auth/InputBox";
import ButtonPost from "../../../components/shared/ButtonPost";
import ButtomSave from "../../../components/shared/ButtomSave";
import LottieView from "lottie-react-native";
import Input from "../../../components/shared/InputText";
import Radius from "../../../components/shared/InputRadius";
import { SaleUnitTypeEnum } from "../../../enums/SaleUnitTypeEnum";
import InputImage from "../../../components/shared/InputImage";
import DropdownComponent from "react-native-element-dropdown/lib/typescript/components/Dropdown";
import { string } from "yup";
import useProduct from "../../../hooks/product/useProduct";
import useStock from "../../../hooks/stock/useStock";
import { Stock } from "../../../interfaces/management/Stock";
import { DropdownSelect } from "../../../components/shared/DropDown";


interface Kgs {
    value: number,
    label: string
}

export default () => {

    const { form, handleChange, getStocks, setForm, image, setImage, selectedRadius, setSelectedRadius, isFormValid, cadastreProduct } = useProduct();

    const [stocks, setStocks] = useState<Stock[]>([]);

    const kgs: Kgs[] = Array.from(
        { length: Math.floor((10000 - 250) / 150) + 1 },
        (_, i) => {
            const grams = 250 + i * 150;
            const valueInKg = grams / 1000;

            return {
                value: valueInKg, // SEMPRE em kg
                label: grams >= 1000
                    ? `${valueInKg}kg`
                    : `${grams}g`,
            };
        }
    );


    useEffect(() => {
        async function loadData() {
            const stocks = await getStocks();
            setStocks(stocks)
        }
        loadData();
    }, [])



    return (

        <SafeAreaView className="bg-white flex-1" style={{ paddingHorizontal: 25 }}>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -30}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        gap: 40,
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={true}
                >

                    <View className="gap-5 ">

                        <View className="justify-center items-center gap-5">
                            <LottieView
                                source={require('../../../../assets/animations/Register.json')}
                                autoPlay={true}
                                loop={true}
                                style={{ width: 150, height: 150 }}
                            />
                            <Text className="font-medium">
                                Seus produtos na palma da sua mão
                            </Text>
                        </View>

                        <Input
                            label="Nome"
                            placeholder="Digite o nome do estoque"
                            value={form.proTxNome ?? ''}
                            required
                            onChangeText={v => handleChange("proTxNome", v)}
                        />

                        <Input
                            label="Valor"
                            placeholder="Digite o valor"
                            type="number"
                            numberFormat="decimal"
                            value={form.proNrPreco != null ? String(form.proNrPreco) : ""}
                            onChangeText={v => handleChange("proNrPreco", Number(v))}
                            required
                        />

                        <InputImage value={image} onChange={setImage} label="Selecione uma imagem" required />


                        <DropdownSelect
                            placeHolder="Selecione um estoque"
                            data={stocks.map(stock => ({ label: stock.estTxNome, value: String(stock.estNrId) }))}
                            value={form.estNrId !== undefined ? String(form.estNrId) : null}
                            onChangeValue={v =>
                                setForm(prev => ({
                                    ...prev,
                                    estNrId: Number(v),
                                }))
                            }
                            required
                        />


                        <View className="flex-row gap-5 items-center py-5">
                            <Radius text="Unidade" onPress={() => {
                                setSelectedRadius(SaleUnitTypeEnum.UN)
                                form.proNrPeso = null
                            }} selected={selectedRadius === SaleUnitTypeEnum.UN} />
                            <Radius text="Quilo" onPress={() => {
                                setSelectedRadius(SaleUnitTypeEnum.KG)
                                form.proNrQuantidade = null
                            }} selected={selectedRadius === SaleUnitTypeEnum.KG} />
                        </View>

                        {selectedRadius === SaleUnitTypeEnum.KG && (
                            <View className="h-32">
                                <DropdownSelect
                                    placeHolder="Selecione o peso em quilogramas"
                                    data={kgs.map(kg => ({ label: kg.label, value: String(kg.value) }))}
                                    value={form.proNrPeso !== undefined ? String(form.proNrPeso) : null}
                                    required
                                    onChangeValue={v =>
                                        setForm(prev => ({
                                            ...prev,
                                            proNrPeso: v ? Number(v) : null,
                                        }))
                                    }
                                />
                            </View>
                        )}

                        {selectedRadius === SaleUnitTypeEnum.UN && (
                            <Input
                                label="Quantidade"
                                placeholder="Digite a quantidade do produto"
                                type="number"
                                numberFormat="integer"
                                value={form.proNrQuantidade != null ? String(form.proNrQuantidade) : ""}
                                onChangeText={v => handleChange("proNrQuantidade", v ? Number(v) : null)}
                                required
                            />
                        )}


                        <View className=" items-center justify-start p-5" style={{ height: 180 }}>
                            <ButtomSave isValid={isFormValid()} onPress={() => cadastreProduct()} />
                        </View>

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView >
    )
}