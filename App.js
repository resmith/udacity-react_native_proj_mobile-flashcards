import React, { useEffect, useState, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";

export const DECK_STORAGE_KEY = "MobileFlashcard:deck";
import store from "./src/redux/store";
import { loadDecks, removeDecks } from "./src/redux/decks/deckActions";
import {
  loadNotifications,
  removeAllNotifications,
} from "./src/redux/notifications/notificationActions";

import DeckList from "./src/features/decks/DeckList";
import DeckAdd from "./src/features/decks/DeckAdd";
import DeckView from "./src/features/decks/DeckView";
import CardAdd from "./src/features/cards/CardAdd";
import Quiz from "./src/features/quiz/Quiz";
import NotificationManager from "./src/features/notifications/NotificationManager";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// store.dispatch(removeDecks); // Used to initialize storage
// store.dispatch(removeAllNotifications); // Used to initialize storage
store.dispatch(loadDecks);
store.dispatch(loadNotifications);

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DeckList" component={DeckList} />
      <Tab.Screen name="DeckAdd" component={DeckAdd} />
      <Tab.Screen name="Notifications" component={NotificationManager} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.app}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="DeckList"
              component={DeckList}
              options={{ title: "Decks" }}
            />
            <Stack.Screen
              name="DeckAdd"
              component={DeckAdd}
              options={{ title: "Add Deck" }}
            />
            <Stack.Screen
              name="DeckView"
              component={DeckView}
              options={{ title: "View Deck" }}
            />
            <Stack.Screen
              name="CardAdd"
              component={CardAdd}
              options={{ title: "Add  Card" }}
            />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={{ title: "Quiz" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  app: {
    marginLeft: 20,
    marginRight: 20,
  },
});
