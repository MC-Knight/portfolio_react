import { useEffect, useState } from "react";
import { AddBlogModel } from "../components/modals/AddBlogModel";
import DeleteBlogModel from "../components/modals/DeleteBlogModel";
import EditBlogModel from "../components/modals/EditBlogModel";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddBlogModel />
      <DeleteBlogModel />
      <EditBlogModel />
    </>
  );
};
