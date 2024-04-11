import { useEffect } from "react";
import { useModal } from "../hooks/use-modal-store";

//images
import post from "../assets/posts.png";
import comments from "../assets/comments.png";
import likes from "../assets/likes.png";

//components
import BlogCard from "../components/cards/BlogCard";
import DashboardCard from "../components/cards/DashboardCard";
import SideBar from "../components/cards/SideBar";

function Dashboard() {
  const { onOpen } = useModal();

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

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
              <BlogCard />
            </div>

            <div className="recent-blogs-left">
              <h1>Most viewed posts</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
