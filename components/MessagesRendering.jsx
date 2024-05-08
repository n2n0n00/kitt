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
        renderItem={({ item }) => (
          <>
            {item.users.map((user, userIndex) => (
              <MessagesCardItem
                key={`user-${userIndex}`}
                name={user.userName}
                timer={item.userConversationDocuments[userIndex].$updatedAt}
                textPreview={
                  item.userConversationDocuments[userIndex].conversationId
                }
                avatar={user.userAvatar}
              />
            ))}
          </>
        )}
        keyExtractor={(item, userIndex) => item.users[userIndex].userName}
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
