import { configureStore } from "@reduxjs/toolkit";
import { itemReducer } from "./features/items/itemReducer";
import logger from "redux-logger";

const middlewares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
);

const store = configureStore({
  reducer: itemReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["items/fetchItems/fulfilled"],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          "meta.arg",
          "payload.createdAt",
          "payload.expiryDate",
        ],
        // Ignore these paths in the state
        ignoredPaths: ["items.expiryDate", "items.createdAt"],
      },
    }).concat(middlewares),
});

export default store;
