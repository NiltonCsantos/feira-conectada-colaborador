import React from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";

interface Props {
  placeholder: string;
  onSubmitEditing: (text: string) => void;
  onClearIconPress: (text: string) => void;
}

export default ({ placeholder, onSubmitEditing, onClearIconPress }: Props) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSubmitEditing = () => {
    onSubmitEditing(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onClearIconPress("");
  };

  return (
    <View style={{ paddingVertical: 0, width: "100%" }}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={onChangeSearch}
        value={searchQuery}
        onSubmitEditing={handleSubmitEditing}
        onClearIconPress={handleClear}
        style={{
          backgroundColor: "rgba(238, 105, 40, 0.18)",
          borderRadius: 18,
        }}
        inputStyle={{ textAlign: "center" }}
      />
    </View>
  );
};
