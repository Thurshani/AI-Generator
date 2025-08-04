import React, { useEffect, useRef, useState, useContext } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const {
    messages,
    selectedUser,
    setSelectedUser,
    sendMessage,
    getMessage,
  } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      getMessage(selectedUser._id.trim()); // ✅ FIXED: remove any leading/trailing spaces
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full overflow-scroll relative">
      {/* Header */}
      <div className="flex items-center gap-3 py-5 mx-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt="profile"
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll py-3 pb-6 px-4">
        {messages.map((msg, index) => {
          const isSender =
            msg.senderId?.toString() === authUser._id?.toString();
          const avatar = isSender
            ? authUser.profilePic || assets.avatar_icon
            : selectedUser.profilePic || assets.profile_martin;

          return (
            <div
              key={index}
              className={`flex flex-col mb-6 ${
                isSender ? "items-end" : "items-start"
              }`}
            >
              {/* Message bubble */}
              <div
                className={`p-2 max-w-[220px] text-sm font-light rounded-lg break-words bg-violet-500/30 text-white ${
                  isSender
                    ? "ml-auto mr-5 rounded-br-none"
                    : "ml-5 mr-auto rounded-bl-none"
                }`}
              >
                {msg.image ? (
                  <img src={msg.image} alt="message" className="rounded-md" />
                ) : (
                  msg.text
                )}
              </div>

              {/* Avatar and Time */}
              <div
                className={`flex items-center gap-2 mt-1 ${
                  isSender
                    ? "justify-end flex-row-reverse"
                    : "justify-start"
                }`}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-xs text-gray-400">
                  {formatMessageTime(msg.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-transparent flex items-center gap-3">
        <div className="flex flex-1 items-center bg-white/5 backdrop-blur-md px-4 py-2 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) =>
              e.key === "Enter" ? handleSendMessage(e) : null
            }
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-400 px-2"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt="gallery"
              className="w-5 h-5 cursor-pointer"
            />
          </label>
        </div>
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt="send"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} alt="" className="max-w-16" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
