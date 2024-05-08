import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import MessagesCardItem from "./MessagesCard";
import { fetchConversationsByUser } from "../api/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

const MessagesRendering = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const conversationsData = await fetchConversationsByUser();
      setConversations(conversationsData);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  return (
    <SafeAreaView className="">
      <FlatList
        data={conversations}
        renderItem={({ item, index }) => (
          <MessagesCardItem
            name={item.userData.userName}
            timer={item.userConversationDocuments[index].$updatedAt}
            textPreview={item.userConversationDocuments[index].conversationId}
            avatar={item.userData.userAvatar}
          />
        )}
        keyExtractor={(item) => item.userData.userName}
        ItemSeparatorComponent={() => <View />}
        // ListEmptyComponent={() => (
        //   <EmptyState
        //     title="No Conversations Found"
        //     subtitle="No Conversations found for this profile"
        //   />
        // )}
        ListHeaderComponent={() => (
          <View>
            <Text>Header</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default MessagesRendering;
