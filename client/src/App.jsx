 // App.jsx

import Authentication from "./Pages/Authentication/Authentication";
import HomePage from "./Pages/HomePage";
import Message from "./Pages/Message";
import Feed from "./Pages/Feed";
import Reels from "./Pages/Reels";
import Upload from "./Pages/CreateReelsForm";
import Profile from "./Pages/Profile";
import Notifications from "./Pages/Notifications";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "./state/Auth/authActions";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { DarkTheme } from "./theme/DarkTheme";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserProfile(token));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("User:", user);


  return (
    <ThemeProvider theme={DarkTheme}>
      <Routes>
        {!user ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Authentication />} />
            <Route path="*" element={<Authentication />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="/home" element={<HomePage />}>
              <Route path="feed" element={<Feed />} />
              <Route path="reels" element={<Reels />} />
              <Route path="upload" element={<Upload />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>

            <Route path="/message" element={<Message />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
}
