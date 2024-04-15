import Authentication from "./Pages/Authentication/Authentication";
import HomePage from "./Pages/HomePage";
import Message from "./Pages/Message";
import { Routes, Route } from "react-router-dom";
// import Reels from "./components/Reels";
// import CreateReelsForm from "./components/CreateReelsForm";
// import Profile from "./Pages/Profile";
// import Login from "./Pages/Authentication/Login";
// import Register from "./Pages/Authentication/Register";
import {useSelector, useDispatch} from "react-redux";
import { getUserProfile } from "./state/Auth/authActions";
import { useEffect } from "react";
import Feed from "./components/Feed";
import { getAllPosts } from "./state/Post/post.action";
import { ThemeProvider } from "@mui/material";
import { DarkTheme } from "./theme/DarkTheme";

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUserProfile(localStorage.getItem("token")));
    dispatch(getAllPosts());
  },[localStorage.getItem("token")]);
  
  const user = useSelector((state)=>state.auth.user);
  console.log(user)
  
  return (
    <ThemeProvider theme={DarkTheme}>
      <Routes>
        <Route
          index
          path="/*"
          element={user ? <HomePage /> : <Authentication />}
        />
        <Route path="/message" element={<Message />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
