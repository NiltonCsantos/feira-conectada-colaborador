
import { Button, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useContext, useEffect, useState } from 'react';
import style from "../style"
import { globalStyles } from "../../../Globals.Styles"
import { SafeAreaView } from "react-native-safe-area-context"
import Title from "../Title"
import InputBox from "../InputBox"
import useAuth from "../../../hooks/useAuth"
import { AuthContext } from "../../../context/AuthContext";
import WelcommeMessage from "../../shared/WelcommeMessage";
import AnimatedComponent from "../../shared/AnimatedForm";
import ButtonPost from "../../shared/ButtonPost";


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
                            <InputBox
                                placeholder="********"
                                label="Senha"
                                value={formLogin.usuTxSenha}
                                onChangeText={(text) => handleChangeLogin("usuTxSenha", text)}
                                secure
                            />

                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', paddingVertical: 5 }}

                            >
                                <Text style={{ color: '#EE6928' }} onPress={navigateToForget}>
                                    Esqueceu a senha?
                                </Text>
                            </View>



                            <View style={{ marginTop: 30, alignItems: "center" }}>
                                <ButtonPost
                                    isValid={isValid}
                                    onPress={() => signin({ usuTxEmail: formLogin.usuTxEmail, usuTxSenha: formLogin.usuTxSenha })}
                                    title="Login"
                                />
                            </View>
                        </View>

                    </AnimatedComponent>
                </ScrollView>
            </KeyboardAvoidingView>




            {/* <Title title={"Login"}/> */}

            {/* <View style={style.login}>

                            <InputBox
                                placeholder="email@exemplo.com"
                                label="Email"
                                value={values.usuTxEmail}
                                onChangeText={handleChange('usuTxEmail')}
                                error={touched.usuTxEmail && errors.usuTxEmail} // Passa erro se o campo foi tocado
                            />


                            <InputBox
                                placeholder="1234456Afsd"
                                label="Senha"
                                value={values.usuTxSenha}
                                onChangeText={handleChange('usuTxSenha')}
                                secure={true}
                                error={touched.usuTxSenha && errors.usuTxSenha} // Passa erro se o campo foi tocado
                            />

                            <View>
                                <Text style={[style.forgetPassword, globalStyles.text, { color: '#fffff0', fontWeight: '700', fontStyle: 'italic' }]} onPress={navigateToForget}>
                                    Esqueceu a senha?
                                </Text>
                            </View>

                <Text style={style.text}>
                    Faça Login com
                </Text>

                <Text style={style.icon}>G</Text>

                <Text onPress={navigateToCadastre} style={[globalStyles.text, {color:'#fff'}]}>
                    Criar conta
                </Text> 

            </View> */}

        </SafeAreaView>
    )
}