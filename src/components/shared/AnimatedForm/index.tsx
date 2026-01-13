import { View } from "react-native";

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flexGrow: 1, // ✅ deixa o layout se ajustar ao teclado
        borderTopEndRadius: 50,
        borderTopLeftRadius: 50,
        paddingHorizontal: 25,
        paddingTop: 50,
        gap: 25,
        bottom:0,
        
      }}
    >
      {children}
    </View>
  );
};
