import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { signOut } from "../../api/appwrite";
import { router } from "expo-router";
import useGlobalContext from "../../context/GlobalProvider";

const Profile = () => {
  // const { setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    // setUser(null);
    // setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <View className="h-full w-full items-center justify-center">
      <TouchableOpacity
        onPress={logout}
        className="flex w-full items-end mb-10"
      >
        <Text>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
