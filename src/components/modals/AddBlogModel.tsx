import { X } from "lucide-react";
import { useModal } from "../../hooks/use-modal-store";

export const AddBlogModel = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createBlog";
  console.log(isModalOpen);

  const handleClose = () => {
    onClose();
  };
  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <form name="add-blog-form" encType="multipart/form-data">
            <X className="close-modal" onClick={() => handleClose()} />
            <h1>add new Blog</h1>

            <div className="input-div-container">
              <p>Title</p>
              <div className="input-div">
                <input
                  type="text"
                  name="title"
                  placeholder="Enter your blog title"
                  required
                />
              </div>
            </div>

            <div className="input-div-container">
              <p>Blog poster</p>
              <div className="input-div">
                <input type="file" name="poster" accept="image/*" required />
              </div>
            </div>

            <div className="input-div-container">
              <p>Blog content</p>
              <div className="textarea-div">
                <textarea
                  rows={4}
                  name="content"
                  placeholder="Enter your text here..."
                  required
                ></textarea>
              </div>
            </div>

            <button type="button" id="save-blog-button">
              save blog
            </button>
          </form>
        </div>
      )}
    </>
  );
};
