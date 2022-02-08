import React from "react";
import { useDispatch } from "react-redux";
import "./SidebarChannel.css";
import { enterRoom } from "../features/counterSlice.js";

const SidebarChannel = ({ roomName, roomId }) => {
  const dispatch = useDispatch();
  const SendRoomId = () => {
    if (roomId) {
      dispatch(
        enterRoom({
          roomId: roomId,
        })
      );
    }
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
