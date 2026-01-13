import Toast from "react-native-toast-message";

interface ToastMessageProps {
  type: "success" | "error" | "info";
  title: string;
  description?: string;
}

/**
 * Exibe uma mensagem toast no topo da tela.
 * Use para feedbacks rápidos de sucesso, erro ou informação.
 */
export function showToast({ type, title, description }: ToastMessageProps) {
  Toast.show({
    type,
    text1: title,
    text2: description,
    position: "top",
  });
}
