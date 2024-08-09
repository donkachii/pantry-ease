"use client";

// import { useRef } from "react";
import { Provider } from "react-redux";
import store from "../libs/store";

export default function StoreProvider({ children }) {
  //   const storeRef = useRef();
  //   if (!storeRef.current) {
  //     storeRef.current = makeStore();
  //   }

  return <Provider store={store}>{children}</Provider>;
}
