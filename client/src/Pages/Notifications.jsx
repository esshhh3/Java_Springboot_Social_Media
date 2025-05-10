import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import MessageIcon from "@mui/icons-material/Message";

const dummyNotifications = [
  {
    id: 1,
    type: "like",
    user: "Rishi",
    message: "liked your post.",
    time: "2m ago",
    icon: <FavoriteIcon className="text-pink-400" />,
  },
  {
    id: 2,
    type: "follow",
    user: "Shruthika",
    message: "started following you.",
    time: "10m ago",
    icon: <PersonAddIcon className="text-blue-400" />,
  },
  {
    id: 3,
    type: "comment",
    user: "Eswar",
    message: "commented: Nice shot!",
    time: "30m ago",
    icon: <ChatBubbleIcon className="text-green-400" />,
  },
  {
    id: 4,
    type: "share",
    user: "Hemanth",
    message: "shared your reel.",
    time: "1h ago",
    icon: <ShareIcon className="text-yellow-400" />,
  },
  {
    id: 5,
    type: "message",
    user: "Keerthi",
    message: "sent you a message.",
    time: "2h ago",
    icon: <MessageIcon className="text-purple-400" />,
  },
];

function Notifications() {
  return (
    <div className="min-h-screen bg-white flex justify-center items-start px-2 md:px-0">
      <div className="w-full max-w-2xl flex flex-col py-6 md:py-8 text-black bg-white rounded-2xl shadow-xl mt-6 md:mt-10 mb-6 md:mb-10 px-2 md:px-6 border border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-black">Notifications</h2>
        <ul className="space-y-3 md:space-y-4">
          {dummyNotifications.map((notif) => (
            <li
              key={notif.id}
              className="flex items-center gap-3 md:gap-4 bg-white rounded-xl px-2 md:px-4 py-3 md:py-4 shadow border border-gray-200 w-full"
            >
              <span className="text-lg md:text-xl">{notif.icon}</span>
              <div>
                <span className="font-semibold text-black text-sm md:text-base">{notif.user} </span>
                <span className="text-black text-sm md:text-base">{notif.message}</span>
                <div className="text-xs text-gray-500">{notif.time}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notifications; 