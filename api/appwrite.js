import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.kitt.kitt",
  projectId: "6626ada222f4fef5abeb",
  databaseId: "6626b129a794f927cedf",
  groupedMessagesCollection: "662c1b47002ed415b33c",
  messagesCollection: "662c1a9e0004417c9970",
  usersCollection: "662c19e70039a60041ee",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  groupedMessagesCollection,
  messagesCollection,
  usersCollection,
} = appwriteConfig;

const client = new Client();

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

export async function createNewConversation(senderId, receiverId, messageId) {
  try {
    const conversationId = ID.unique();
    const newConversation = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.groupedMessagesCollection,
      conversationId,
      {
        conversationId: conversationId,
        senderId: senderId,
        receiverId: receiverId,
        messageIdsArray: [messageId],
      }
    );

    return newConversation;
  } catch (error) {
    throw new Error(error);
  }
}

export async function addMessageToConversation(senderId, receiverId, body) {
  try {
    const messageId = ID.unique();
    const newMessage = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.messagesCollection,
      messageId,
      {
        messageId: messageId,
        senderId: senderId,
        receiverId: receiverId,
        body: body,
        timeStamp: new Date().toISOString(),
      }
    );

    const query = `{"filters": [{"fieldName": "senderId", "operator": "eq", "value": "${senderId}"}, {"fieldName": "receiverId", "operator": "eq", "value": "${receiverId}"}]}`;
    const conversations = await sdk.database.listDocuments(
      "groupedMessagesCollection",
      undefined,
      undefined,
      query
    );

    if (!conversations) {
      await createNewConversation(senderId, receiverId, messageId);
      return newMessage;
    } else {
      const conversationData = conversations.documents[0];

      const existingMessageIds = conversationData.messageIdsArray;

      // Append the new messageId to the existing array using the spread operator
      const updatedMessageIds = [...existingMessageIds, messageId];

      const updateConversation = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.groupedMessagesCollection,
        conversationData.conversationId,
        {
          conversationId: conversationData.conversationId,
          senderId: senderId,
          receiverId: receiverId,
          messageIdsArray: updatedMessageIds,
        }
      );

      return updateConversation;
    }
  } catch (error) {
    throw new Error(error);
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
      for (const messageId of messageIds) {
        const message = await databases.listDocuments(
          databaseId,
          messagesCollection,
          [Query.equal("messageId", messageId)]
        );

        messageArray.push(message.documents[0].body);
        messageSenders.push(message.documents[0].senderId);
      }

      const messages = [];

      for (let i = 0; i < messageArray.length; i++) {
        const messageObject = {
          senderId: messageSenders[i],
          body: messageArray[i],
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
