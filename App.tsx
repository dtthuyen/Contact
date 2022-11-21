import * as React from "react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store/index";
import SplashScreen from "react-native-splash-screen";
import { StatusBar } from "react-native";
import Routes from "./src/Routes";

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          translucent={true}
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
        />
        <Routes/>
      </PersistGate>
    </Provider>

  );
};

export default App;
