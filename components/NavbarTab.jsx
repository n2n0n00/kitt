import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "../constants";

const NavbarTab = () => {
  return (
    <View className="flex-row items-center justify-center  w-screen border-2 border-red-500">
      <View>
        <Link href={"/settings"}>
          <Image source={icons.settings} />
        </Link>
      </View>
      <Text>Messages</Text>
      <View>
        <Link href={"/notifications"}>
          <Image source={icons.notifications} />
        </Link>
      </View>
    </View>
  );
};

export default NavbarTab;
