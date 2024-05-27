import { View, Text, Image } from "react-native";
import React from "react";

const ProfileHeader = () => {
  return (
    <View className="w-full mt-8 relative">
      <View className="flex-row items-center justify-start">
        <View className="w-[105px] h-[105px] bg-pink-500 rounded-full items-center justify-center">
          <View className="bg-[#DCDEE0] h-[100px] w-[100px] rounded-full" />
        </View>
        <View className="flex-col pl-5 gap-2">
          <Text className="font-pbold text-[19px]">Musiani Wanda</Text>
          <Text className="font-pregular text-[13px] text-[#81999E]">
            Designer{" "}
            <Text className="font-pregular text-[13px] text-black">@Pipes</Text>
          </Text>
          <Text className="font-pregular text-[13px] text-black">
            Whatever this is!
          </Text>
        </View>
      </View>
      <View className="flex-row gap-2 w-full items-center justify-around mt-4">
        <View className="flex-col">
          <Text className="text-[#52697E] text-[14px] font-pregular">
            Posts
          </Text>
          <Text className="font-psemibold text-[20px]">1,324</Text>
        </View>
        <View className="h-[50px] w-[2px] bg-[#DCDEE0]" />
        <View className="flex-col">
          <Text className="text-[#52697E] text-[14px] font-pregular">
            Followers
          </Text>
          <Text className="font-psemibold text-[20px]">2.3m</Text>
        </View>
        <View className="h-[50px] w-[2px] bg-[#DCDEE0]" />
        <View className="flex-col">
          <Text className="text-[#52697E] text-[14px] font-pregular">
            Friends
          </Text>
          <Text className="font-psemibold text-[20px]">2,523</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-center w-full p-4">
        <View className="bg-[#FF8743] w-3/4 h-[45px] rounded-xl mr-2 items-center justify-center">
          <Text className="font-pregular text-[14px] text-white">Follow</Text>
        </View>
        <View className="bg-[#E9ECEF] w-1/4 h-[45px] rounded-xl items-center justify-center">
          <Text className="font-pregular text-[14px] text-black">Chat</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
