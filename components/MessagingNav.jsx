import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";

const MessagingNav = ({ avatar, statusLabel, name }) => {
  return (
    <View className="items-center justify-center flex-col">
      <View className="flex-row items-center justify-between w-full mt-2 ">
        <View className="flex-row items-center justify-center">
          <TouchableOpacity activeOpacity={0.5}>
            <Link
              className="flex items-center justify-center"
              href={"/(tabs)/messages"}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </Link>
          </TouchableOpacity>

          <View className="flex-row ml-2">
            <View className="items-center justify-center">
              <Image
                className="w-[60px] h-[60px] rounded-full"
                source={{ uri: avatar }}
              />
            </View>
            <View className="ml-2 items-center justify-center">
              <Text className="font-pmedium text-lg">{name}</Text>
              {/* <View className="flex-row items-center justify-start ">
                <View
                  className={`${
                    statusLabel === "Online"
                      ? "bg-green-500 rounded-full h-[10px] w-[10px]"
                      : "bg-red-500 rounded-full h-[10px] w-[10px]"
                  }`}
                />
                <Text className="text-[#52697E] ml-1 font-pregular">
                  {statusLabel}
                </Text>
              </View> */}
            </View>
          </View>
        </View>
        <View className="flex-row mr-2">
          <TouchableOpacity activeOpacity={0.5}>
            <Link
              href={"/phoneCall"}
              className="flex items-center justify-center mr-4"
            >
              <Feather name="phone" size={24} color="#FF8642" />
            </Link>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Link
              href={"/phoneCall"}
              className="flex items-center justify-center"
            >
              <Feather name="video" size={24} color="#FF8642" />
            </Link>
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-[#D9D9D9] w-[95vw] h-[1px] mt-4" />
    </View>
  );
};

export default MessagingNav;
