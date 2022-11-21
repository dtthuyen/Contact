import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reducer, setContactStore } from "./contacts";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares: any[] = [];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const appReducer = combineReducers({
  contacts: reducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['contacts']
};

const pReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(pReducer, enhancer);
export const persistor = persistStore(store);

setContactStore(store)

