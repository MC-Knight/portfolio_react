import { LayoutDashboard } from "lucide-react";

function SideBar() {
  return (
    <div className="left-side">
      <h1>
        <span>Joseph</span> BT
      </h1>

      <div className="nav-toggle">
        <LayoutDashboard />
        Dashboard
      </div>
    </div>
  );
}

export default SideBar;
