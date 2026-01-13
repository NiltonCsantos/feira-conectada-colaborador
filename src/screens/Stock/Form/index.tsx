
import { Button, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedForm from "../../../components/shared/AnimatedForm";
import InputBox from "../../../components/Auth/InputBox";
import ButtonPost from "../../../components/shared/ButtonPost";
import ButtomSave from "../../../components/shared/ButtomSave";
import LottieView from "lottie-react-native";
import Input from "../../../components/shared/InputText";
import { DropdownSelect } from "../../../components/shared/DropDown";
import useStock from "../../../hooks/stock/useStock";
import { NicheEnum } from "../../../enums/niche-enum";
import { Niche } from "../../../interfaces/product";



export default () => {

    const [categories, setCategories] = useState<Niche[]>([]);
    const [category, setCategory] = useState<string | null>(null);
    const { form, errors, handleChange, validate, setForm, cadastreStock, getNiches } = useStock();

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await validate();
            setIsValid(result);
        })();
    }, [form]);

    useEffect(() => {
        const loadNiches = async () => {
            const niches = await getNiches();
            console.log("NICH", niches);
            setCategories(niches);
        };

        loadNiches();
    }, []);


    return (

        <SafeAreaView className="bg-white flex-1" style={{ paddingHorizontal: 25 }}>


            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -30}
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
                                Seus estoques na palma da sua mão
                            </Text>
                        </View>
                        <Input
                            label="Nome"
                            placeholder="Digite o nome"
                            value={form.estTxNome ?? ""}
                            onChangeText={v => handleChange("estTxNome", v)}
                            required
                        />

                        <Input
                            label="Valor"
                            placeholder="Digite o valor"
                            type="number"
                            numberFormat="decimal"
                            value={form.estNrValor != null ? String(form.estNrValor) : ""}
                            onChangeText={v => handleChange("estNrValor", v === "" ? null : Number(v))}
                            required
                        />


                        <DropdownSelect
                            data={categories.map(cat => ({ label: cat.nicTxNome, value: String(cat.nicNrId) }))}
                            value={form.nicNrId !== undefined ? String(form.nicNrId) : null}
                            required
                            errorMessage={errors.nicNrId}
                            onChangeValue={v =>
                                setForm(prev => ({
                                    ...prev,
                                    nicNrId: v ? Number(v) : undefined,
                                }))
                            }
                            placeHolder="Selecione uma categoria"
                        />



                    </View>

                    <View className="flex-1  p-5">
                        <ButtomSave isValid={isValid} onPress={() => cadastreStock()} />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}