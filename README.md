# React Native Mobile Chat App

## Objective
The objective of this project was to build a chat app for mobile devices using React Native. The app provides users with a chat interface and options to share images and their location.

## Features and Requirements
### User Stories
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

### Key Features
- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat provides users with two additional communication features: sending images and location data.
- Data gets stored online and offline.

### Technical Requirements
- The app is written in React Native.
- The app is developed using Expo.
- The app is styled according to the given screen design.
- Chat conversations are stored in Google Firestore Database.
- The app authenticates users anonymously via Google Firebase authentication.
- Chat conversations are stored locally.
- The app lets users pick and send images from the phone’s image library.
- The app lets users take pictures with the device’s camera app, and send them.
- The app stores images in Firebase Cloud Storage.
- The app is able to read the user’s location data.
- Location data is sent via the chat in a map view.
- The chat interface and functionality are created using the Gifted Chat library.
- The app’s codebase contains comments.

## Development Environment Setup

### To set up the development environment for running the chat app, please follow these steps:

- Install Node.js: Make sure you have Node.js installed on your machine. You can download it from the official website: Node.js

- Install Expo CLI: Expo is used for developing and running React Native applications. Install Expo CLI globally by running the following command in your terminal:

 *npm install -g expo-cli*
 
- Install Android Studio: If you plan to run the app on an Android device or emulator, you will need to install Android Studio. You can download it from the official website: Android Studio

- Install Xcode: If you plan to run the app on an iOS device or simulator, you will need to install Xcode. Xcode is only available on macOS. You can download it from the Mac App Store or from the Apple Developer website.

## Database Configuration

### This chat app uses Firebase Firestore as the database for storing and retrieving chat messages. To configure the database, please follow these steps:

- Create a Firebase project: Go to the Firebase console and create a new project.

- Enable Firestore: In the Firebase console, navigate to your project and enable Firestore in the "Database" section. Set up the necessary security rules according to your requirements.

- Add Firebase configuration: In the chat app codebase, locate the Firebase configuration code block. Update the configuration with your Firebase project credentials. The configuration code can usually be found in the index.js or App.js file.

## Installation
### To install the necessary libraries and dependencies for the chat app, follow these steps:

- Clone the repository: Clone this repository to your local machine using Git or download it as a ZIP file and extract it.

- Install dependencies: Open a terminal, navigate to the project directory, and run the following command to install the required dependencies:

*npm install*

## Running the App
### To run the chat app on your device or simulator, follow these steps:

- Start the development server: In the project directory, run the following command to start the Expo development server:

*npm start*

This will open the Expo DevTools in your browser.

## Run on Android or iOS: 

To run the app on an Android or iOS device or simulator, follow the instructions provided by the Expo DevTools. You can use the Expo Client app on your physical device or launch an Android or iOS simulator from Android Studio or Xcode.

### Test the chat app: 

Once the app is running on your device or simulator, you can test the chat functionality by sending messages between different users.

### Troubleshooting

If you encounter any issues during the setup or running of the app, make sure to check the official documentation for the tools and libraries used in this project.
