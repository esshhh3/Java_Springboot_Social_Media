import SearchUser from "./SearchUser";
import PopularUserCard from "./PopularUserCard";
import { Card } from "@mui/material";

// dummy array to simulate suggestions
const suggestions = [1, 2, 3, 4, 5];

function HomeRight() {
  return (
    <div className="pr-5">
      <SearchUser />

      <Card className="p-5">
        <div className="flex justify-between py-5 items-center mt-4">
          <p className="font-semibold opacity-70 ml-5">Suggestions For You</p>
          <p className="text-xs font-semibold opacity-95 mr-5">View All</p>
        </div>
        <div>
          {suggestions.map((suggestion) => (
            <PopularUserCard key={suggestion} />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default HomeRight;
