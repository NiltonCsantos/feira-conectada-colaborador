import { Text, TouchableOpacity, View } from "react-native"

interface Props{
    selected:boolean,
    onPress:()=> void,
    text:string
}

export default ({onPress, selected, text}:Props) => {
    return (
        <View>
            <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
                onPress={onPress}
            >
                <View
                    style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: "#EE6928",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {selected && (
                        <View
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: "#EE6928",
                            }}
                        />
                    )}
                </View>
                <Text style={{ marginLeft: 8 }}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}