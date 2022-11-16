import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reducer, setContactStore } from "./reducer";

const appReducer = combineReducers({
  contacts: reducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['contacts']
};

const pReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);

setContactStore(store)

