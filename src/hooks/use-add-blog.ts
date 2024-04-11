import { create } from "zustand";

interface BlogsStoreState {
  addedBlog: string[];
  setAddedBlog: (blog: string) => void;
}

export const useBlogsStore = create<BlogsStoreState>(
  (set) => ({
    addedBlog: [],
    setAddedBlog: (blog: string) =>
      set((state: BlogsStoreState) => ({
        addedBlog: [...state.addedBlog, blog],
      })),
  })
);
