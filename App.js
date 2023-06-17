// Importing the 'Start' and 'Chat' components from their respective files
import Start from './components/start';
import Chat from './components/chat';

// Importing necessary components from the React Navigation library
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Creating a native stack navigator using 'createNativeStackNavigator'
const Stack = createNativeStackNavigator();

// App component
const App = () => {
  return (
    // Wrapping the app with 'NavigationContainer' to enable navigation
    <NavigationContainer>
      {/* Setting up the stack navigator */}
      <Stack.Navigator
        initialRouteName="Start" // Setting the initial route name to 'Start'
      >
        {/* Defining the 'Start' screen */}
        <Stack.Screen
          name="Start" // Setting the screen name to 'Start'
          component={Start} // Rendering the 'Start' component for this screen
        />

        {/* Defining the 'Chat' screen */}
        <Stack.Screen
          name="Chat" // Setting the screen name to 'Chat'
          component={Chat} // Rendering the 'Chat' component for this screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; // Exporting the App component as the default export
