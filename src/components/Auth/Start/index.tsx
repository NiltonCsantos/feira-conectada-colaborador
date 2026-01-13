import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../../../assets/images/logo.png";
import { Image, Text, TouchableOpacity, View } from "react-native";
import style from "../style"
import useAuth from "../../../hooks/useAuth";
import Button from "../../shared/Button";

export default () => {

    const { navigateToCadastre, navigateToLogin } = useAuth();

    return (
        <SafeAreaView style={style.container}>
            <View style={{ flex: 1, gap: 70 }}>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>

                    <Image source={logo} style={{ width: 300, height: 150 }} />

                    <View style={{ justifyContent: 'center', alignItems: "center" }}>
                        <Text style={{ fontSize: 28, fontFamily: 'Roboto_700Bold', color: '#fff' }}>
                            Feira Conectada
                        </Text>

                        <Text style={{ fontSize: 16, fontFamily: 'Roboto_400Regular', color: '#fff' }}>
                            Do produtor à mesa
                            {/* Do campo pra você */}
                        </Text>
                    </View>

                </View>

                <View style={{ gap: 65 }}>
                    <Text style={{ fontSize: 34, fontFamily: 'Roboto_700Bold', color: "#fff", textAlign: 'center' }}>
                        Bem Vindo
                    </Text>

                    <View style={{ gap: 45 }}>

                        <TouchableOpacity style={{ borderColor: '#fff', borderWidth: 1, padding: 15, borderRadius: 50 }}
                            onPress={() => navigateToLogin()}
                        >
                            <Text style={{ textAlign: 'center', fontFamily: 'Roboto_500Medium', fontSize: 20, color: '#fff' }}>
                                Login
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: '#fff', padding: 15, borderRadius: 50 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Roboto_500Medium', fontSize: 20 }}
                                onPress={() => navigateToCadastre()}
                            >
                                Criar Conta
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>


                <View style={{ flex: 1, padding: 20, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={{ color: "#fff", fontFamily: 'Roboto_400Regular_Italic', fontSize: 12 }}>
                        Conectando pessoas aos produtores da região
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )

}