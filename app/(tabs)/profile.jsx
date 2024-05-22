import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { signOut } from "../../api/appwrite";
import { router } from "expo-router";
import useGlobalContext from "../../context/GlobalProvider";
import ProfileNav from "../../components/ProfileNav";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";

const Profile = () => {
  // const { setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="px-2 h-screen justify-center items-center flex-col">
        <ProfileNav />
        <ProfileHeader />
        <TouchableOpacity
          onPress={logout}
          className="flex w-full items-end mb-10"
        >
          <Text>SignOut</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
