import Authentication from "./Pages/Authentication/Authentication";
import HomePage from "./Pages/HomePage";
import Message from "./Pages/Message";
import { Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import Reels from "./components/Reels";
import CreateReelsForm from "./components/CreateReelsForm";
import Profile from "./Pages/Profile";

function App() {
  return (
    <Routes>
      <Route index element={<Authentication />} />
      <Route path="/message" element={<Message />} />
      <Route path="/home" element={<HomePage />}>
        <Route index element={<Feed />} />
        <Route path="/home/reels" element={<Reels />} />
        <Route path="/home/create-reels" element={<CreateReelsForm />} />
        <Route path="/home/profile/:id" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
