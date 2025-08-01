import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";

const Homepage = () => {
  const [selectedUser, setSelectedUser] = useState(false);

  return (
    <div className="w-full h-screen px-[15%] py-[5%] relative">
     
      <div
        className={`bg-white/2 backdrop-blur-xl border-2 border-gray-600 rounded-2xl
        overflow-hidden w-full h-full grid grid-cols-1 relative  ${selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]" : "md:grid-cols-2"
        }`}
      >
        <Sidebar  selectedUser={selectedUser} setSeletedUser={setSelectedUser}/>
        <ChatContainer selectedUser={selectedUser} setSeletedUser={setSelectedUser} />
        <RightSidebar selectedUser={selectedUser} setSeletedUser={setSelectedUser} />
      </div>
    </div>
  );
};

export default Homepage;
