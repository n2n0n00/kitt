import {
  View,
  TextInput,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import ConversationBubbleRight from "./ConversationBubbleRight";
import ConversationBubbleLeft from "./ConversationBubble";
import { addMessageToConversation, fetchMessagebyId } from "../api/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";

const ConversationRendering = ({ conversation, userData }) => {
  const { user } = useGlobalContext();
  const [conversations, setConversations] = useState();
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const userId = user.accountId;

  const scrollViewRef = useRef();

  const [message, setMessage] = useState({
    body: "",
  });

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const messageIds = conversation[0].messageIdsArray;
        const conversationsData = await fetchMessagebyId(messageIds);
        setConversations(conversationsData);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000);

    fetchMessages();
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [conversation]);

  useLayoutEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [conversation]);

  // useEffect(() => {
  //   fetchMessages();
  //   console.log(conversation[0].messageIdsArray);
  // }, [conversation[0].messageIdsArray]);

  // const fetchMessages = async () => {
  //   try {
  //     const messageIds = await conversation[0].messageIdsArray;

  //     const conversationsData = await fetchMessagebyId(messageIds);
  //     setConversations(conversationsData);

  //     if (conversations === undefined) {
  //       setLoading(false);
  //     }

  //     // if (loading === true) {
  //     //   setLoading(false);
  //     // }
  //   } catch (error) {
  //     console.error("Error fetching conversations:", error);
  //   }
  // };

  const submitMessage = async () => {
    if (message.body === "") {
      return Alert.alert("Message is empty");
    }

    const receiverId = userData?.userAccountId;
    const messageSend = message.body;

    try {
      await addMessageToConversation(receiverId, messageSend);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setMessage({
        body: "",
      });

      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-col bg-[#FAFDFF] items-center justify-start w-full h-[84vh]">
      <View className="w-full h-[92%] p-2 absolute top-0">
        <ScrollView ref={scrollViewRef}>
          {initialLoading ? (
            <Text className="text-">Loading...</Text>
          ) : conversations === undefined ? (
            <></>
          ) : (
            conversations.map((item, index) => (
              <View key={index}>
                {item.senderId === userId ? (
                  <View className="mb-4 items-end">
                    <ConversationBubbleRight
                      body={item.body}
                      timeStamp={item.timeStamp}
                    />
                  </View>
                ) : (
                  <View className="mb-4 items-start">
                    <ConversationBubbleLeft
                      body={item.body}
                      timeStamp={item.timeStamp}
                    />
                  </View>
                )}
              </View>
            ))
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
            value={message.body}
            onChangeText={(e) => setMessage({ ...message, body: e })}
          />

          <TouchableOpacity
            className="h-[40px] w-[40px] bg-[#885FFF] rounded-full items-center pr-1 justify-center"
            onPress={submitMessage}
          >
            <FontAwesome name="send" size={17} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConversationRendering;
