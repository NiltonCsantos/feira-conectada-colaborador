import { Text, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import { OrderStatusEnum } from "../../../interfaces/orderProduct";

interface Props {
  status: string; // agora string, pois vem do backend
  title: string;
  isSelected?: boolean;
  colorSelectd: string;
  onPress: () => void;
  count?: number;
}

interface PropertiesIcon {
  color: string;
  iconName: string;
}

export default function StatusIcon({
  status,
  title,
  isSelected = false,
  colorSelectd,
  onPress,
  count,
}: Props) {

  // Mapeamento de status para ícone e cor
  const iconMap: Record<string, PropertiesIcon> = {
    CRIADO: { color: "#A5D6A7", iconName: "check-circle-outline" },
    EM_PREPARACAO: { color: "#FFE082", iconName: "clock-outline" },
    FINALIZADO: { color: "#90CAF9", iconName: "cart-check" },
    CANCELADO: { color: "#EF9A9A", iconName: "cancel" },
  };

  // Normaliza o status (remove espaços e coloca maiúscula)
  const normalizedStatus = status.trim().toUpperCase();

  const { iconName, color } = iconMap[normalizedStatus] ?? { iconName: "help-circle", color: "#000" };

  return (
    <TouchableOpacity onPress={onPress} disabled={isSelected}>
      <View style={{ alignItems: "center" }}>
        <IconButton
          icon={iconName} // agora correto
          size={36}
          iconColor={isSelected ? colorSelectd : color} // usa cor do status
        />
        <Text style={{ fontSize: 11 }}>{title}</Text>
      </View>

      {count != null && (
        <Text
          style={{
            position: "absolute",
            right: 5,
            top: 5,
            backgroundColor: "#000000B3",
            borderRadius: 100,
            color: "#fff",
            width: 20,
            height: 20,
            fontSize: 12,
            textAlign: "center",
            lineHeight: 20,
          }}
        >
          {count}
        </Text>
      )}
    </TouchableOpacity>
  );
}
