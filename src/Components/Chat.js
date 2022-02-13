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
import firebase from "firebase";
import ChatMessage from "./ChatMessage.js";

const Chat = () => {
  const [roomName, setRoomName] = useState();
  const roomId = useSelector(selectRoomId);
  const user = useSelector(selectUser);
  const [message, setMessage] = useState();
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().room);
        });
    }
  }, [roomId]);
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .collection("Messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setRoomMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  console.log(roomMessages);

  // send message on data base

  const SendMessages = (event) => {
    event.preventDefault();
    if (roomId) {
      db.collection("rooms").doc(roomId).collection("Messages").add({
        text: message,
        userimage: user.imgUrl,
        username: user.username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setMessage("");
  };
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
        {roomMessages.map((data) => {
          return (
            <ChatMessage
              imgUrl={data.userimage}
              message={data.text}
              username={data.username}
            />
          );
        })}
      </div>

      {/* Chat Footer section starts here */}

      <div className="chat_footer">
        <IconButton>
          <AddCircle />
        </IconButton>
        <form action="">
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Messages #ABC"
          />
          <button type="submit" onClick={SendMessages}>
            click
          </button>
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
