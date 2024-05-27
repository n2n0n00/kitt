import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { signOut } from "../../api/appwrite";
import { router } from "expo-router";
import useGlobalContext from "../../context/GlobalProvider";
import ProfileNav from "../../components/ProfileNav";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import PostsCollections from "../../components/PostsCollections";

const Profile = () => {
  // const { setUser, setIsLogged } = useGlobalContext();

  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="px-2 justify-center items-center flex-col">
        <View className="flex-col items-center">
          <ProfileNav />
          <ProfileHeader />
          <PostsCollections />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

{
  /* <View>
  <TouchableOpacity onPress={logout}>
  <Text>SignOut</Text>
  </TouchableOpacity>
  </View> */
}

// const logout = async () => {
//   await signOut();
//   setUser(null);
//   setIsLogged(false);

//   router.replace("/sign-in");
// };
