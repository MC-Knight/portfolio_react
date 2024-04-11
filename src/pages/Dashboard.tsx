import { useEffect, useState } from "react";
import { useModal } from "../hooks/use-modal-store";
import { useBlogsStore } from "../hooks/use-add-blog";
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
import { useLogoutUserMutation } from "../actions/users";
import toast from "react-hot-toast";

function Dashboard() {
  const { onOpen } = useModal();
  const { addedBlog } = useBlogsStore();
  const { authToken, refreshToken } = useSelector(
    (state: RootState) => state.user
  );
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

  const [logoutUserMutation, { isLoading: isLoadingLogout }] =
    useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      const response = await logoutUserMutation({
        token: refreshToken,
      }).unwrap();
      toast.success(response.message);
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      toast.success("logged out successfully");
      dispatch(logoutUser());
      navigate("/");
    }
  };

  const [likesNumber, setLikesNumber] = useState(0);
  const [commentsNumber, setCommentsNumber] = useState(0);

  useEffect(() => {
    document.title = "Dashboard";

    if (
      !authToken ||
      isMyTokenExpired ||
      (decodedToken as Record<string, boolean>).isAdmin === false
    ) {
      dispatch(logoutUser());
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getBlogsHandler();
  }, [addedBlog]);

  useEffect(() => {
    setBlogItems(blogs);
  }, [blogs]);

  useEffect(() => {
    let likes = 0;
    let comments = 0;

    blogItems.forEach((blog: BlogCardProps) => {
      likes += blog.likes;
      if (blog.comments) {
        comments += blog.comments.length;
      }
    });

    setLikesNumber(likes);
    setCommentsNumber(comments);
  }, [blogItems]);

  return (
    <div className="container">
      <SideBar />
      <div className="right-side">
        <div className="right-side-welcome">
          <h1>Welcome back! 👋</h1>
          <button onClick={() => logoutHandler()}>
            {isLoadingLogout ? <div className="loader-1"></div> : <p>Logout</p>}
          </button>
        </div>

        <div className="right-side-cards">
          <DashboardCard
            image={post}
            text="Total Posts"
            number={blogItems.length}
          />
          <DashboardCard
            image={comments}
            text="Total Comments"
            number={commentsNumber}
          />
          <DashboardCard
            image={likes}
            text="Total Likes"
            number={likesNumber}
          />
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

              {isLoading ? (
                <div className="loader-1"></div>
              ) : (
                blogItems.map((blog: BlogCardProps) => (
                  <div key={blog._id} className="recent-blog-left-card">
                    <p>{blog.title}</p>
                    <p>{blog.views}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
