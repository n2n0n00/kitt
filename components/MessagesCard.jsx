import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const MessagesCard = () => {
  return (
    <TouchableOpacity
      className="relative flex-row justify-start gap-4 items-center w-[280px] h-full"
      activeOpacity={0.5}
    >
      <View className="w-[70px] h-[70px] rounded-full bg-[#000]">
        <Image className="w-[65px] h-[65px] rounded-full" />
      </View>
      <View className="flex-col items-start justify-between h-[70px]">
        <View className="flex-row justify-between w-full">
          <Text className="font-psemibold">Marvin McKinney</Text>
          <Text className="text-gray-100 font-pregular">2 mins</Text>
        </View>
        <Text className="text-gray-100 font-pregular">
          Tomorrow I will go to your house
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessagesCard;
