import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NavbarTab = () => {
  return (
    <View className="flex-row items-center justify-between w-full mt-2">
      <TouchableOpacity activeOpacity={0.5}>
        <Link className="flex items-center justify-center" href={"/settings"}>
          <MaterialCommunityIcons
            name="microsoft-xbox-controller-menu"
            size={38}
            color="#1E5860"
          />
        </Link>
      </TouchableOpacity>

      <Text className="text-secondary-200 font-medium text-xl">Messages</Text>
      <TouchableOpacity activeOpacity={0.5}>
        <Link
          href={"/notifications"}
          className="flex items-center justify-center"
        >
          <Ionicons
            name="notifications-circle-outline"
            size={38}
            color="#1E5860"
          />
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default NavbarTab;
