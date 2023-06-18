// Importing the necessary components from React and React Native libraries
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

// Chat component
const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params; // Extracting the 'name' and 'backgroundolor' parameters from the route
  const [messages, setMessages] = useState([]);

  // useEffect hook to set the navigation options when the component mounts
  useEffect(() => {
    navigation.setOptions({ title: name });
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]); // Setting the title of the screen to the 'name' parameter
  }, []);

  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
    <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
        name
      }}
    />
    {Platform.OS==='android' ? <KeyboardAvoidingView
    behavior="height" /> : null}
    </View>
  )
}

// Styles for the Chat component
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat; // Exporting the Chat component as the default export
