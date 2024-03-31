
import React from 'react'

function SearchUser() {
  return (
    <div className='mb-5 w-[95%]' style={{marginTop:"4rem"}}>
      <input
        readOnly
        className="ml-5 h-14 outline-none w-full bg-slate-300 rounded-full px-5 bg-transparent border border-[#3b4054]"
        type="text"
        placeholder="Search User"
      />
    </div>
  );
}

export default SearchUser;