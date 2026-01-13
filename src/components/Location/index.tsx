import React, { useEffect, useState } from "react";
import { FlatList } from "react-native"
import LocationItem from "./LocationItem";
import style from "./style";
import ItemSeparator from "../shared/ItemSeparator";
import useAddres from "../../hooks/useAddres";
import SearchBar from "../shared/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {

    const { getFirtsAdresses, getNewLocations, address, addressSave } = useAddres();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (text: string) => {
        setSearchQuery(text)
        getNewLocations(text)
    };

    const handleClear = (text: string) => {
        setSearchQuery('')
        setAddress([])
      };

      useEffect(()=>{
        getFirtsAdresses()
      },[])

    return (
        <SafeAreaView style={style.container}>

            <SearchBar placeholder="Buscar Endereço" onSubmitEditing={handleSearch} onClearIconPress={handleClear} />

            <FlatList
                keyExtractor={(item) => item.endNrId.toString()}
                data={address}
                renderItem={({ item }) => <LocationItem {...item} />}
                ItemSeparatorComponent={ItemSeparator}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}