import { configureStore } from "@reduxjs/toolkit";

//slices
import userSlice from "../slices/user";
import blogSlice from "../slices/blog";

//apis
import { userApi } from "../actions/users";
import { blogApi } from "../actions/blogs";

export const store = configureStore({
  reducer: {
    user: userSlice,
    blog: blogSlice,
    [userApi.reducerPath]: userApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, blogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
