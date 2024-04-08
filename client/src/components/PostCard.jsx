import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Divider,
} from "@mui/material";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment, likePost } from "../state/Post/post.action";
import { useSelector } from "react-redux";

function PostCard({ post }) {

  const currentUserId = useSelector((state) => state.auth.user.id);
  
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likedBy.some((user)=> user.id === currentUserId));

  const dispatch = useDispatch();

  function handleCreateComment(content) {
    const reqData = {
      postId: post.id,
      data: {
        content,
      },
    };
    dispatch(createComment(reqData));
  }

  function handleLikePost() {
    dispatch(likePost(post.id)).then(()=>{
      setIsLiked(!isLiked);
    }).catch((error)=>{
      console.error("Error Liking Post",error);
    });
  }

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
        title={post.user.fname + " " + post.user.lname}
        subheader={
          "@" +
          post.user.fname.toLowerCase() +
          "_" +
          post.user.lname.toLowerCase()
        }
      />

      {post.image && (
        <CardMedia component="img" height="100" image={post.image} alt="" />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>

      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton onClick={handleLikePost}>
            {/* like dislike toggle */}
            {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>

          <IconButton
            onClick={() => {
              setShowComments(!showComments);
            }}
          >
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

      {showComments && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar sx={{}} />
            <input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment(e.target.value);
                  console.log(e.target.value);
                  e.target.value = "";
                }
              }}
              type="text"
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              placeholder="Write a comment..."
            />
          </div>
          <Divider />
          <div className="mx-3 my-5 space-y-2  text-xs">
            {post.comments.map((comment, index) => (
              <div className="flex items-center space-x-5" key={index}>
                <Avatar
                  sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}
                >
                  {comment.user.fname[0] + comment.user.lname[0]}
                </Avatar>

                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;
