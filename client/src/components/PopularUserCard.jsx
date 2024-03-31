import {
  CardHeader,
  Avatar,
  Button
} from "@mui/material";
import { red } from "@mui/material/colors";

function PopularUserCard() {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <Button size="small">
            Follow
          </Button>
        }
        title="Sandip Kundu"
        subheader="@sandipkundu"
      />
    </div>
  );
}

export default PopularUserCard;
