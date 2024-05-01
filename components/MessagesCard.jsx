import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const MessagesCardItem = ({ name, timer, textPreview }) => {
  return (
    <TouchableOpacity
      className="relative flex-row justify-start gap-4 items-center mb-8"
      activeOpacity={0.5}
    >
      <View className="w-[70px] h-[70px] rounded-full bg-[#000]">
        <Image className="w-[65px] h-[65px] rounded-full" />
      </View>
      <View className="flex-col items-start justify-evenly h-[70px] ">
        <View className="flex-row justify-between w-[85%]">
          <Text className="font-psemibold">{name}</Text>
          <Text className="text-gray-100 font-pregular">{timer}</Text>
        </View>
        <Text className="text-gray-100 font-pregular">{textPreview}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessagesCardItem;
