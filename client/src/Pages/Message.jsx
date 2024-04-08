import {Avatar, Grid, IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchChat from "../components/SearchChat";
import UserChatCard from "../components/UserChatCard";
import ChatMessages from "../components/ChatMessages";

function Message() {
  function handleSelectImage(){
    console.log("image select...");
  }
  
  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">

        {/* Left Panel */}
        <Grid item xs={3} className="px-5">
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex items-center space-x-4 py-5">
                <ArrowBackIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div className="">
                  <SearchChat />
                </div>

                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
                  <UserChatCard />
                </div>
              </div>
            </div>
          </div>
        </Grid>

        {/* Right Panel */}
        <Grid className="h-full" item xs={9}>
          <div>
            {/* Profile Header */}
            <div className="flex justify-between items-center border-l p-5">
              <div className="flex items-center space-x-3">
                <Avatar src="https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <p>Aditya Kundu</p>
              </div>
              <div className="flex space-x-3">
                <IconButton>
                  <CallIcon />
                </IconButton>
                <IconButton>
                  <VideoCallIcon />
                </IconButton>
              </div>
            </div>

            {/* Messages */}
            <div className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
              <ChatMessages />
            </div>
          </div>

          {/* Message Input */}
          <div className="sticky bottom-0 border-l">
            <div className="flex py-5 items-center justify-center space-x-5">
              <input type="text" className="bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5" placeholder="Write your message..." />
              <div>
                <input type="file" accept="image/*" onChange={handleSelectImage} className="hidden" id="image-input" />
                <label htmlFor="image-input">
                  <AddPhotoAlternateIcon className="cursor-pointer" color="primary" />
                </label>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Message;