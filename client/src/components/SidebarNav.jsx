import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export const navigationMenu = [
  {
    title: "Home",
    icon: <HomeRoundedIcon />,
    path: "/",
  },
  {
    title: "Feed",
    icon: <HomeRoundedIcon />,
    path: "/home/feed",
  },
  {
    title: "Reels",
    icon: <ExploreRoundedIcon />,
    path: "/home/reels",
  },
  {
    title: "Upload",
    icon: <ControlPointRoundedIcon />,
    path: "/home/upload",
  },
  {
    title: "Notifications",
    icon: <NotificationsRoundedIcon />,
    path: "/home/notifications",
  },
  {
    title: "Message",
    icon: <MessageRoundedIcon />,
    path: "/message",
  },
  {
    title: "Lists",
    icon: <ListRoundedIcon />,
    path: "/",
  },
  {
    title: "Communities",
    icon: <GroupRoundedIcon />,
    path: "/",
  },
  {
    title: "Profile",
    icon: <AccountCircleRoundedIcon />,
    path: "/home/profile",
  },
];
