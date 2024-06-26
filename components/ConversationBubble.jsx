import { View, Text } from "react-native";
import React from "react";

const ConversationBubbleLeft = ({ body, timeStamp }) => (
  <View className="px-8 py-2 bg-[#E2E9ED] rounded-full rounded-bl-none justify-center items-start inline-flex w-[90%]">
    <Text className="text-[15px] font-pmedium">{body}</Text>
    <Text className="text-[11px] font-pregular text-[#81999E]">
      {timeStamp}
    </Text>
  </View>
);

export default ConversationBubbleLeft;
