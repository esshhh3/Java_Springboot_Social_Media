import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";


function UserChatCard({chat}) {
  const { message, auth } = useSelector((state) => state);
  
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88,199,250)",
            }}
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={auth.user?.id===chat.users[1].id?chat.users[0].fname+" "+chat.users[0].lname:chat.users[1].fname+" "+chat.users[1].lname}
        subheader={auth.user?.id===chat.users[1].id?"@"+chat.users[0].fname.toLowerCase()+"_"+chat.users[0].lname.toLowerCase():"@"+chat.users[1].fname.toLowerCase()+"_"+chat.users[1].lname.toLowerCase()}
      ></CardHeader>
    </Card>
  );
}

UserChatCard.propTypes = {
  chat: PropTypes.object.isRequired,
};

export default UserChatCard;