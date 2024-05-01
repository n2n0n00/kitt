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
      const conversations = await fetchConversationsByUser();
      console.log(conversations);
      setConversations(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  return (
    <SafeAreaView className="w-full h-full">
      <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <MessagesCardItem
            name={item.receiverId}
            timer={item.$updatedAt}
            textPreview={item.conversationId}
          />
        )}
        keyExtractor={(item) => item.$id}
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
