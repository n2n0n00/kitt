import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import MessagesRendering from "../../components/MessagesRendering";
import MessagingNav from "../../components/MessagingNav";

const Conversation = () => {
  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="pt-20 px-2 h-screen justify-center items-center flex-col">
        <MessagingNav avatar="" statusLabel="Online" name="Theresa Webb" />

        <MessagesRendering />
      </View>
    </SafeAreaView>
  );
};

export default Conversation;
