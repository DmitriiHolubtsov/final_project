import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import { productApiSlice } from "./productApiSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: cartSlice,
  [productApiSlice.reducerPath]: productApiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productApiSlice.middleware),
});

export const persistor = persistStore(store);
