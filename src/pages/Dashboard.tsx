import { useEffect, useState } from "react";
import { useModal } from "../hooks/use-modal-store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { isExpired, decodeToken } from "react-jwt";

//images
import post from "../assets/posts.png";
import comments from "../assets/comments.png";
import likes from "../assets/likes.png";

//components
import BlogCard, { BlogCardProps } from "../components/cards/BlogCard";
import DashboardCard from "../components/cards/DashboardCard";
import SideBar from "../components/cards/SideBar";

//slice
import { logoutUser } from "../slices/user";
import { setBlogs } from "../slices/blog";

//mutation
import { useGetBlogsMutation } from "../actions/blogs";

function Dashboard() {
  const { onOpen } = useModal();
  const { authToken } = useSelector((state: RootState) => state.user);
  const { blogs } = useSelector((state: RootState) => state.blog);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const decodedToken = decodeToken(authToken as string);
  const isMyTokenExpired = isExpired(authToken as string);

  const [blogItems, setBlogItems] = useState([]);
  const [getBlogsMutation, { isLoading }] = useGetBlogsMutation();

  const getBlogsHandler = async () => {
    try {
      const response = await getBlogsMutation({}).unwrap();
      dispatch(setBlogs(response.blogsWithComments));
    } catch (error) {
      const err = error as Record<string, Record<string, string>>;
      console.log(err.data.error);
    }
  };

  useEffect(() => {
    document.title = "Dashboard";

    if (!authToken || isMyTokenExpired) {
      dispatch(logoutUser());
      navigate("/");
    }

    if ((decodedToken as Record<string, string>).isAdmin === "false") {
      dispatch(logoutUser());
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getBlogsHandler();
  }, []);

  useEffect(() => {
    setBlogItems(blogs);
  }, [blogs]);

  return (
    <div className="container">
      <SideBar />
      <div className="right-side">
        <div className="right-side-welcome">
          <h1>Welcome back! 👋</h1>
          <button type="button">
            {/* <div className="loader-1"></div> */}
            <p>Logout</p>
          </button>
        </div>

        <div className="right-side-cards">
          <DashboardCard image={post} text="Total Posts" number={100} />
          <DashboardCard image={comments} text="Total Comments" number={100} />
          <DashboardCard image={likes} text="Total Likes" number={100} />
        </div>

        <div className="right-side-recent">
          <div className="recent-posts">
            <div>
              <h1>Recent Blogs</h1>
            </div>
            <button onClick={() => onOpen("createBlog")}>+ Add new blog</button>
          </div>

          <div className="recent-blogs">
            <div className="recent-blogs-right">
              {isLoading ? (
                <div className="loader-1"></div>
              ) : blogItems.length !== 0 ? (
                blogItems.map((blog: BlogCardProps) => (
                  <BlogCard key={blog._id} {...blog} />
                ))
              ) : (
                <p className="no-blog">No blogs at the moment</p>
              )}
            </div>

            <div className="recent-blogs-left">
              <h1>Most viewed posts</h1>
              {/* <div className="loader-1"></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
