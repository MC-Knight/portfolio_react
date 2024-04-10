import { backend_url } from "../utils/services";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backend_url + "/users",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.authToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: Record<string, string>) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: (data: Record<string, string>) => ({
        url: "/logout",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = userApi;
