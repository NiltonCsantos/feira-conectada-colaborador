import { SafeAreaProvider } from "react-native-safe-area-context"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import AuthRoutes from "./private/auth.routes"
import Public from "./public"

export default () => {

    const {signed}=useContext(AuthContext);
    
    return(
        <SafeAreaProvider>
          {signed? <AuthRoutes/>  :  <Public/>}
        </SafeAreaProvider>
    )
    
}