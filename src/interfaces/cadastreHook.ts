import { Address } from "./addres";
import { AuthContextData } from "./auth";
import { UserLogin } from "./userLogin";
import { userRegister } from "./userRegister";

export interface cadastreHook{
    handleChange: (key: keyof userRegister, value: string) => void;
    onRegister: () => Promise<AuthContextData | any>;
    onLogin: () => Promise<AuthContextData | any>;
    formRegister:userRegister,
    formLogin:UserLogin,
    validInputs:()=> void,
    handleChangeLogin: (key: keyof UserLogin, value: string) => void;
}