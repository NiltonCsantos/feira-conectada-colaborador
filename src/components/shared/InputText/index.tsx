import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  placeholder: string;
  value?: string;
  label: string;
  onChangeText?: (value: string) => void;
  type?: "text" | "number";
  numberFormat?: "integer" | "decimal";
  required?: boolean;
  errorMessage?: string;
}

export default ({
  placeholder,
  value = "",
  label,
  onChangeText = () => {},
  type = "text",
  numberFormat = "integer",
  required = false,
  errorMessage = "Campo obrigatório",
}: Props) => {
  const [text, setText] = useState(value);
  const [error, setError] = useState(required && value.trim() === "");

  const validate = (val: string) => {
    if (required && val.trim() === "") {
      setError(true);
      return false;
    }

    setError(false);
    return true;
  };

  const handleTextChange = (newValue: string) => {
    let formattedValue = newValue;

    if (type === "number") {
      if (numberFormat === "integer") {
        formattedValue = newValue.replace(/[^0-9]/g, "");
      }

      if (numberFormat === "decimal") {
        formattedValue = newValue
          .replace(/[^0-9.]/g, "")
          .replace(/(\..*)\./g, "$1");
      }
    }

    setText(formattedValue);
    onChangeText(formattedValue);

    // revalida enquanto digita
    if (error) {
      validate(formattedValue);
    }
  };

  return (
    <View style={{ width: "100%", marginBottom: 16 }}>
      <TextInput
        style={{ backgroundColor: "#fff", borderRadius: 8 }}
        mode="flat"
        label={label}
        placeholder={placeholder}
        value={text}
        onChangeText={handleTextChange}
        onBlur={() => validate(text)}
        error={error}
        keyboardType={
          type === "number"
            ? numberFormat === "decimal"
              ? "decimal-pad"
              : "numeric"
            : "default"
        }
      />

      {error && (
        <Text style={{ color: "#DC2626", fontSize: 12, marginTop: 4 }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
