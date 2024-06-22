import { View, Text } from "react-native";
import React from "react";
// import EvilIcons from "@expo/vector-icons/EvilIcons";

const PostComponents = ({ content, userName, timeStamp }) => {
  return (
    <View className="p-4 bg-[#E5E5E5] rounded-xl mb-8">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row gap-4">
          <View className="bg-[#BCC2C3] w-[35px] h-[35px] rounded-full" />
          <View>
            <Text className="text-[13px] font-pmedium">{userName}</Text>
            <Text className="text-[#81999E] font-pregular text-[11px]">
              {timeStamp}
            </Text>
          </View>
        </View>

        {/* <View className="flex-row gap-1">
          <View className="bg-[#BCC2C3] w-[4px] h-[5px] rounded-full" />
          <View className="bg-[#BCC2C3] w-[4px] h-[5px] rounded-full" />
          <View className="bg-[#BCC2C3] w-[4px] h-[5px] rounded-full" />
        </View> */}
      </View>
      <View className="mb-4">
        <Text className="text-[13px] text-black font-pregular">{content}</Text>
      </View>
      {/* <View className="w-full flex-row justify-between mb-4">
        <View className="bg-[#BCC2C3] w-[165px] h-[204px] rounded-xl" />
        <View className="bg-[#BCC2C3] w-[165px] h-[204px] rounded-xl" />
      </View> */}
      {/* <View className="flex-row w-full items-start justify-start gap-5 mb-4">
        <View className="flex-row items-center">
          <EvilIcons name="comment" size={30} color="#6A798A" />
          <Text className="text-[#6A798A] font-pregular text-[15px]">
            {comments}
          </Text>
        </View>
        <View className="flex-row items-center">
          <EvilIcons name="like" size={30} color="#6A798A" />
          <Text className="text-[#6A798A] font-pregular text-[15px]">
            {likes}
          </Text>
        </View>
      </View> */}
    </View>
  );
};

export default PostComponents;
