import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../slice/fakerSlice"; // adjust path if needed

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

// ✅ Infer types for state & dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
