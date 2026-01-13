import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  placeholder: string;
  secure?: boolean;
  value?: string;
  label: string;
  onChangeText?: (value: string) => void;
}

export default function InputBox({
  placeholder,
  secure = false,
  value = "",
  label,
  onChangeText = () => {},
}: Props) {
  const [text, setText] = useState(value);
  const [secureState, setSecureState] = useState(true);

  const handleTextChange = (newValue: string) => {
    setText(newValue);
    onChangeText(newValue);
  };

  return (
    <View style={{ width: "100%", marginBottom: 16 }}>
      <TextInput
        style={{
          backgroundColor: "#fff",
          borderBottomColor: "transparent",
          borderRadius: 8,
        }}
        mode="flat"
        label={label}
        placeholder={placeholder}
        secureTextEntry={secure && secureState}
        value={text}
        onChangeText={handleTextChange}
        right={
          secure ? (
            <TextInput.Icon
              icon={secureState ? "eye-off" : "eye"}
              onPress={() => setSecureState(!secureState)}
            />
          ) : null
        }
        theme={{
          colors: {
            primary: "#6B8CFF",
            text: "#000",
            placeholder: "gray",
            background: "white",
          },
        }}
      />
    </View>
  );
}
