import { Avatar } from "@mui/material";

function StoryCircle({ user }) {
  return (
    <div className="flex flex-col items-center mx-2">
      <div className="bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-400 p-1 rounded-full">
        <Avatar
          src={user.avatar}
          sx={{ width: 56, height: 56, border: "3px solid white" }}
        />
      </div>
      <span className="text-xs text-black mt-1 w-16 truncate text-center">{user.username}</span>
    </div>
  );
}

export default StoryCircle;