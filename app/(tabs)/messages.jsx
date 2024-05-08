import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import MessagesRendering from "../../components/MessagesRendering";
import NavbarTab from "../../components/NavbarTab";

const Messages = () => {
  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="my-12 px-4 h-screen justify-center items-center flex-col">
        <NavbarTab />
        <MessagesRendering />
      </View>
    </SafeAreaView>
  );
};

export default Messages;
