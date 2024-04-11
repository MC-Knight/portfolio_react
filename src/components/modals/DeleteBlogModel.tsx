import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useModal } from "../../hooks/use-modal-store";
import { useBlogsStore } from "../../hooks/use-add-blog";

//mutation
import { useDeleteBlogMutation } from "../../actions/blogs";

function DeleteBlogModel() {
  const { isOpen, onClose, type, data } = useModal();
  const { setAddedBlog } = useBlogsStore();
  const { blog } = data;

  const isModalOpen = isOpen && type === "deleteBlog";

  const [deleteBlogMutation, { isLoading }] = useDeleteBlogMutation();

  const deleteBlogHandler = async () => {
    try {
      const response = await deleteBlogMutation(blog?._id).unwrap();
      toast.success(response.message);
      setTimeout(() => {
        setAddedBlog("deleted");
      }, 1000);
      handleClose();
    } catch (error) {
      const err = error as Record<string, Record<string, string>>;
      toast.error(err.data.error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <div className="delete-modal">
            <X className="close-modal" onClick={() => handleClose()} />

            <div className="delete-modal-content">
              <p>Are you sure?</p>
              <p>you want to delete this blog,</p>
              <p>{blog?.title}</p>
            </div>

            <div className="delete-modal-buttons">
              <button onClick={() => handleClose()}>No</button>
              <button onClick={() => deleteBlogHandler()}>
                {isLoading ? <div className="loader"></div> : <p>Continue</p>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteBlogModel;
