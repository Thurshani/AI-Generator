import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // ✅ Add this
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState(false);

  const navigate = useNavigate();
  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div className=" p-5 space-y-6 bg-[#282142]/30 backdrop-blur-md border border-white/20 shadow-lg">
      {/* Logo + Menu */}
      <div className="flex items-center justify-between">
        <img src={assets.logo} alt="logo" className="w-28" />
        <div className="relative group">
          <img
            src={assets.menu_icon}
            alt="Menu"
            className="w-5 cursor-pointer"
          />
          <div className="absolute top-full right-0 z-20 w-24 p-3 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block space-y-2 text-sm">
            <p onClick={() => navigate("/profile")} className="cursor-pointer">
              Edit Profile
            </p>
            <hr className="border-gray-500" />
            <p onClick={() => logout()} className="cursor-pointer text-sm">
              Logout
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#282142] rounded-full flex items-center gap-2 px-3 py-2">
        <img src={assets.search_icon} alt="Search" className="w-3" />
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
          placeholder="Search User..."
        />
      </div>

      {/* User List */}
      <div className="flex flex-col space-y-">
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({
                ...prev,
                [user._id]: 0,
              }));
            }}
            key={index}
            className={`relative flex items-center gap-2 p-2 pl-1 rounded cursor-pointer transition ${
              selectedUser?._id === user._id
                ? "bg-[#282142]/50"
                : "hover:bg-[#282142]/30"
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="user"
              className="w-[35px] aspect-square rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p className="text-sm text-white">{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">Offline</span>
              )}
            </div>
            {unseenMessages[user._id] > 0 && (
              <p className="absolute top-3 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50 text-white">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
