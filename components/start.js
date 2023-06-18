import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');

  // Define the color options
  const colorOptions = [
    { name: 'Black', color: '#090C08' },
    { name: 'Purple', color: '#474056' },
    { name: 'Gray', color: '#8A95A5' },
    { name: 'Green', color: '#B9C6AE' },
  ];

  useEffect(() => {
    navigation.setOptions({
      onPress: handlePress,
    });
  }, []);

  const handlePress = () => {
    // Handle the onPress event here
  };

  return (
    <ImageBackground
      source={require('../assets/Background-Image.png')}
      style={[styles.backgroundImage, { backgroundColor }]}
    >
      <View style={styles.container}>
        {/* App title */}
        <Text style={styles.title}>ChatSpace</Text>
        
        <View style={styles.contentContainer}>
          {/* Username input */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
          />

          {/* Render color options */}
          <Text style={styles.colorOptionsText}>Choose Background Color</Text>
          <View style={styles.colorOptions}>
            {colorOptions.map((option) => (
              <TouchableOpacity
                key={option.name}
                style={[styles.colorOption, { backgroundColor: option.color }]}
                onPress={() => setBackgroundColor(option.color)}
              />
            ))}
          </View>

          {/* Go to Chat button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Chat', { name, backgroundColor })}
            accessible={true}
            accessibilityLabel="More options"
            accessibilityHint="Lets you choose to send an image or your geolocation."
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Go to Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Keyboard behavior for ios */}
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 50,
    marginBottom: 280,
  },
  contentContainer: {
    width: '88%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
  },
  colorOptionsText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: '#757083',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Start;
