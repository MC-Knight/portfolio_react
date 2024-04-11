import { X } from "lucide-react";
import { useModal } from "../../hooks/use-modal-store";
import { useForm, SubmitHandler } from "react-hook-form";

type Blog = {
  title: string;
  poster: FileList;
  content: string;
};

export const AddBlogModel = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createBlog";

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

  const onSubmit: SubmitHandler<Blog> = (data: Blog) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("poster", data.poster[0]);
    formData.append("content", data.content);
    console.log(formData.get("title"));
  };
  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <X className="close-modal" onClick={() => handleClose()} />
            <h1>add new Blog</h1>

            <div className="input-div-container">
              <p>Title</p>
              <div className="input-div">
                <input
                  type="text"
                  placeholder="Enter your blog title"
                  {...register("title", { required: true })}
                />
              </div>
              {errors.title && <span className="error">Title is required</span>}
            </div>

            <div className="input-div-container">
              <p>Blog poster</p>
              <div className="input-div">
                <input
                  type="file"
                  accept="image/*"
                  {...register("poster", { required: true })}
                />
              </div>
              {errors.poster && (
                <span className="error">Poster is required</span>
              )}
            </div>

            <div className="input-div-container">
              <p>Blog content</p>
              <div className="textarea-div">
                <textarea
                  rows={4}
                  placeholder="Enter your text here..."
                  {...register("content", { required: true })}
                ></textarea>
              </div>
              {errors.content && (
                <span className="error">Content is required</span>
              )}
            </div>

            <button type="submit">
              <p>save blog</p>
            </button>
          </form>
        </div>
      )}
    </>
  );
};
