import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import { formatTime } from "../utils/utils";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.kitt.kitt",
  projectId: "6626ada222f4fef5abeb",
  databaseId: "6626b129a794f927cedf",
  groupedMessagesCollection: "662c1b47002ed415b33c",
  messagesCollection: "662c1a9e0004417c9970",
  usersCollection: "662c19e70039a60041ee",
  friends: "6658ee520004d381b033",
  followers: "6658e5020038ca7b9d53",
};

export const {
  endpoint,
  platform,
  projectId,
  databaseId,
  groupedMessagesCollection,
  messagesCollection,
  usersCollection,
  friends,
  followers,
} = appwriteConfig;

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
// const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createUser(email, password, name) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(name);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollection,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        name: name,
        password: password,
        avatar: avatarUrl,
      }
    );

    const followerDatabase = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followers,
      ID.unique(),
      {
        followedAccountId: newUser.accountId,
        followers: [],
      }
    );

    const friendsDatabase = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.friends,
      ID.unique(),
      {
        friendsAccountId: newUser.accountId,
        friends: [],
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      usersCollection,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function getNameByUserId(userId) {
  try {
    const userDocuments = await databases.listDocuments(
      databaseId,
      usersCollection,
      [Query.equal("accountId", `${userId}`)]
    );

    if (userDocuments.length === 0) {
      throw new Error(`User with userId ${userId} not found.`);
    }

    // Assuming the user document contains a field named "name"
    const userName = userDocuments.documents[0].name;
    const userAvatar = userDocuments.documents[0].avatar;
    const userAccountId = userDocuments.documents[0].accountId;

    return {
      userName,
      userAvatar,
      userAccountId,
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchConversationsByUser() {
  try {
    const currentAccount = await getCurrentUser();

    const query = `{"filters": [{"fieldName": "senderId", "operator": "eq", "value": "${currentAccount.accountId}"}, {"fieldName": "receiverId", "operator": "eq", "value": "${currentAccount.accountId}", "or": true}]}`;
    const conversations = await databases.listDocuments(
      databaseId,
      groupedMessagesCollection,
      query
      // [Query.equal("senderId", `${currentAccount.accountId}`)]
    );

    const userConversationDocuments = conversations.documents;

    const users = await Promise.all(
      userConversationDocuments.map(async (item) => {
        let userData;
        let receiverIdExtracted;

        if (currentAccount.accountId === item.receiverId) {
          receiverIdExtracted = item.senderId;
          userData = await getNameByUserId(receiverIdExtracted);
        }

        if (currentAccount.accountId === item.senderId) {
          receiverIdExtracted = item.receiverId;
          userData = await getNameByUserId(receiverIdExtracted);
        }

        return userData; // Return the userData for Promise.all
      })
    );

    return [{ userConversationDocuments, users }];
    // return conversations.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createNewConversation(receiverId, messageId) {
  try {
    const currentUserObject = await getCurrentUser();
    const currentUser = currentUserObject.accountId;
    const conversationId = Date.now().toString();
    const newConversation = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.groupedMessagesCollection,
      ID.unique(),
      {
        conversationId: conversationId,
        senderId: currentUser,
        receiverId: receiverId,
        messageIdsArray: [messageId], // Should be an array
      }
    );

    return newConversation;
  } catch (error) {
    throw new Error(`Failed to create new conversation: ${error.message}`);
  }
}

export async function addMessageToConversation(receiverId, body) {
  try {
    const currentUserObject = await getCurrentUser();
    const currentUser = currentUserObject.accountId;
    const messageId = Date.now().toString();
    const newMessage = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.messagesCollection,
      ID.unique(),
      {
        messageId: messageId,
        senderId: currentUser,
        receiverId: receiverId,
        body: body,
        timeStamp: new Date().toISOString(),
      }
    );

    // const query = `{
    //   filters: [
    //     {
    //       operator: "or",
    //       filters: [
    //         {
    //           operator: "and",
    //           filters: [
    //             {
    //               fieldName: "senderId",
    //               operator: "eq",
    //               value: ${currentUser},
    //             },
    //             {
    //               fieldName: "receiverId",
    //               operator: "eq",
    //               value: ${receiverId},
    //             },
    //           ],
    //         },
    //         {
    //           operator: "and",
    //           filters: [
    //             {
    //               fieldName: "senderId",
    //               operator: "eq",
    //               value: ${receiverId},
    //             },
    //             {
    //               fieldName: "receiverId",
    //               operator: "eq",
    //               value: ${currentUser},
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // }`;

    // let conversations = await databases.listDocuments(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.groupedMessagesCollection,
    //   query // Ensure the query is parsed correctly
    // );
    // console.log(receiverId);
    // console.log(conversations);

    const conversations = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.groupedMessagesCollection
    );

    const conversation = conversations.documents.filter((doc) => {
      return (
        (doc.senderId === currentUser && doc.receiverId === receiverId) ||
        (doc.senderId === receiverId && doc.receiverId === currentUser)
      );
    });

    if (!conversation.length) {
      const newConversation = await createNewConversation(
        receiverId,
        messageId
      );
      return newConversation;
    } else {
      const conversationData = conversation[0];
      const existingMessageIds = conversationData.messageIdsArray;

      // Append the new messageId to the existing array
      const updatedMessageIds = [...existingMessageIds, messageId];

      const updatedConversation = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.groupedMessagesCollection,
        conversationData.$id, // Use $id for document identifier
        {
          conversationId: conversationData.conversationId,
          senderId: conversationData.senderId,
          receiverId: conversationData.receiverId,
          messageIdsArray: updatedMessageIds,
        }
      );

      return updatedConversation;
    }
  } catch (error) {
    throw new Error(`Failed to add message to conversation: ${error.message}`);
  }
}

export async function fetchConversationsByUserSearch(querySearch) {
  try {
    const currentAccount = await getCurrentUser();

    // Constructing the query for conversations
    const query = `{"filters": [{"fieldName": "senderId", "operator": "eq", "value": "${currentAccount.accountId}"}, {"fieldName": "receiverId", "operator": "eq", "value": "${currentAccount.accountId}", "or": true}]}`;

    // Fetch conversations
    const conversations = await databases.listDocuments(
      databaseId,
      groupedMessagesCollection,
      query
    );

    // Fetch users by name search
    const searchedUser = await databases.listDocuments(
      databaseId,
      usersCollection,
      [Query.search("name", querySearch)]
    );

    // Extract user IDs
    const userIds = searchedUser.documents
      .filter((item) => item.accountId !== currentAccount.accountId)
      .map((item) => item.accountId);

    // Function to filter conversations by users
    const searchedArrayConversations = () => {
      const userConversations = [];
      for (const user of userIds) {
        for (const conversation of conversations.documents) {
          // Ensure conversations is an array
          if (
            user === conversation.senderId ||
            user === conversation.receiverId
          ) {
            userConversations.push(conversation);
          }
        }
      }
      return userConversations;
    };

    const userConversationDocuments = searchedArrayConversations();

    const users = await Promise.all(
      userConversationDocuments.map(async (item) => {
        let userData;
        let receiverIdExtracted;

        if (currentAccount.accountId === item.receiverId) {
          receiverIdExtracted = item.senderId;
          userData = await getNameByUserId(receiverIdExtracted);
        }

        if (currentAccount.accountId === item.senderId) {
          receiverIdExtracted = item.receiverId;
          userData = await getNameByUserId(receiverIdExtracted);
        }

        return userData; // Return the userData for Promise.all
      })
    );

    return [{ userConversationDocuments, users }];
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchMessagesByConversationId(conversationId) {
  try {
    const conversation = await databases.listDocuments(
      databaseId,
      groupedMessagesCollection,
      [Query.equal("conversationId", `${conversationId}`)]
    );

    return conversation.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchMessagebyId(messageIds) {
  try {
    const conversationArray = async () => {
      const messageArray = [];
      const messageSenders = [];
      const messageTimer = [];
      for (const messageId of messageIds) {
        const message = await databases.listDocuments(
          databaseId,
          messagesCollection,
          [Query.equal("messageId", messageId)]
        );

        messageArray.push(message.documents[0].body);
        messageSenders.push(message.documents[0].senderId);
        messageTimer.push(formatTime(message.documents[0].timeStamp));
      }

      const messages = [];

      for (let i = 0; i < messageArray.length; i++) {
        const messageObject = {
          senderId: messageSenders[i],
          body: messageArray[i],
          timeStamp: messageTimer[i],
        };
        messages.push(messageObject);
      }
      return messages;
      // return [{ messageArray, messageSenders }];
    };

    const totalMessages = await conversationArray();

    return totalMessages;
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchFollowerbyUserId() {
  try {
    const userData = await getCurrentUser();
    const userId = userData.accountId;

    // follower fetching
    const followerQuery = await databases.listDocuments(databaseId, followers, [
      Query.equal("followedAccountId", userId),
    ]);

    const followersArray = followerQuery.documents;

    const userFollowers = followersArray.reduce((acc, doc) => {
      if (doc.followers && Array.isArray(doc.followers)) {
        acc.push(...doc.followers);
      }
      return acc;
    }, []);

    const followerCount = followersArray.length;

    // friends fetching
    const friendsQuery = await databases.listDocuments(databaseId, friends, [
      Query.equal("friendsAccountId", userId),
    ]);

    const friendsArray = friendsQuery.documents;

    const userFriends = friendsArray.reduce((acc, doc) => {
      if (doc.friends && Array.isArray(doc.friends)) {
        acc.push(...doc.friends);
      }
      return acc;
    }, []);

    const friendsCount = friendsArray.length;

    return [{ followerCount, friendsCount, userFriends, userFollowers }];
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw new Error(error);
  }
}

// export async function followerFriendsHandling(userId, followedId) {
//   try {
//     //query follower db for followedId = followedAccountId
//     const followerQuery = await databases.listDocuments(databaseId, followers, [
//       Query.equal("followerAccountId", followedId),
//     ]);
//     //add userId to followers array
//     let followersArray = followerQuery.followers;
//     followersArray.push(userId);
//     //return array
//     // return followersArray

//     //query friends db for userId = friendsAccountId

//     const friendsQuery = await databases.listDocuments(databaseId, friends, [
//       Query.equal("friendsAccountId", userId),
//     ]);
//     // add followedId to friends array
//     let friendsArray = friendsQuery.friends;
//     friendsArray.push(followedId);
//     //return array
//     //return friendsArray
//     //return [{friends.length, friends}, {followers, followers.length}]
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// export async function createNewConversation(receiverId, messageId) {
//   try {
//     const currentUserObject = await getCurrentUser();
//     const currentUser = currentUserObject.accountId;
//     const conversationId = ID.unique();
//     const newConversation = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.groupedMessagesCollection,
//       conversationId,
//       {
//         conversationId: conversationId,
//         senderId: currentUser,
//         receiverId: receiverId,
//         messageIdsArray: messageId,
//       }
//     );

//     return newConversation;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// export async function addMessageToConversation(receiverId, body) {
//   try {
//     const currentUserObject = await getCurrentUser();
//     const currentUser = currentUserObject.accountId;
//     const messageId = ID.unique();
//     const newMessage = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.messagesCollection,
//       messageId,
//       {
//         messageId: messageId,
//         senderId: currentUser,
//         receiverId: receiverId,
//         body: body,
//         timeStamp: new Date().toISOString(),
//       }
//     );

//     console.log(newMessage);

//     // const query = `{"filters": [{"fieldName": "senderId", "operator": "eq", "value": "${currentUser}"}, {"fieldName": "receiverId", "operator": "eq", "value": "${receiverId}"}]}`;

//     const query = `{
//       "filters": [
//         {
//           "operator": "or",
//           "filters": [
//             {
//               "fieldName": "senderId",
//               "operator": "eq",
//               "value": "${currentUser}"
//             },
//             {
//               "fieldName": "receiverId",
//               "operator": "eq",
//               "value": "${receiverId}"
//             }
//           ]
//         },
//         {
//           "operator": "or",
//           "filters": [
//             {
//               "fieldName": "senderId",
//               "operator": "eq",
//               "value": "${receiverId}"
//             },
//             {
//               "fieldName": "receiverId",
//               "operator": "eq",
//               "value": "${currentUser}"
//             }
//           ]
//         }
//       ]
//     }`;

//     const conversations = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.groupedMessagesCollection,
//       query
//     );

//     if (
// //      !conversations ||
//       conversations === null ||
//       conversations === undefined
//     ) {
//       conversations = await createNewConversation(receiverId, messageId);
//       return conversations;
//     } else {
//       const conversationData = conversations.documents[0];

//       const existingMessageIds = conversationData.messageIdsArray;

//       // Append the new messageId to the existing array using the spread operator
//       const updatedMessageIds = [...existingMessageIds, messageId];

//       const updateConversation = await databases.updateDocument(
//         appwriteConfig.databaseId,
//         appwriteConfig.groupedMessagesCollection,
//         conversationData.conversationId,
//         {
//           conversationId: conversationData.conversationId,
//           senderId: currentUser,
//           receiverId: receiverId,
//           messageIdsArray: updatedMessageIds,
//         }
//       );

//       return updateConversation;
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// }
//we send the message to the collection, the createConversation takes the senderId and the receiverId and the newMessage and creates a new conversation with an conversationId, receiver and senderId and pushes the message to the messagesArray. Limitations are that this is true only if the message is the first message in a conversation. Must check if the conversation exists then just push the message to the conversation.  I am not usre if appwrite supports a collection to be a part of an array, this would hinder my schema.

// export async function sendInitialMessage(senderId, receiverId, body) {
//   try {
//     const messageId = ID.unique();
//     const newMessage = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.messagesCollection,
//       messageId,
//       {
//         messageId: messageId,
//         senderId: senderId,
//         receiverId: receiverId,
//         body: body,
//         timeStamp: new Date().toISOString(),
//       }
//     );

//     await createNewConversation(senderId, receiverId, messageId);

//     return newMessage;
//   } catch (error) {
//     throw new Error(error);
//   }
// }
