import { Text, View } from "react-native";

const ConversationBubbleRight = ({ body }) => (
  <View className="px-8 py-2 bg-[#FF8743] rounded-full rounded-br-none justify-start  items-start inline-flex w-[90%]">
    <Text className="text-[15px] font-pmedium text-white">{body}</Text>
    <Text className="text-[11px] font-pregular text-white">5</Text>
  </View>
);

export default ConversationBubbleRight;
