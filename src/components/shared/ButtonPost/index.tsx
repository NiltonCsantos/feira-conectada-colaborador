import { Text, TouchableOpacity, View } from "react-native"
import { globalStyles } from "../../../Globals.Styles"


interface CreateAccountButtonProps {
    isValid: boolean;
    onPress: () => void;
    title:string
}


export default ({ isValid, onPress, title }: CreateAccountButtonProps) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: "center" }}>
            <TouchableOpacity
                style={[
                    globalStyles.button,
                    { width: 20, opacity: isValid ? 1 : 0.5 },
                ]}
                disabled={!isValid}
                onPress={onPress}
            >
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 20,
                        fontFamily: 'Roboto_500Medium',
                        textAlign: 'center',
                        fontWeight: "bold",
                    }}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}