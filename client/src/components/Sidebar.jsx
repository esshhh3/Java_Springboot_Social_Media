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
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className="card h-screen flex flex-col justify-between py-5">
      <div className="space-y-8 pl-5">
        <div>
          <span className="logo font-bold  text-xl">ChatterBox</span>
        </div>

        <div className="space-y-8">
          {navigationMenu.map((item) => (
            <div
              key={item.title}
              className="flex space-x-3 cursor-pointer items-center"
              onClick={
                item.title === "Profile"
                  ? () => navigate("/home/profile/" + auth.user.id)
                  : () => navigate(item.path)
              }
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Divider />
        <div className="pl-5 flex items-center justify-between pt-5">
          <div className="flex items-center space-x-3">
            <Avatar src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=826&t=st=1711805221~exp=1711805821~hmac=8000422d501b4b12b39e9fcfc545165eb3c23276533c4ab4637b81ec9b88386c" />
            <div>
              <p className="font-bold text-xl">
                {auth.user.fname + " " + auth.user.lname}
              </p>
              <p className="opacity-70">
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
            <MoreVertIcon />
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
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
}

export default Sidebar;
