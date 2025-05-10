import React, { useState } from 'react';
import SearchUser from "./SearchUser";
import PopularUserCard from "./PopularUserCard";
import { Card } from "@mui/material";
import { api } from '../config/api';

// Dummy array with different users
const suggestions = [
  { id: 1, fname: 'Rishi', lname: 'Kumar', username: 'rishi' },
  { id: 2, fname: 'Shruthika', lname: 'Rao', username: 'shruthika' },
  { id: 3, fname: 'Eswar', lname: 'Patel', username: 'eswar' },
  { id: 4, fname: 'Hemanth', lname: 'Singh', username: 'hemanth' },
  { id: 5, fname: 'Keerthi', lname: 'Menon', username: 'keerthi' },
];

function HomeRight() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const res = await api.get(`/users/search?query=${encodeURIComponent(query)}`);
      setResults(res.data);
    } catch (err) {
      setResults([]);
    }
  };

  return (
    <div className="pr-2 md:pr-5">
      <form onSubmit={handleSearch} className="mb-2 md:mb-4">
        <input
          type="text"
          className="w-full p-2 md:p-2 rounded bg-gray-100 text-black border border-gray-200"
          placeholder="Search User..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
      {results.length > 0 && (
        <div className="bg-white rounded-lg p-2 mt-2 border border-gray-200 shadow">
          {results.map(user => (
            <div key={user.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <span className="font-bold text-orange-500">{user.fname} {user.lname}</span>
              <span className="text-gray-500">@{user.email}</span>
            </div>
          ))}
        </div>
      )}

      {/* <SearchUser />  <-- REMOVED non-functional search bar */}

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-2 md:p-5 mt-2 md:mt-6">
        <div className="flex justify-between py-3 md:py-5 items-center mt-2 md:mt-4">
          <p className="font-semibold opacity-90 ml-1 md:ml-2 text-black text-sm md:text-base">Suggestions For You</p>
          <p className="text-xs font-semibold opacity-95 mr-1 md:mr-2 text-blue-500 cursor-pointer">View All</p>
        </div>
        <div className="flex flex-col gap-2 md:gap-0 md:block max-h-64 md:max-h-none overflow-x-auto md:overflow-visible">
          {suggestions.map((user) => (
            <PopularUserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeRight;
