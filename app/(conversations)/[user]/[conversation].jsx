import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import MessagesRendering from "../../../components/MessagesRendering";
import MessagingNav from "../../../components/MessagingNav";
import ConversationRendering from "../../../components/ConversationRendering";
import { useLocalSearchParams } from "expo-router";
import {
  fetchMessagesByConversationId,
  getNameByUserId,
} from "../../../api/appwrite";

// Note: would have been better if I pushed locally and the saved to the server and fetched at every render? Will look into it for version 2

const Conversation = () => {
  const conversationId = useLocalSearchParams();

  const [conversation, setConversation] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchMessages();

    const fetchConversation = async () => {
      const conversations = await fetchMessagesByConversationId(
        conversationId.conversation
      );
      setConversation(conversations);
    };

    const intervalId = setInterval(() => {
      fetchConversation();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchMessages = async () => {
    try {
      const conversationUserData = await getNameByUserId(conversationId.user);
      const conversations = await fetchMessagesByConversationId(
        conversationId.conversation
      );

      setUserData(conversationUserData);
      setConversation(conversations);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="pt-16 px-2 h-screen justify-start items-center flex-col">
        {userData && conversation && (
          <>
            <MessagingNav
              avatar={userData.userAvatar}
              // statusLabel="Online"
              name={userData.userName}
            />

            <ConversationRendering
              userData={userData}
              conversation={conversation}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Conversation;
