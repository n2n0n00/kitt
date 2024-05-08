import { View, Text, SafeAreaView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { getCurrentUser, signIn } from "../../api/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      router.replace("/feed");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#FFBB7C] h-full">
      <View className="w-full justify-around px-2 h-full my-8 items-center">
        <Image source={icons.loginIcons} className="" />
        <View className="bg-white rounded-3xl px-4 mb-12">
          <View>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              placeholder="email@email.com"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              placeholder="*************"
            />
          </View>
          <View className="w-full ml-20">
            <CustomButton
              label="Forgot Your Password?"
              handlePress={() => router.push("./sign-up")}
              textStyles="text-black text-md text-right font-pnormal"
              containerStyles="ml-2 mt-1 w-full"
            />
          </View>

          <View className="mt-12">
            <CustomButton
              label="Login"
              textStyles="text-white text-lg"
              handlePress={submit}
              isLoading={isSubmitting}
              containerStyles="w-full bg-[#FF8743] mb-6"
            />
          </View>

          <View>
            {/* <Text className="text-center w-full">Login with social?</Text>
            <View className="flex-row w-full items-center justify-center mt-2">
              <CustomButton
                image={icons.facebook}
                handlePress={() => router.push("./sign-in")}
                textStyles="text-black"
                containerStyles="w-[105px] bg-white mr-2 border-gray-300 border-2"
              />
              <CustomButton
                image={icons.twitter}
                handlePress={() => router.push("./sign-in")}
                textStyles="text-black"
                containerStyles="w-[105px] bg-white mr-2 border-gray-300 border-2"
              />
              <CustomButton
                image={icons.google}
                handlePress={() => router.push("./sign-in")}
                textStyles="text-black"
                containerStyles="w-[105px] bg-white border-gray-300 border-2"
              />
            </View> */}
            <View className="flex-row justify-center items-center">
              <Text className="text-lg">Don't have an account?</Text>
              <CustomButton
                label="Sign Up"
                handlePress={() => router.push("./sign-up")}
                textStyles="text-[#FF8743] text-lg"
                containerStyles="ml-2 mt-1"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
