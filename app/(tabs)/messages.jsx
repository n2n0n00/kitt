import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import MessagesCard from "../../components/MessagesCard";

const Messages = () => {
  return (
    <SafeAreaView className="">
      <ScrollView>
        <View className="my-12 px-4 space-y-6 text-100">
          <MessagesCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Messages;
