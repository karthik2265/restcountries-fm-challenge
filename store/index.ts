import { configureStore } from "@reduxjs/toolkit";
import { countriesReducer } from "./countries-slice";
import { uiReducer } from "./ui-slice";

const store = configureStore({
  reducer: { countries: countriesReducer, ui: uiReducer },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
