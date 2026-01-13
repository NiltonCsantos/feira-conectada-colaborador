import { Button, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import style from "../../style"
import { globalStyles } from "../../../../Globals.Styles"
import Title from "../../Title"
import InputBox from "../../InputBox"

export default()=>{
    return(
        <SafeAreaView style={style.container}>

            <Title title={"Redefinir Senha"}/>

            <View style={style.contentInputs}>

                <InputBox label="Nova Senha" placeholder="Nova senha" secure={true}/>
                <InputBox label="Confirmar" placeholder="Confirmar senha" secure={true}/>
                <TouchableOpacity style={[globalStyles.button, {width:200}]}>
                <Text style={[globalStyles.contentButon, {textAlign:'center', fontWeight:'bold'}]}>Confirmar</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}