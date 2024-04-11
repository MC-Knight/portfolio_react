import { Eye, FilePenLine, Heart, MessageCircle, Trash } from "lucide-react";

interface Comment {
  _id: string;
  content: string;
  date: string;
  blog: string;
}

export interface BlogCardProps {
  _id: string;
  title: string;
  content: string;
  poster: string;
  date: string;
  views: number;
  likes: number;
  comments?: Comment[];
}

function BlogCard(blog: BlogCardProps): JSX.Element {
  return (
    <div className="recent-blog-right-card">
      <img src={blog.poster} alt={blog.title} />
      <div className="recent-blog-right-card-details">
        <p className="recent-blog-text">{blog.title}</p>

        <div className="recent-blog-buttons">
          <div className="recent-blog-likes">
            <Heart /> {blog.likes}
          </div>
          <div className="recent-blog-likes">
            <Eye /> {blog.views}
          </div>
          <button>
            <MessageCircle /> {blog.comments?.length}
          </button>
          <button id="open-edit-blog-model-6618107cf6a04045215ef389">
            <FilePenLine />
            Edit
          </button>
          <button id="open-delete-blog-model-6618107cf6a04045215ef389">
            <Trash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
