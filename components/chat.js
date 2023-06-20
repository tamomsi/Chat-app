import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
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
            };
          });
          setMessages(newMessages);
          cacheMessages(newMessages); // Cache the messages when fetched
        }
      );
      return () => {
        unsubscribe();
      };
    } else {
      loadCachedMessages();
    }
  }, [isConnected]);

  const onSend = (newMessages) => {
    newMessages.forEach(async (message) => {
      const { _id, text, createdAt, user, location } = message;
      const messageData = { _id, text, createdAt, user };
      if (location) {
        messageData.location = location;
      }
      await addDoc(collection(db, "messages"), messageData);
    });
  };
  
  
  const cacheMessages = async (messages) => {
    try {
      await AsyncStorage.setItem('cachedMessages', JSON.stringify(messages));
    } catch (error) {
      console.log('Error caching messages:', error);
    }
  };

  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem('cachedMessages');
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
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar} // Override renderInputToolbar prop
        onSend={messages => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
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