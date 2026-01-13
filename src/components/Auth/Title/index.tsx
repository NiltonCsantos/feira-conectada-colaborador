import { Text, View } from "react-native";

import style from "../style";

import { globalStyles } from "../../../Globals.Styles";

interface Props{
  title:string
}

export default ({title}:Props)=>{
    return(
       <View style={style.containerTitle}>
         <Text style={[globalStyles.title, {fontSize:35}]}>{title}</Text>
       </View>
    )
}