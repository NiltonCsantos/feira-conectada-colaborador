import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../../../hooks/useAuth";
import AnimatedComponent from "../../shared/AnimatedForm";
import ButtonPost from "../../shared/ButtonPost";
import WelcommeMessage from "../../shared/WelcommeMessage";
import InputBox from "../InputBox";
import style from "../style";

export default function CreateAccountScreen() {
  const { formRegister, handleChangeRegister, onRegister, validateEmail } = useAuth();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validEmail = validateEmail(formRegister.usuTxEmail);
    const validPassword = formRegister.usuTxSenha.length >= 8;
    const passwordsMatch = formRegister.usuTxSenha === confirmPassword;
    const allFilled =
      formRegister.usuTxNome &&
      formRegister.usuTxEmail &&
      formRegister.usuTxSenha &&
      confirmPassword;

    setEmailError(
      formRegister.usuTxEmail && !validEmail ? "Email inválido" : ""
    );
    setPasswordError(
      formRegister.usuTxSenha && !validPassword
        ? "A senha deve ter no mínimo 8 caracteres"
        : confirmPassword && !passwordsMatch
        ? "As senhas não coincidem"
        : ""
    );

    setIsValid(allFilled && validEmail && validPassword && passwordsMatch);
  }, [formRegister, confirmPassword]);


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
            <InputBox
              placeholder="Nome completo"
              label="Nome"
              value={formRegister.usuTxNome}
              onChangeText={(text) => handleChangeRegister("usuTxNome", text)}
            />

            <InputBox
              placeholder="email@exemplo.com"
              label="Email"
              value={formRegister.usuTxEmail}
              onChangeText={(text) => handleChangeRegister("usuTxEmail", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? (
              <Text style={{ color: "red", marginTop: -15 }}>{emailError}</Text>
            ) : null}

            <InputBox
              placeholder="********"
              label="Senha"
              value={formRegister.usuTxSenha}
              onChangeText={(text) => handleChangeRegister("usuTxSenha", text)}
              secure
            />

            <InputBox
              placeholder="Confirmar senha"
              label="Confirmar senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secure
            />
            {passwordError ? (
              <Text style={{ color: "red", marginTop: -15 }}>{passwordError}</Text>
            ) : null}

            <View style={{ marginTop: 30, alignItems: "center" }}>
              <ButtonPost
                isValid={isValid}
                onPress={()=> onRegister()}
                title="Criar Conta"
              />
            </View>
          </AnimatedComponent>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
