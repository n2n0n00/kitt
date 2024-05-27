import { View, Text } from "react-native";
import React from "react";
import FriendsNav from "../../components/FriendsNav";
import SearchBar from "../../components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendsRendering from "../../components/FriendsRendering";

const Friends = () => {
  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="px-2 justify-center items-center flex-col">
        <View className="flex-col items-center">
          <FriendsNav />
          <SearchBar />
          <FriendsRendering />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Friends;
