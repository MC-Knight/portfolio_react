import { create } from "zustand";

type Blog = {
  _id?: string;
  title: string;
  content: string;
};

type Comment = {
  _id: string;
  content: string;
};

export type ModalType =
  | "createBlog"
  | "editBlog"
  | "deleteBlog"
  | "viewComment"
  | "deleteComment";

interface ModalData {
  blog?: Blog;
  comment?: Comment[];
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
