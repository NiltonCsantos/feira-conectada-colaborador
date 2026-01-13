import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState, useEffect } from "react";

interface BaseOption {
  label: string;
  value: string;
}

interface Props<T extends BaseOption> {
  data: T[];
  value: string | null;
  required?: boolean;
  errorMessage?: string;
  placeHolder:string,
  onChangeValue: (value: string | null, item?: T) => void;
}

export function DropdownSelect<T extends BaseOption>({
  data,
  value,
  required = false,
  errorMessage = "Campo obrigatório",
  onChangeValue,
  placeHolder
}: Props<T>) {
  // state interno só para controlar visualmente a seleção
  const [selected, setSelected] = useState<string | null>(value);

  useEffect(() => {
    setSelected(value ?? null); // sincroniza sempre que value mudar
  }, [value]);

  const hasError = required && !selected;

  return (
    <View>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeHolder} 
        value={selected}
        onChange={(item: T) => {
          setSelected(item.value); // atualiza visual
          onChangeValue(item.value, item); // atualiza form
        }}
        style={{
          height: 50,
          borderBottomColor: hasError ? "#E53935" : "#B0B0B0",
          borderBottomWidth: 1,
          paddingHorizontal: 12,
        }}
      />

      {hasError && (
        <Text style={{ color: "#E53935", marginTop: 4, fontSize: 12 }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
