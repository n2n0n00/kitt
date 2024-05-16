import { View, TextInput, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import ConversationBubbleRight from "./ConversationBubbleRight";
import ConversationBubbleLeft from "./ConversationBubble";
import { fetchMessagebyId } from "../api/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";

const ConversationRendering = ({ conversation }) => {
  const { user } = useGlobalContext();
  const [conversations, setConversations] = useState();
  const [loading, setLoading] = useState(true);
  const userId = user.accountId;

  useEffect(() => {
    if (conversation && conversation.length > 0) {
      fetchMessages(conversation[0].messageIdsArray);
      console.log(conversations);
    }
  }, [conversation]);

  // useEffect(() => {
  //   fetchMessages();
  //   console.log(conversations);
  // }, [conversations]);

  const fetchMessages = async (messageIds) => {
    try {
      // const messageIds = await conversation[0].messageIdsArray;

      const conversationsData = await fetchMessagebyId(await messageIds);

      setConversations(conversationsData);

      if (conversations === undefined) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  return (
    <SafeAreaView className="flex-col bg-[#FAFDFF] items-center justify-start w-full h-[84vh]">
      <View className="w-full h-[92%] p-2 absolute top-0">
        <ScrollView>
          {loading ? (
            <Text>Loading...</Text>
          ) : conversations === undefined ? (
            <></>
          ) : (
            conversations.map((item, index) => {
              item.senderId === userId ? (
                <View key={index} className="mb-4 items-end">
                  <ConversationBubbleRight body={item.body} />
                </View>
              ) : (
                <View key={index} className="mb-4 items-start">
                  <ConversationBubbleLeft body={item.body} />
                </View>
              );
            })
          )}
        </ScrollView>
      </View>

      <View className="w-full px-2 h-[80px] items-center justify-center absolute bottom-0 z-50">
        <View className="flex-row p-2 items-center justify-center bg-[#E2E9ED] rounded-2xl h-[60px] relative">
          <Feather name="paperclip" size={26} color="#1E5860" />
          <TextInput
            className="flex-1 text-black font-pregular mt-0.5 text-base px-4"
            placeholder="Search..."
            placeholderTextColor="#cdcde0"
          />

          <View className="h-[40px] w-[40px] bg-[#885FFF] rounded-full items-center pr-1 justify-center">
            <FontAwesome name="send" size={17} color="white" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConversationRendering;
