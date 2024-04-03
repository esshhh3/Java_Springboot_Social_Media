import { Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import HomeRight from "../components/HomeRight";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

function HomePage() {
  const location = useLocation();
  console.log("Current pathname:", location.pathname);

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
          lg={location.pathname.startsWith("/home/profile") ? 9 : 6}
          className="px-5 flex justify-center" // Center content takes full width on smaller screens
        >
          <Outlet />
        </Grid>

        {!location.pathname.startsWith("/home/profile") && (
          <Grid item xs={12} lg={3}>
            <div>
              <HomeRight />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default HomePage;
