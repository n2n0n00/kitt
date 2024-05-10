import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import MessagesRendering from "../../components/MessagesRendering";
import NavbarTab from "../../components/NavbarTab";
import SearchBar from "../../components/SearchBar";

const Messages = () => {
  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="pt-24 px-2 h-screen justify-center items-center flex-col">
        <NavbarTab />
        <SearchBar />
        <MessagesRendering />
      </View>
    </SafeAreaView>
  );
};

export default Messages;
