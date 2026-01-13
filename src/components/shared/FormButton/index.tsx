import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

interface Props {
  onPress: () => void;
}

export default ({ onPress }: Props) => {
  return (
    <View className="absolute right-0 bottom-0 p-5">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="bg-blue-500 p-3 rounded-lg"
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
