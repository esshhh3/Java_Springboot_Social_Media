import { Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";

function PostCard() {
  return (
    <Card className="">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Soumodip Deb"
        subheader="@soumodipdeb"
      />

      <CardMedia
        component="img"
        height="194"
        image="https://images.unsplash.com/photo-1549480017-d76466a4b7e8?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="tiger"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>

      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton>
            {/* like dislike toggle */}
            {true ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>

          <IconButton>
            <ChatBubbleIcon />
          </IconButton>

          <IconButton>
            <ShareIcon />
          </IconButton>
        </div>

        <IconButton>
          {true ? <BookmarksIcon /> : <BookmarksOutlinedIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PostCard;
