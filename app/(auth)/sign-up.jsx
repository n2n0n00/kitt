import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { createUser } from "../../api/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const submit = async () => {
    if (form.name === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.name);
      setUser(result);
      setIsLogged(true);
      router.replace("/feed");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#FFBB7C] h-full">
      <ScrollView>
        <View className="w-full justify-center px-2 h-full">
          <Image source={icons.signup} className="my-8" />
          <View className="bg-white rounded-3xl px-4 mb-2">
            <View>
              <FormField
                title="Name"
                value={form.name}
                handleChangeText={(e) => setForm({ ...form, name: e })}
                otherStyles="mt-7"
                placeholder="Lorem Ipsum"
              />
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

            <View className="mt-4">
              <CustomButton
                label="Sign Up"
                handlePress={submit}
                isLoading={isSubmitting}
                textStyles="text-white text-lg"
                containerStyles="w-full bg-[#FF8743] mb-6"
              />
            </View>

            <View>
              {/* <Text className="text-center w-full text-md mb-2">
                Login with social?
              </Text>
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
                <Text className="text-lg">Already have an account?</Text>
                <CustomButton
                  label="Sign In"
                  handlePress={() => router.push("./sign-in")}
                  textStyles="text-[#FF8743] text-lg"
                  containerStyles="ml-2 mt-1"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
