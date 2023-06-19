import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
  const { id, name, backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Set the navigation options to display the chat user's name as the title
    navigation.setOptions({ title: name });

    // Create a Firestore query to fetch messages ordered by createdAt in descending order
    const unsubscribe = onSnapshot(
      query(collection(db, 'messages'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        // Map the fetched documents to a new array of messages
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
          };
        });
        // Update the messages state with the new array of messages
        setMessages(newMessages);
      }
    );

    // Clean up the Firestore listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const onSend = (newMessages) => {
    const message = newMessages[0];

     // Add the new message to the Firestore collection
    addDoc(collection(db, 'messages'), {
      text: message.text,
      createdAt: message.createdAt,
      user: {
        _id: id,
        name: name,
      },
    });
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

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Render the GiftedChat component */}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: id,
          name: name,
        }}
      />
      {/* Platform-specific keyboard behavior */}
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
