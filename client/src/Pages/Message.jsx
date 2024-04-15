import { Avatar, Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchChat from "../components/SearchChat";
import UserChatCard from "../components/UserChatCard";
import ChatMessages from "../components/ChatMessages";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../state/Message/message.action";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import WebSocketService from "../utils/sockets";

function Message() {
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const dispatch = useDispatch();
  const { message, auth } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllChats());
    WebSocketService.initializeWebSocketConnection();
  }, [dispatch]);



  async function handleSelectImage(e) {
    console.log("image select...");
    setLoading(true);
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
  }

  function handleCreateMessage(value) {
    const message = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
    };
    setMessages([...messages, message]);
    dispatch(createMessage({message,sendMessageToServer}));
    setSelectedImage(null);
  }

  // to handle the render after new text message
  useEffect(() => {
    if (message.message) {
      setMessages([...messages, message.message]);
    }
  }, [message.message]);

  useEffect(() => {
    if (auth.user && currentChat) {
      const subscription = WebSocketService.subscribeToTopic(
        `/user/${currentChat.id}/private`,
        (response) => {
          const receivedMessage = JSON.parse(response.body);
          console.log("Message recieved from websocket", receivedMessage);
          setMessages([...messages, receivedMessage]);
        }
      );

      // cleanup function
      // return () => {
      //   subscription.unsubscribe();
      // };
    }
  }, [currentChat, auth.user, messages]);

  function sendMessageToServer(newMessage) {
    WebSocketService.sendMessage(
      `/app/chat/${currentChat?.id.toString()}`,
      newMessage
    );
  }

  useEffect(() => {
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
                  {message.chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => {
                        setCurrentChat(chat);
                        setMessages(chat.messages);
                      }}
                    >
                      <UserChatCard chat={chat} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>

        {/* Right Panel */}
        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              {/* Profile Header */}
              <div className="flex justify-between items-center border-l p-5">
                <div className="flex items-center space-x-3">
                  <Avatar src="https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                  <p>
                    {auth.user?.id === currentChat.users[1]?.id
                      ? currentChat.users[0].fname +
                        " " +
                        currentChat.users[0].lname
                      : currentChat.users[1].fname +
                        " " +
                        currentChat.users[1].lname}
                  </p>
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
              <div ref={chatContainerRef} className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
                {messages.map((message, index) => (
                  <ChatMessages key={index} text={message} />
                ))}
              </div>

              {/* Message Input */}
              <div className="sticky bottom-0 border-l">
                {selectedImage && (
                  <img
                    className="w-[5rem] h-[5rem] object-cover px-2"
                    src={selectedImage}
                    alt=""
                  />
                )}
                <div className="flex py-5 items-center justify-center space-x-5">
                  <input
                    type="text"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMessage(e.target.value);
                        e.target.value = "";
                        setSelectedImage(null);
                      }
                    }}
                    className="bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5"
                    placeholder="Write your message..."
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <AddPhotoAlternateIcon
                        className="cursor-pointer"
                        color="primary"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center">
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className="text-xl font-semibold">No Chats Selected</p>
            </div>
          )}
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Message;
