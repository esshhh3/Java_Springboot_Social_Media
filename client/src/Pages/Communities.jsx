import React from 'react';

const mockCommunities = [
  { id: 1, name: 'React Developers', members: 1200 },
  { id: 2, name: 'Nature Lovers', members: 800 },
  { id: 3, name: 'Book Club', members: 300 },
];

function Communities() {
  return (
    <div className="min-h-screen bg-white flex justify-center items-start">
      <div className="w-full max-w-2xl flex flex-col py-8 text-black bg-white rounded-2xl shadow-xl mt-10 mb-10 px-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-black">Your Communities</h2>
        <ul className="space-y-4">
          {mockCommunities.map(comm => (
            <li key={comm.id} className="bg-white rounded-xl px-4 py-4 flex justify-between items-center shadow border border-gray-200">
              <span className="font-semibold text-lg text-black">{comm.name}</span>
              <span className="text-gray-600">{comm.members} members</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Communities; 