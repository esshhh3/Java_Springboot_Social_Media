import { Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Reels from "../components/Reels";
import CreateReelsForm from "../components/CreateReelsForm";
import HomeRight from "../components/HomeRight";
import Profile from "../components/Profile";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function HomePage() {
  const location = useLocation();

  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid item xs={12} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          lg={6}
          className="px-5 flex justify-center" // Center content takes full width on smaller screens
        >
          <Routes>
            <Route path="/feed" element={<Feed />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/create-reels" element={<CreateReelsForm />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Grid>

        <Grid item xs={12} lg={3} className="relative">
          <div className="sticky top-0 w-full">
            <HomeRight />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
