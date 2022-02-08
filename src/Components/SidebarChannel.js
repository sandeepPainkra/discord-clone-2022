import React from "react";
import "./SidebarChannel.css";

const SidebarChannel = ({ roomName, roomId }) => {
  const SendRoomId = () => {
    console.log(roomId);
  };
  return (
    <div onClick={SendRoomId} className="sidebar_channel">
      <h2>
        <span>#</span>
        {roomName}
      </h2>
    </div>
  );
};

export default SidebarChannel;
