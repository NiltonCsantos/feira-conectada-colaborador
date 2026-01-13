import { View, Text } from "react-native"
import style from "../style"
import DataCadastre from "../DataCadastre"
import { useContext } from "react"
import { AuthContext, AuthProvider } from "../../../context/AuthContext"

export default ()=>{

    const {user}=useContext(AuthContext);

    return(
    

        <View  style={style.logoContent} >
            
            <View style={style.logo}>

                <Text style={style.logoText}>
                    {user?.usuTxNome[0]}
                </Text>

            </View>

            <Text>
                {user?.usuTxEmail}
            </Text>

        </View>


    )
}