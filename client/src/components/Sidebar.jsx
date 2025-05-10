import { useState } from "react";
import { navigationMenu } from "./SidebarNav.jsx";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Optional: Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="h-screen w-64 bg-white border-r shadow-sm flex flex-col justify-between py-8 px-4">
      <div className="space-y-8">
        <div>
          <span className="logo font-bold text-3xl text-black tracking-wide">ChatterBox</span>
        </div>
        <div className="space-y-2">
          {navigationMenu.map((item) => {
            const isActive = location.pathname.startsWith(item.path) && item.path !== "/";
            return (
              <div
                key={item.title}
                className={`flex space-x-3 cursor-pointer items-center px-4 py-2 rounded-lg transition-colors duration-200 group text-black hover:bg-gray-100 ${isActive ? "bg-gray-100 font-bold" : ""}`}
                onClick={
                  item.title === "Profile"
                    ? () => navigate("/home/profile/" + auth.user.id)
                    : () => navigate(item.path)
                }
              >
                <span className="text-black group-hover:text-orange-500">{item.icon}</span>
                <p className="text-lg font-medium group-hover:text-orange-500">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Divider />
        <div className="pl-2 flex items-center justify-between pt-5 hover:bg-gray-100 rounded-b-2xl transition-colors duration-200">
          <div className="flex items-center space-x-3 cursor-pointer">
            <Avatar src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=826&t=st=1711805221~exp=1711805821~hmac=8000422d501b4b12b39e9fcfc545165eb3c23276533c4ab4637b81ec9b88386c" />
            <div>
              <p className="font-bold text-xl text-black">
                {auth.user.fname + " " + auth.user.lname}
              </p>
              <p className="opacity-70 text-gray-500">
                @
                {auth.user.fname.toLowerCase() +
                  "_" +
                  auth.user.lname.toLowerCase()}
              </p>
            </div>
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon className="text-black" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
