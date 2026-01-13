
import { Button, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useContext, useEffect, useState } from 'react';
import style from "../../style"
import { globalStyles } from "../../../../Globals.Styles"
import { SafeAreaView } from "react-native-safe-area-context"
import Title from "../../Title"
import InputBox from "../../InputBox"
import useAuth from "../../../../hooks/useAuth"
import { AuthContext } from "../../../../context/AuthContext";
import WelcommeMessage from "../../../shared/WelcommeMessage";
import AnimatedComponent from "../../../shared/AnimatedForm";
import ButtonPost from "../../../shared/ButtonPost";


export default () => {

    const { formLogin, handleChangeLogin, navigateToForget, navigateToCadastre, validateEmail } = useAuth()
    const { signin } = useContext(AuthContext);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isValid, setIsValid] = useState(false);


    useEffect(() => {
        const validEmail = validateEmail(formLogin.usuTxEmail);
        const validPassword = formLogin.usuTxSenha.length >= 8;

        setEmailError(
            formLogin.usuTxEmail && !validEmail ? "Email inválido" : ""
        );
        setPasswordError(
            formLogin.usuTxSenha && !validPassword
                ? "A senha deve ter no mínimo 8 caracteres" : ""
        );

        setIsValid(validEmail && validPassword);
    }, [formLogin, confirmPassword]);

    return (

        <SafeAreaView style={[style.container, { padding: 0 }]}>

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
                    <WelcommeMessage />

                    <AnimatedComponent>

                        <View>
                            <InputBox
                                placeholder="usuario@email.com"
                                label="email"
                                value={formLogin.usuTxEmail}
                                onChangeText={(text) => handleChangeLogin("usuTxEmail", text)}
                            />
            

                            <View style={{ marginTop: 30, alignItems: "center" }}>
                                <ButtonPost
                                    isValid={isValid}
                                    onPress={() => signin({ usuTxEmail: formLogin.usuTxEmail, usuTxSenha: formLogin.usuTxSenha })}
                                    title="Continuar"
                                />
                            </View>
                        </View>

                    </AnimatedComponent>
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}