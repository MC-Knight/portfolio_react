import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useModal } from "../../hooks/use-modal-store";
import { useBlogsStore } from "../../hooks/use-add-blog";
import { useForm, SubmitHandler } from "react-hook-form";

//mutation
import { useEditBlogMutation } from "../../actions/blogs";

type Blog = {
  title: string;
  content: string;
};

function EditBlogModel() {
  const { isOpen, onClose, type, data } = useModal();
  const { setAddedBlog } = useBlogsStore();
  const { blog } = data;

  const isModalOpen = isOpen && type === "editBlog";

  const handleClose = () => {
    onClose();
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Blog>();

  const [editBlogMutation, { isLoading }] = useEditBlogMutation();

  const onSubmit: SubmitHandler<Blog> = async (data: Blog) => {
    try {
      const response = await editBlogMutation({ data, id: blog?._id }).unwrap();
      toast.success(response.message);
      setTimeout(() => {
        setAddedBlog("edited");
      }, 1000);
      handleClose();
    } catch (error) {
      const err = error as Record<string, Record<string, string>>;
      toast.error(err.data.error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <X className="close-modal" onClick={() => handleClose()} />
            <h1>edit Blog</h1>

            <div className="input-div-container">
              <p>Title</p>
              <div className="input-div">
                <input
                  type="text"
                  placeholder="Enter your blog title"
                  defaultValue={blog?.title}
                  {...register("title", { required: true })}
                />
              </div>
              {errors.title && <span className="error">Title is required</span>}
            </div>

            <div className="input-div-container">
              <p>Blog content</p>
              <div className="textarea-div">
                <textarea
                  rows={4}
                  placeholder="Enter your text here..."
                  defaultValue={blog?.content}
                  {...register("content", { required: true })}
                ></textarea>
              </div>
              {errors.content && (
                <span className="error">Content is required</span>
              )}
            </div>

            <button type="submit">
              {isLoading ? <div className="loader"></div> : <p>save blog</p>}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditBlogModel;
