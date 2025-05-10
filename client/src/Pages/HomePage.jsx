import { Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import HomeRight from "../components/HomeRight";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const trendingPosts = [
  { id: 1, author: 'Alice', caption: 'Check out this amazing sunset!' },
  { id: 2, author: 'Bob', caption: 'Just finished a marathon!' },
];

const suggestions = [
  { id: 1, name: 'React Developers' },
  { id: 2, name: 'Nature Lovers' },
];

function HomePage() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Only show the welcome/trending section on /home (not on /home/feed, /home/profile, etc.)
  const isHomeRoot = location.pathname === "/home";

  return (
    <div className="min-h-screen bg-white">
      <Grid container spacing={0} className="min-h-screen bg-white">
        <Grid item xs={12} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          lg={location.pathname.startsWith("/home/profile") ? 9 : 6}
          className="px-5 flex justify-center items-start bg-white"
        >
          <div className="w-full flex flex-col gap-8 mt-10">
            {isHomeRoot && (
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 mb-6">
                <h1 className="text-3xl font-bold text-black mb-2">Welcome, {user.fname}!</h1>
                <p className="text-lg text-gray-600 mb-4">Here's what's trending today:</p>
                <ul className="space-y-3 mb-4">
                  {trendingPosts.map(post => (
                    <li key={post.id} className="bg-gray-100 rounded-lg px-4 py-3 text-black shadow flex flex-col">
                      <span className="font-semibold text-orange-500">{post.author}</span>
                      <span>{post.caption}</span>
                    </li>
                  ))}
                </ul>
                <h2 className="text-xl font-semibold mb-2 text-black">Suggestions for you</h2>
                <ul className="flex gap-4">
                  {suggestions.map(s => (
                    <li key={s.id} className="bg-gray-100 rounded-lg px-4 py-2 text-black shadow border border-gray-200">
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Outlet />
          </div>
        </Grid>
        {!location.pathname.startsWith("/home/profile") && (
          <Grid item xs={12} lg={3}>
            <HomeRight />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default HomePage;
