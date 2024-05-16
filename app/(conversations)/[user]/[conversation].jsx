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

const Conversation = () => {
  const conversationId = useLocalSearchParams();

  const [conversation, setConversation] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchMessages();
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
              statusLabel="Online"
              name={userData.userName}
            />

            <ConversationRendering conversation={conversation} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Conversation;
