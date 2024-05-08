import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { formatTime } from "../utils/utils";

const MessagesCardItem = ({ name, timer, textPreview, avatar }) => {
  let timeDate = formatTime(timer);
  return (
    <TouchableOpacity
      className="relative flex-row justify-start gap-4 items-center mb-8 border-b-[1px] border-[#D9D9D9]"
      activeOpacity={0.5}
    >
      <View className="w-[70px] h-[70px] rounded-full bg-[#fff] border-2 border-[#BC67FF] items-center justify-center mb-2">
        <Image
          className="w-[60px] h-[60px] rounded-full"
          source={{ uri: avatar }}
        />
      </View>
      <View className="flex-col items-start justify-evenly h-[70px] mb-2">
        <View className="flex-row justify-between w-[85%]">
          <Text className="font-psemibold">{name}</Text>
          <Text className="text-gray-100 font-pregular w-[100px] text-right">
            {timeDate}
          </Text>
        </View>
        <Text className="text-gray-100 font-pregular">{textPreview}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessagesCardItem;
