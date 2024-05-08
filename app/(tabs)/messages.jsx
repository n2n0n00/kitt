import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import MessagesRendering from "../../components/MessagesRendering";

const Messages = () => {
  return (
    <SafeAreaView className="h-full w-full border-2 border-red-500">
      <View className="my-12 px-4 h-screen justify-center items-center flex-col">
        <MessagesRendering />
      </View>
    </SafeAreaView>
  );
};

export default Messages;
