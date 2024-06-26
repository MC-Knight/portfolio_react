import { backend_url } from "../utils/services";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backend_url + "/blogs",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.authToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
    getBlogs: builder.mutation({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    editBlog: builder.mutation({
      query: ({data, id}) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetBlogsMutation,
  useDeleteBlogMutation,
  useEditBlogMutation,
} = blogApi;
