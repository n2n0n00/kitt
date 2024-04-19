import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomButton = ({
  label,
  image,
  handlePress,
  textStyles,
  isLoading,
  containerStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      {label ? (
        <Text className={`font-psemibold ${textStyles}`}>{label}</Text>
      ) : (
        <View>
          <Image source={image} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
