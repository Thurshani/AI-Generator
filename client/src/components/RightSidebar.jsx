import React, { useContext } from 'react';
import assets from '../assets/assets';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const RightSidebar = ({ selectedUser }) => {
  const { messages } = useContext(ChatContext);
  const { logout } = useContext(AuthContext);

  if (!selectedUser) return null;

  // Ensure matching senderId
  const userMedia = messages
    .filter(msg => msg.senderId?.toString() === selectedUser?._id?.toString() && msg.image)
    .map(msg => msg.image);

  return (
    <div className="bg-[#8185B2]/20 text-white w-full relative overflow-y-scroll max-md:hidden">
      {/* Profile */}
      <div className="pt-10 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt="User Profile"
          className="w-20 aspect-square rounded-full object-cover"
        />
        <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {selectedUser.fullName}
        </h1>
        <p className="px-10 mx-auto text-center">
          {selectedUser.bio || 'Hi there, I am using chat app'}
        </p>
      </div>

      <hr className="border-[#ffffff50] my-4" />

      {/* Media */}
      <div className="px-5 text-xs">
        <p className="text-sm font-medium">Media</p>
        <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4">
          {userMedia.length > 0 ? (
            userMedia.map((url, index) => (
              <div key={index} onClick={() => window.open(url)} className="cursor-pointer rounded">
                <img src={url} alt={`media-${index}`} className="h-full rounded-md object-cover" />
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-2 text-center">No media shared yet</p>
          )}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light px-20 py-2 rounded-full cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default RightSidebar;
