import {
  CardHeader,
  Avatar,
  Button
} from "@mui/material";
import { red } from "@mui/material/colors";
import PropTypes from "prop-types";

function PopularUserCard({ user }) {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user?.fname ? user.fname[0] : 'U'}
          </Avatar>
        }
        action={
          <Button size="small">
            <span className="text-blue-500 font-semibold">Follow</span>
          </Button>
        }
        title={<span className="font-bold text-black">{user ? `${user.fname} ${user.lname}` : "Unknown User"}</span>}
        subheader={<span className="text-black">{user ? `@${user.username || user.email || "unknown"}` : "@unknown"}</span>}
      />
    </div>
  );
}

PopularUserCard.propTypes = {
  user: PropTypes.shape({
    fname: PropTypes.string,
    lname: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default PopularUserCard;
