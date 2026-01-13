import { useContext, useEffect } from "react"
import { Dimensions, Image, SafeAreaView, Text, View } from "react-native"
import useAuth from "../../hooks/useAuth"
import { AuthContext } from "../../context/AuthContext"

const {width}= Dimensions.get("screen")

export default () => {

    const {deleteUser}= useContext(AuthContext)

    useEffect(()=>{

        setTimeout(()=>{
            deleteUser()
        },4500)

    },[])



    return (
        <SafeAreaView style={{flex:1, 
        alignItems:"center", 
        justifyContent:"center",
        backgroundColor:"#fff"}}>
            <View style={{paddingHorizontal:15}}>

                <Text style={{fontWeight:"800", fontSize:20}}>
                    Ops! Parece que há muito tempo que não nos vemos!
                    Por favor, faça login novamente para utilizar nossos serviços
                </Text>

                <Image source={require("../../../assets/images/errorImage.png")}
                style={{width:width/1.2, height:width/1.2}}/>


            </View>
        </SafeAreaView>
    )
}