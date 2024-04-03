import {Avatar, Card, IconButton} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from './StoryCircle';
import PostCard from './PostCard';
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";

// dummy array to iterate over
const stories = [1, 2, 3, 4, 5];
const posts = [1, 2, 3, 4, 5];

function Feed() {

  function handleOpenCreatePostModel(){
    console.log("open post model");
  }
  
  return (
    <div className="px-20">
      {/* Stories section */}

      <section className="flex items-center p-5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar sx={{ width: "5rem", height: "5rem" }}>
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {stories.map((story) => (
          <StoryCircle key={story} />
        ))}
      </section>

      {/* Upload section */}

      <Card className="p-5 mt-5">
        <div className="flex justify-between items-center">
          <Avatar />
          <input
            // readOnly
            className="ml-5 h-10 outline-none w-full bg-slate-300 rounded-full px-5 bg-transparent border border-[#3b4054] cursor-text"
            type="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <ImageIcon />
            </IconButton>
            <span>media</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <VideocamIcon />
            </IconButton>
            <span>video</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <ArticleIcon />
            </IconButton>
            <span>article</span>
          </div>
        </div>
      </Card>

      {/* Posts section */}

      <div className='mt-5 space-y-5'>
        
        {posts.map((post) => <PostCard key={post} />)}

      </div>

    </div>
  );
}

export default Feed