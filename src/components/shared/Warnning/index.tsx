import { FontAwesome5 } from "@expo/vector-icons";
import {
    Text,
    TouchableOpacity,
    View,
    Animated,
    Easing,
    Dimensions,
} from "react-native";
import { useEffect, useRef } from "react";

const { height } = Dimensions.get("window");

interface Props {
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: () => Promise<void> | void;
}

export default function ConfirmModal({
    isVisible,
    onCancel,
    onConfirm,
}: Props) {
    const translateY = useRef(new Animated.Value(height)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: height,
                    duration: 250,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <Animated.View
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                opacity,
            }}
        >
            <Animated.View
                style={{
                    transform: [{ translateY }],
                    borderRadius: 12,
                    padding: 16,
                    backgroundColor: "#FFF",
                    width: "91%",

                    // iOS
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.06,
                    shadowRadius: 1.5,

                    // Android
                    elevation: 5,
                }}
            >
                <View className="w-full p-8 justify-end items-center">
                    <Text className="font-title-main text-title-main">
                        Atenção!
                    </Text>

                    <View className="pb-5 pt-3">
                        <FontAwesome5
                            name="exclamation-triangle"
                            size={65}
                            color="#F59E0B"
                        />
                    </View>

                    <View className="p-5">
                        <Text className="text-center">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Magnam illum alias quos eveniet dolorum iure
                        </Text>
                    </View>
                </View>

                <View className="flex-row justify-between items-center px-4 py-5">
                    <TouchableOpacity
                        onPress={onCancel}
                        className="bg-red-500 py-4 w-32 rounded-md justify-center items-center"
                    >
                        <Text className="text-white font-semibold">
                            Cancelar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onConfirm}
                        className="bg-blue-500 py-4 w-32 rounded-md justify-center items-center"
                    >
                        <Text className="text-white font-semibold">
                            Confirmar
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </Animated.View>
    );
}
