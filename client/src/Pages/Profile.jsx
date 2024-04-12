import { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Button, Card } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PostCard from "../components/PostCard";
import UserReelsCard from "../components/UserReelsCard";
import {useSelector} from "react-redux";
import ProfileModal from "../components/ProfileModal";

const tabs = [
  { value: "post", name: "Posts" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];

const reels = [1, 2, 3, 4, 5];
const saved = [1, 2, 3, 4, 5];

function Profile() {
  const posts = useSelector((state) => state.post.posts);
  const { id } = useParams();
  console.log(id);

  const [open, setOpen] = useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState("post");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const user = useSelector((state) => state.auth.user);

  return (
    <Card className="my-10 w-[100%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full object-cover rounded-t-md"
            src="https://plus.unsplash.com/premium_photo-1669359806362-6bd0218a4fd2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="beach"
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src="https://lh3.googleusercontent.com/a/ACg8ocKF23OVLBBGwqEictwf0SKXAqnfS0rb7RKKSImkXILWoT0=s288-c-no"
          />

          {true ? (
            <Button variant="outlined" sx={{ borderRadius: "20px" }} onClick={handleOpenProfileModal}>
              Edit Profile
            </Button>
          ) : (
            <Button variant="outlined" sx={{ borderRadius: "20px" }}>
              Follow
            </Button>
          )}
        </div>

        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl">
              {user.fname + " " + user.lname}
            </h1>
            <p>@{user.fname.toLowerCase() + "_" + user.lname.toLowerCase()}</p>
          </div>

          <div className="flex gap-5 items-center  py-3">
            <span>40 posts</span>
            <span>36 followers</span>
            <span>15 followings</span>
          </div>

          <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>

        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((tab) => (
                <Tab
                  value={tab.value}
                  label={tab.name}
                  key={tab.name}
                  wrapped
                />
              ))}
            </Tabs>
          </Box>

          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {posts.map((post, index) => (
                  <div
                    className="border border-slate-100 rounded-md"
                    key={index}
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="flex flex-wrap justify-center my-10 gap-2">
                {reels.map((reel, index) => (
                  <UserReelsCard key={index} />
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {saved.map((save, index) => (
                  <div
                    className="border border-slate-100 rounded-md"
                    key={index}
                  >
                    <PostCard />
                  </div>
                ))}
              </div>
            ) : (
              <div>repost</div>
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </Card>
  );
}

export default Profile;
