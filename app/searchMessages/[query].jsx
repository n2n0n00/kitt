import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../api/useAppwrite";

import { fetchConversationsByUserSearch } from "../../api/appwrite";
import MessagesCardItem from "../../components/MessagesCard";
import NavbarTab from "../../components/NavbarTab";
import SearchBar from "../../components/SearchBar";

const searchMessages = () => {
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
    <SafeAreaView className="h-full w-full bg-white">
      <View className="px-2 h-screen justify-center items-center flex-col">
        <NavbarTab />
        <View className="mb-10">
          <SearchBar />
        </View>

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
                  collectionId={
                    item.userConversationDocuments[userIndex].$collectionId
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
      </View>
    </SafeAreaView>
  );
};

export default searchMessages;
