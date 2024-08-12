import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "./memberSlice";

const store = configureStore({
    reducer: {
      member: memberSlice,
    },
  });
  
  // Define the RootState and AppDispatch types
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;
