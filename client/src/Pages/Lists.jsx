import React from 'react';

const mockLists = [
  { id: 1, name: 'Close Friends', members: 5 },
  { id: 2, name: 'Work', members: 8 },
  { id: 3, name: 'Family', members: 4 },
];

function Lists() {
  return (
    <div className="min-h-screen bg-white flex justify-center items-start">
      <div className="w-full max-w-2xl flex flex-col py-8 text-black bg-white rounded-2xl shadow-xl mt-10 mb-10 px-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-black">Your Lists</h2>
        <ul className="space-y-4">
          {mockLists.map(list => (
            <li key={list.id} className="bg-white rounded-xl px-4 py-4 flex justify-between items-center shadow border border-gray-200">
              <span className="font-semibold text-lg text-black">{list.name}</span>
              <span className="text-gray-600">{list.members} members</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Lists; 