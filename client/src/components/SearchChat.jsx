import { Avatar, Card, CardHeader } from "@mui/material";

function SearchChat() {
  function handleSearchUser() {
    console.log("Search User");
  }

  function handleClick(id){
    console.log("clicked",id);
  }

  return (
    <div>
      <div className="py-5 relative">
        <input
          type="text"
          className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
          placeholder="Search User..."
          onChange={handleSearchUser}
        />
      </div>
      {false && (
        <Card>
          <CardHeader
            onClick={() => {
              handleClick();
            }}
            avatar={
              <Avatar src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww" />
            }
            title="Aditya Kundu"
            subheader="adityakundu"
          />
        </Card>
      )}
    </div>
  );
}

export default SearchChat;
