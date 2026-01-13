import { Text, TouchableOpacity } from "react-native";

interface Props {
  isValid: boolean;
  onPress: () => void
}

export default ({ isValid,onPress }: Props) => {
  return (
    <TouchableOpacity
    onPress={onPress}
      disabled={!isValid}
      className={`p-5 rounded-md w-full ${isValid ? "bg-blue-500" : "bg-blue-300"
        }`}
    >
      <Text
        className={`text-title-main font-title-main text-center ${isValid ? "text-white" : "text-white/70"
          }`}
      >
        Salvar
      </Text>
    </TouchableOpacity>
  );
};
