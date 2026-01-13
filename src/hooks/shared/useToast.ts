import Toast from "react-native-toast-message";

export default function useToast() {
    function sucess(text: string) {
        Toast.show({
            type: 'success',
            text1: 'Sucesso!',
            text2: text
        });
    }

    return {sucess}
}