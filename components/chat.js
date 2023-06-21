import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Image } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, isConnected }) => {
  const { id, name, backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Set the navigation options to display the chat user's name as the title
    navigation.setOptions({ title: name });

    // Create a Firestore query to fetch messages ordered by createdAt in descending order
    if (isConnected) {
      const unsubscribe = onSnapshot(
        query(collection(db, 'messages'), orderBy('createdAt', 'desc')),
        (snapshot) => {
          // Map the Firestore document data to the chat message format
          const newMessages = snapshot.docs.map((doc) => {
            const messageData = doc.data();
            return {
              _id: doc.id,
              text: messageData.text,
              createdAt: new Date(messageData.createdAt.toMillis()),
              user: {
                _id: messageData.user._id,
                name: messageData.user.name,
              },
              location: messageData.location ? {
                latitude: messageData.location.latitude,
                longitude: messageData.location.longitude,
              } : null,
              image: messageData.image ? messageData.image : null, // Add image property
            };
          });
          setMessages(newMessages);
          cacheMessages(newMessages); // Cache the messages when fetched
        }
      );
      return () => {
        unsubscribe(); // Unsubscribe from the Firestore snapshot listener
      };
    } else {
      loadCachedMessages(); // Load cached messages if not connected
    }
  }, [isConnected]);

  const onSend = (newMessages) => {
    newMessages.forEach(async (message) => {
      const { _id, text, createdAt, user, location, image } = message; // Destructure the message data
      const messageData = { _id, createdAt, user };
      if (text) {
        messageData.text = text;
      }
      if (location) {
        messageData.location = location;
      }
      if (image) {
        messageData.image = image;
      }
      await addDoc(collection(db, "messages"), messageData); // Add the message to Firestore collection
    });
  };
  

  const cacheMessages = async (messages) => {
    try {
      await AsyncStorage.setItem('cachedMessages', JSON.stringify(messages)); // Cache the messages in AsyncStorage
    } catch (error) {
      console.log('Error caching messages:', error);
    }
  };

  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem('cachedMessages'); // Load cached messages from AsyncStorage
      if (cachedMessages) {
        setMessages(JSON.parse(cachedMessages));
      }
    } catch (error) {
      console.log('Error loading cached messages:', error);
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null;
    }
  };

  const renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    } else if (currentMessage.image) { // Render image if it exists
      return (
        <Image
          source={{ uri: currentMessage.image }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar} // Override renderInputToolbar prop
        onSend={messages => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        renderCustomActions={renderCustomActions}
        user={{
          _id: id,
          name: name,
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;