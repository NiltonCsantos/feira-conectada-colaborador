import { useEffect } from "react"
import Background from "../../components/Background"
import { useIsFocused } from "@react-navigation/native"

export default({navigation})=>{

    
    useEffect(()=>{

        setTimeout(()=>{
            navigation.navigate("Login")
        },3000)

    },[])

    return(
        <Background/>
    )
}