import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import MessagesCardItem from "./MessagesCard";
import { fetchConversationsByUser } from "../api/appwrite";

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
    <>
      <View>
        {conversations.map((item) => (
          <Text key={item.conversationId}>{item.conversationId}</Text>
        ))}
      </View>
    </>
    // <FlatList
    //   data={useruser}
    //   renderItem={({ item }) => <MessagesCardItem name={item.receiverId} />}
    //   keyExtractor={(item) => item.$id}
    //   ItemSeparatorComponent={() => <View />}
    //   ListHeaderComponent={() => (
    //     <View style={styles.header}>
    //       <Text>Header</Text>
    //     </View>
    //   )}
    //   refreshControl={
    //     <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    //   }
    // />
  );
};

export default MessagesRendering;
