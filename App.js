// Importing the 'Start' and 'Chat' components from their respective files
import React from 'react';
import Start from './components/start';
import Chat from './components/chat';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Importing necessary components from the React Navigation library
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Creating a native stack navigator using 'createNativeStackNavigator'
const Stack = createNativeStackNavigator();

// web app's Firebase configuration
const App = () => {
const firebaseConfig = {
  apiKey: "AIzaSyCgn0PhO0iwx14KoUjtVB0sm79sMYefpYk",
  authDomain: "chat-app-62d15.firebaseapp.com",
  projectId: "chat-app-62d15",
  storageBucket: "chat-app-62d15.appspot.com",
  messagingSenderId: "32055626385",
  appId: "1:32055626385:web:1dda28645eb00146130d30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Chat">
        {props => <Chat db={db} {...props} />}
      </Stack.Screen> 
    </Stack.Navigator>
  </NavigationContainer>
);
}

export default App; // Exporting the App component as the default export
