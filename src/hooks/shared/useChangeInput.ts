import { Dispatch, SetStateAction } from "react";

export default function useChangeInput<T>( setForm: Dispatch<SetStateAction<Partial<T>>>) {
  function handleChange<K extends keyof T>(field: K,value: T[K]) {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  }
  return { handleChange };
}
