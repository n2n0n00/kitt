import { StatusBar } from "expo-status-bar";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { icons } from "../constants";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

export default function App() {
  return (
    <SafeAreaView style={styles.container} className="h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={icons.indexScreen}
            className="w-[500px] h-[500px]"
            resizeMode="contain"
          />

          <CustomButton
            label="Login"
            handlePress={() => router.push("./sign-in")}
            textStyles="text-black text-lg"
            containerStyles="w-full bg-white mb-8"
          />

          <View>
            <Text className="text-lg text-center mb-6">
              Login with exisitng account?
            </Text>
            <View className="flex-row mb-4">
              <CustomButton
                image={icons.facebook}
                handlePress={() => router.push("./sign-in")}
                textStyles="text-black"
                containerStyles="w-[105px] bg-white mr-2"
              />
              <CustomButton
                image={icons.twitter}
                handlePress={() => router.push("./sign-in")}
                textStyles="text-black"
                containerStyles="w-[105px] bg-white mr-2"
              />
              <CustomButton
                image={icons.google}
                handlePress={() => router.push("./sign-in")}
                textStyles="text-black"
                containerStyles="w-[105px] bg-white"
              />
            </View>
            <View className="flex-row justify-center items-center">
              <Text className="text-lg">Don't have an account?</Text>
              <CustomButton
                label="Sign Up"
                handlePress={() => router.push("./sign-up")}
                textStyles="text-white text-lg"
                containerStyles="ml-2 mt-1"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255,184,118)",
    backgroundImage:
      "linear-gradient(48deg, rgba(255,184,118,1) 49%, rgba(255,135,67,1) 100%);",
  },
});
