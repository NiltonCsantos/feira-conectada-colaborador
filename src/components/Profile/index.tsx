import { SafeAreaView, View } from "react-native"
import style from "./style"
import Data from "./Data"
import DataCadastre from "./DataCadastre"
import Payments from "./Payments"
import Location from "./Location"
import Logout from "./Logout"
import Notification from "./Notification"
import { Fragment, useState } from "react"
import ProgressLoader from "../shared/ProgressLoader"
import useAuth from "../../hooks/useAuth"

export default () => {

    
    const {signout, isLougout} = useAuth();

   

    return (
        <SafeAreaView style={style.container}>

            {isLougout ? (
                <ProgressLoader />
            ) : (
                <Fragment>
                    <Data />

                    <View style={style.options}>
                        <DataCadastre />

                        <Payments />

                        <Location />

                        <Logout onPress={()=>signout()} />

                        {/* <Notification /> */}
                    </View>
                </Fragment>
            )}

        </SafeAreaView>
    )
}