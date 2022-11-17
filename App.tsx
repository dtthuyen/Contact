import * as React from "react";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
 import LoginScreen from "./src/screens/LoginScreen";
import { AddContactScreen } from "./src/screens/AddContactScreen";
import { ProfileContactScreen } from "./src/screens/ProfileContactScreen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store/store";
import SplashScreen from "react-native-splash-screen";
import { StatusBar } from "react-native";
import DrawerNavigator from "./src/navigator/DrawerNavigator";

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <StatusBar
          translucent={true}
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
        />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileContact" component={ProfileContactScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddContact" component={AddContactScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );
};

export default App;
