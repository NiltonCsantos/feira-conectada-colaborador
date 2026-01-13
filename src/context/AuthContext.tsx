import React, { ReactNode, createContext, useEffect, useState, version } from "react";
import { AuthContextData } from "../interfaces/auth";
import UserService from "../services/stock";
import { UserLogin } from "../interfaces/userLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAddres from "../hooks/useAddres";
import { Address } from "../interfaces/addres";
import api from "../data/api";
import { User } from "../interfaces/user";
import axios from "axios";
// import { useError } from "./ErrorContext";
import AuthService from "../services/auth";


export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

   const [user, setuser] = useState<User | null>(null);

   const [addressContext, setAddressContext] = useState<Address | null>(null);

   const [isAddress, setIsAddres] = useState<boolean>(true)

   const authService: AuthService = new AuthService();

   useEffect(() => {

      async function loadStorageData() {

         // tipar
         const userStorage = await AsyncStorage.getItem("@RNAuth:user");
         const tokenStorage = await AsyncStorage.getItem("@RNAuth:acesstoken");

         console.log(tokenStorage);
         
         const addressesStorage =
            await AsyncStorage.getItem("@RNAuth:addresses");

         const addressStorage =
            await AsyncStorage.getItem("@RNAuth:address");

            console.log("addressStorage");
            console.log(addressStorage);
            
            

         if (userStorage && tokenStorage) {

            // api.defaults.headers['Authorization']= `Bearer ${tokenStorage}`

            setuser(JSON.parse(userStorage));

            if (!addressStorage) {
               setIsAddres(false)
            }

         }
      }


   //  AsyncStorage.clear()  

      loadStorageData();

   }, [isAddress, !!user])



   async function signin(params: UserLogin) {
      const user: User = await authService.login(params);
      const address: Address[] = await authService.findAddressOfUser();
      const addressStorage = await AsyncStorage.getItem("@RNAuth:address");

      if (address.length == 0 || !addressStorage) {
         setIsAddres(false)
      }
      setuser(user);
   }

   async function deleteUser(): Promise<void> {
      setuser(null)
      await AsyncStorage.clear()
   }

   return (

      <AuthContext.Provider value={{ signed: !!user, user, signin, isAddress, deleteUser, setIsAddres, setuser, setAddressContext, addressContext }}>
         {children}
      </AuthContext.Provider>

   )


}