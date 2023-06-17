// Importing the necessary components from React and React Native libraries
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Chat component
const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params; // Extracting the 'name' and 'backgroundolor' parameters from the route

  // useEffect hook to set the navigation options when the component mounts
  useEffect(() => {
    navigation.setOptions({ title: name }); // Setting the title of the screen to the 'name' parameter
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>Hello {name}</Text>
    </View>
  );
}

// Styles for the Chat component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: '#FFFFFF',
  },
});

export default Chat; // Exporting the Chat component as the default export
