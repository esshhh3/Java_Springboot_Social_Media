import React, { useState } from "react";
import { Card, CardHeader, Avatar, CardMedia, CardContent, CardActions, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import StoryCircle from "../components/StoryCircle";

// Dummy posts array
const dummyPosts = [
  {
    id: 1,
    user: { fname: "Alice", lname: "Johnson" },
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    caption: "Enjoying the beautiful sunset!",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    user: { fname: "Bob", lname: "Smith" },
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    caption: "Hiking adventures with friends.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    user: { fname: "Diana", lname: "Prince" },
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    caption: "Coffee time! ☕",
    createdAt: new Date().toISOString(),
  },
];

const mockStories = [
  { id: 1, username: "keerthi_re...", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 2, username: "_mohith_v...", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, username: "yash___1865", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: 4, username: "lalith_gami...", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
  { id: 5, username: "siva_kiran_...", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
  { id: 6, username: "_phobhicc._", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
  { id: 7, username: "likhita.singh", avatar: "https://randomuser.me/api/portraits/women/7.jpg" },
  { id: 8, username: "chantiredd...", avatar: "https://randomuser.me/api/portraits/men/8.jpg" },
];

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  return (
    <li className="bg-white w-full md:rounded-2xl md:shadow-md md:border md:border-gray-200 p-0 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl mb-4 md:mb-8">
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full max-h-72 object-cover"
          style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
        />
      )}
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-2">
          <Avatar>{post.user.fname[0]}</Avatar>
          <span className="font-bold text-black">{post.user.fname} {post.user.lname}</span>
          <span className="text-xs text-gray-500 ml-2">{new Date(post.createdAt).toLocaleString()}</span>
        </div>
        <span className="text-lg text-black">{post.caption}</span>
        <div className="flex gap-4 mt-2">
          <IconButton
            className="hover:bg-orange-100 transition"
            onClick={() => setLiked(l => !l)}
          >
            <FavoriteIcon className={liked ? "text-orange-500" : "text-gray-400"} />
          </IconButton>
          <IconButton
            className="hover:bg-blue-100 transition"
            onClick={() => setShowComments(c => !c)}
          >
            <ChatBubbleIcon className="text-blue-400" />
          </IconButton>
          <IconButton className="hover:bg-purple-100 transition">
            <ShareIcon className="text-purple-400" />
          </IconButton>
        </div>
        {showComments && (
          <div className="w-full px-2 pb-2 mt-2">
            <div className="text-gray-500 text-sm">Comments coming soon...</div>
          </div>
        )}
      </div>
    </li>
  );
}

const Feed = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-white flex justify-center items-start">
      <div className="w-full max-w-2xl flex flex-col py-0 md:py-8 text-black bg-white md:rounded-2xl md:shadow-xl mt-0 md:mt-10 mb-0 md:mb-10 px-0 md:px-6 md:border md:border-gray-200">
        {/* Stories Row */}
        <div className="flex items-center overflow-x-auto pb-2 md:pb-4 mb-2 md:mb-6 border-b border-gray-200 scrollbar-hide gap-2 md:gap-4 w-full">
          {mockStories.map(story => (
            <StoryCircle key={story.id} user={story} />
          ))}
        </div>
        {/* Feed */}
        <ul className="space-y-2 md:space-y-8">
          {dummyPosts.map(post => (
            <li className="bg-white w-full md:rounded-2xl md:shadow-md md:border md:border-gray-200 p-0 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl mb-4 md:mb-8">
              <PostCard key={post.id} post={post} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Feed;
