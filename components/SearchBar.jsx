import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

const SearchBar = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="w-full items-center mt-8">
      <View className="bg-[#F8F8F8] w-full h-[45px] rounded-full items-center justify-start p-2 flex-row">
        <TouchableOpacity
          onPress={() => {
            if (!query) {
              return Alert.alert(
                "Missing query",
                "Please input something to search results!"
              );
            }

            if (pathname.startsWith("/searchMessages")) {
              router.setParams({ query });
            } else {
              router.push(`/searchMessages/${query}`);
            }
          }}
        >
          <Ionicons name="search" size={24} color="#A8BEC1" />
        </TouchableOpacity>
        <TextInput
          className="flex-1 text-[#A8BEC1] font-pregular mt-0.5 text-base pl-2"
          value={query}
          placeholder="Search..."
          placeholderTextColor="#cdcde0"
          onChangeText={(e) => setQuery(e)}
        />
      </View>
    </View>
  );
};

export default SearchBar;
