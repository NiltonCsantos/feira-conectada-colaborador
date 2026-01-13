import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  label: string;
  value?: string;
  onChange: (uri: string) => void;
  required?: boolean;
  errorMessage?: string;
}

export default ({
  label,
  value,
  onChange,
  required = false,
  errorMessage = 'Campo obrigatório',
}: Props) => {
  const showError = required && !value;

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View style={{ gap: 8 }}>
      <Text className="text-xl">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>

      <TouchableOpacity
        onPress={pickImage}
        style={{
          height: 200,
          borderWidth: 1,
          borderColor: showError ? '#ef4444' : '#ccc',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
        }}
      >
        {value ? (
          <Image
            source={{ uri: value }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
            }}
          />
        ) : (
          <>
            <Ionicons name="image-outline" size={32} color="#999" />
            <Text style={{ color: '#999', marginTop: 4 }}>
              Selecionar imagem
            </Text>
          </>
        )}
      </TouchableOpacity>

      {showError && (
        <Text className="text-red-500 text-sm">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
