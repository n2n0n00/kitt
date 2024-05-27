import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const PostComponent = ({
  photos,
  content,
  userName,
  timeStamp,
  avatar,
  comments,
  likes,
}) => {
  return (
    <View className="p-4 bg-[#E5E5E5] rounded-xl mb-8">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row gap-4">
          <View className="bg-[#BCC2C3] w-[35px] h-[35px] rounded-full" />
          <View>
            <Text className="text-[13px] font-pmedium">{userName}</Text>
            <Text className="text-[#81999E] font-pregular text-[11px]">
              {timeStamp}
            </Text>
          </View>
        </View>

        <View className="flex-row gap-1">
          <View className="bg-[#BCC2C3] w-[4px] h-[5px] rounded-full" />
          <View className="bg-[#BCC2C3] w-[4px] h-[5px] rounded-full" />
          <View className="bg-[#BCC2C3] w-[4px] h-[5px] rounded-full" />
        </View>
      </View>
      <View className="mb-4">
        <Text className="text-[13px] text-black font-pregular">{content}</Text>
      </View>
      <View className="w-full flex-row justify-between mb-4">
        <View className="bg-[#BCC2C3] w-[165px] h-[204px] rounded-xl" />
        <View className="bg-[#BCC2C3] w-[165px] h-[204px] rounded-xl" />
      </View>
      <View className="flex-row w-full items-start justify-start gap-5 mb-4">
        <View className="flex-row items-center">
          <EvilIcons name="comment" size={30} color="#6A798A" />
          <Text className="text-[#6A798A] font-pregular text-[15px]">
            {comments}
          </Text>
        </View>
        <View className="flex-row items-center">
          <EvilIcons name="like" size={30} color="#6A798A" />
          <Text className="text-[#6A798A] font-pregular text-[15px]">
            {likes}
          </Text>
        </View>
      </View>
    </View>
  );
};

const dataPosts = [
  {
    id: "1",
    photos: "Item 1",
    content:
      "Look my collection, i really want to share about my last trip to Bali. Please check guys!",
    userName: "Bitch What",
    timeStamp: "2 minutes",
    avatar: "link",
    comments: "24k",
    likes: "50k",
  },
  {
    id: "2",
    photos: "Item 2",
    content:
      "Look my collection, i really want to share about my last trip to Bali. Please check guys!",
    userName: "Bitch What",
    timeStamp: "2 minutes",
    avatar: "link",
    comments: "24k",
    likes: "50k",
  },
  {
    id: "3",
    photos: "Item 3",
    content:
      "Look my collection, i really want to share about my last trip to Bali. Please check guys!",
    userName: "Bitch What",
    timeStamp: "2 minutes",
    avatar: "link",
    comments: "24k",
    likes: "50k",
  },
  {
    id: "4",
    photos: "Item 4",
    content:
      "Look my collection, i really want to share about my last trip to Bali. Please check guys!",
    userName: "Bitch What",
    timeStamp: "2 minutes",
    avatar: "link",
    comments: "24k",
    likes: "50k",
  },
  {
    id: "5",
    photos: "Item 5",
    content:
      "Look my collection, i really want to share about my last trip to Bali. Please check guys!",
    userName: "Bitch What",
    timeStamp: "2 minutes",
    avatar: "link",
    comments: "24k",
    likes: "50k",
  },
];

const Posts = () => {
  return (
    <FlatList
      data={dataPosts}
      renderItem={({ item }) => (
        <PostComponent
          content={item.content}
          userName={item.userName}
          timeStamp={item.timeStamp}
          comments={item.comments}
          likes={item.likes}
        />
      )}
      keyExtractor={(item) => item.id}
      numColumns={1}
      contentContainerStyle={{
        justifyContent: "center",
        paddingTop: 10,
      }}
    />
  );
};

const data = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
  { id: "4", title: "Item 4" },
  { id: "5", title: "Item 5" },
  { id: "6", title: "Item 6" },
  { id: "7", title: "Item 7" },
  { id: "8", title: "Item 8" },
  { id: "9", title: "Item 9" },
];

const Collections = () => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View
          style={{
            width: 110,
            height: 110,
            backgroundColor: "#DCDEE0",
            margin: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{item.title}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
      numColumns={3}
      contentContainerStyle={{ justifyContent: "center", padding: 10 }}
    />
  );
};

const PostsCollections = () => {
  const [currentTab, setCurrentTab] = useState("Posts");

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <View className="w-full flex-1">
      <View className="flex-row items-center justify-evenly w-full border-b-[1px] border-[#DCDEE0]">
        <TouchableOpacity onPress={() => handleTabChange("Posts")}>
          {currentTab === "Posts" ? (
            <View className="border-b-[1px] border-[#FF8743] w-[150px] items-center">
              <Text className="text-[#FF8743] text-[15px] font-pmedium">
                Posts
              </Text>
            </View>
          ) : (
            <View className="w-[150px] items-center">
              <Text className="text-black text-[15px] font-pmedium">Posts</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange("Collections")}>
          {currentTab === "Collections" ? (
            <View className="border-b-[1px] border-[#FF8743] w-[150px] items-center">
              <Text className="text-[#FF8743] text-[15px] font-pmedium">
                Collections
              </Text>
            </View>
          ) : (
            <View className="w-[150px] items-center">
              <Text className="text-black text-[15px] font-pmedium">
                Collections
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        {currentTab === "Posts" ? <Posts /> : <Collections />}
      </View>
    </View>
  );
};

export default PostsCollections;
