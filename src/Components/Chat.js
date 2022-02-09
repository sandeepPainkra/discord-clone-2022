import { IconButton } from "@material-ui/core";
import {
  AddCircle,
  CardGiftcard,
  EditLocation,
  EmojiEmotions,
  Gif,
  Help,
  NotificationsNoneOutlined,
  People,
  Search,
  Send,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectRoomId, selectUser } from "../features/counterSlice";
import db from "../firebase";
import "./Chat.css";

const Chat = () => {
  const [roomName, setRoomName] = useState();
  const roomId = useSelector(selectRoomId);


  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().room);
        });
    }
  }, [roomId]);
  return (
    <div className="chat">
      {/* chat hader starts here */}

      <div className="chat_hader">
        <div className="chat_haderInfo">
          <h2>
            <span>#</span>
            {roomName}
          </h2>
        </div>
        <div className="chat_haderRight">
          <NotificationsNoneOutlined />
          <EditLocation />
          <People />
          <div className="chat_haderSearch">
            <input type="text" placeholder="Search" />
            <Search />
          </div>
          <Send />
          <Help />
        </div>
      </div>

      {/* Chat Messages section starts here */}

      <div className="chat_messages">
        <h3>hello</h3>
      </div>

      {/* Chat Footer section starts here */}

      <div className="chat_footer">
        <IconButton>
          <AddCircle />
        </IconButton>
        <form action="">
          <input type="text" placeholder="Messages #ABC" />
          <button type="submit">click</button>
        </form>
        <IconButton>
          <CardGiftcard />
        </IconButton>
        <IconButton>
          <Gif />
        </IconButton>
        <IconButton>
          <EmojiEmotions />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
