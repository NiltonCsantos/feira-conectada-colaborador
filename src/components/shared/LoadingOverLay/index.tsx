// src/components/LoadingOverlay.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useLoading } from "../../../context/LoadingContext";

export default function LoadingOverlay() {
  const { loadingCount } = useLoading();

  // Se não tiver requisições ativas, não renderiza nada
  if (loadingCount === 0) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#EE6928" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // cobre toda a tela
    backgroundColor: "rgba(0,0,0,0.2)", // semi-transparente
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});
