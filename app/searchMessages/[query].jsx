import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../api/useAppwrite";

import { fetchConversationsByUserSearch } from "../../api/appwrite";
import MessagesCardItem from "../../components/MessagesCard";

const Search = () => {
  const { query } = useLocalSearchParams();
  //to call the function put it into a callback
  const {
    data: conversations = [{ userConversationDocuments, users }],
    refetch,
  } = useAppwrite(() => fetchConversationsByUserSearch(query));

  useEffect(() => {
    refetch();
  }, [query]);

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
      />
    </SafeAreaView>
  );
};

export default Search;
