import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';

const mockPosts = [
  {
    id: 1,
    caption: 'Had a great day at the park!',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    caption: 'Just finished a new project!',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
];

const mockFriends = [
  { id: 1, name: 'Alice Smith' },
  { id: 2, name: 'Bob Johnson' },
];

// Mock followers/following for demo
const mockFollowers = [
  { id: 1, name: 'Follower One' },
  { id: 2, name: 'Follower Two' },
];
const mockFollowing = [
  { id: 1, name: 'Following One' },
];

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const [likedPosts, setLikedPosts] = useState({});
  const [showComments, setShowComments] = useState({});

  if (!user) return <div className="text-black p-8">Loading...</div>;
  return (
    <div className="min-h-screen bg-white flex justify-center items-start">
      <div className="w-full max-w-2xl flex flex-col py-0 md:py-10 text-black bg-white md:rounded-2xl md:shadow-xl mt-0 md:mt-10 mb-0 md:mb-10 px-0 md:px-8 md:border md:border-gray-200">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center mb-8 md:mb-10 gap-4 md:gap-6">
          <div className="relative mb-4 md:mb-0">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-orange-400 shadow-lg" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-extrabold text-black tracking-wide mb-1 drop-shadow">{user.fname} {user.lname}</h2>
            <p className="text-gray-600 text-base md:text-lg mb-2">{user.email}</p>
            <div className="flex gap-4 md:gap-8 mt-2 text-sm md:text-lg justify-center md:justify-start">
              <span className="font-semibold">Posts: <span className="text-orange-500">{mockPosts.length}</span></span>
              <span className="font-semibold">Followers: <span className="text-orange-500">{mockFollowers.length}</span></span>
              <span className="font-semibold">Following: <span className="text-orange-500">{mockFollowing.length}</span></span>
            </div>
          </div>
        </div>
        {/* Friends Section */}
        <div className="mb-8 md:mb-10">
          <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 tracking-wide text-black">Friends</h3>
          <div className="flex gap-2 md:gap-4 flex-wrap">
            {mockFriends.map(friend => (
              <div key={friend.id} className="bg-gray-100 rounded-xl px-3 md:px-5 py-1 md:py-2 text-black shadow hover:scale-105 transition-transform cursor-pointer font-semibold border border-gray-200 text-sm md:text-base">
                {friend.name}
              </div>
            ))}
          </div>
        </div>
        {/* Posts Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4 tracking-wide text-black">Posts</h3>
          <ul className="space-y-2 md:space-y-8">
            {mockPosts.map(post => (
              <li
                key={post.id}
                className="bg-white w-full md:rounded-2xl md:shadow-md md:border md:border-gray-200 p-0 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl mb-4 md:mb-8"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt="post"
                    className="w-full max-h-72 object-cover"
                    style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                  />
                )}
                <div className="p-5 flex flex-col gap-2">
                  <span className="text-lg font-semibold text-black">{post.caption}</span>
                  <div className="flex gap-4 mt-2">
                    <IconButton
                      className="hover:bg-orange-100 transition"
                      onClick={() => setLikedPosts(l => ({ ...l, [post.id]: !l[post.id] }))}
                    >
                      <FavoriteIcon className={likedPosts[post.id] ? "text-orange-500" : "text-gray-400"} />
                    </IconButton>
                    <IconButton
                      className="hover:bg-blue-100 transition"
                      onClick={() => setShowComments(c => ({ ...c, [post.id]: !c[post.id] }))}
                    >
                      <ChatBubbleIcon className="text-blue-400" />
                    </IconButton>
                    <IconButton className="hover:bg-purple-100 transition">
                      <ShareIcon className="text-purple-400" />
                    </IconButton>
                  </div>
                  {showComments[post.id] && (
                    <div className="w-full px-2 pb-2 mt-2">
                      <div className="text-gray-500 text-sm">Comments coming soon...</div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
