import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = ({ selectedUser, setSeletedUser }) => {
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return selectedUser ? (
    <div className="h-full overflow-scroll relative background-blur-lg  ">
      {/*----Header------*/}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={assets.profile_martin}
          alt="profile"
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          Martin Johnson
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSeletedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden mzx-w-7"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>
      {/*----Chat Messages------*/}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll py-3 pb-6 px-4">
  {messagesDummyData.map((msg, index) => {
    const isSender = msg.senderId === "680f50e4f10f3cd28382ecf9";

    return (
      <div
        key={index}
        className={`flex items-end gap-2 mb-3 ${
          isSender ? "justify-end" : "justify-start"
        }`}
      >
        {/* Avatar (left for receiver, right for sender) */}
        {!isSender && (
          <div className="text-center text-xs">
            <img
              src={assets.profile_martin}
              alt="receiver-avatar"
              className="w-7 rounded-full"
            />
            <p className="text-gray-500">{formatMessageTime(msg.createdAt)}</p>
          </div>
        )}

        {/* Message bubble or image */}
        {msg.image ? (
          <img
            src={msg.image}
            alt="message"
            className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden"
          />
        ) : (
          <p
            className={`p-2 max-w-[200px] text-sm font-light rounded-lg break-all bg-violet-500/30 text-white ${
              isSender ? "rounded-br-none" : "rounded-bl-none"
            }`}
          >
            {msg.text}
          </p>
        )}

        {/* Sender avatar */}
        {isSender && (
          <div className="text-center text-xs">
            <img
              src={assets.avatar_icon}
              alt="sender-avatar"
              className="w-7 rounded-full"
            />
            <p className="text-gray-500">{formatMessageTime(msg.createdAt)}</p>
          </div>
        )}
      </div>
    );
  })}

  <div ref={scrollEnd}></div>
</div>

      {/*----Input Box------*/}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-transparent flex items-center gap-3">
        <div className="flex flex-1 items-center bg-white/5 backdrop-blur-md px-4 py-2 rounded-full">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-400 px-2"
          />
          <input type="file" id="image" accept="image/png,image/jpeg" hidden />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt="gallery"
              className="w-5 h-5 cursor-pointer"
            />
          </label>
        </div>
        <img
          src={assets.send_button}
          alt="send"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} alt="" className="max-w-16" />
      <p className="text-lg font-medium text-white">Chat anytime,anywhere</p>
    </div>
  );
};

export default ChatContainer;
