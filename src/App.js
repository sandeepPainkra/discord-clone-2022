import { Avatar, IconButton } from "@material-ui/core";
import { Add, KeyboardArrowDown } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./App.css";
import "./Components/Sidebar.css";
import Chat from "./Components/Chat.js";
import SidebarChannel from "./Components/SidebarChannel.js";
import SignalCellularAltOutlinedIcon from "@material-ui/icons/SignalCellularAltOutlined";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import HeadsetOutlinedIcon from "@material-ui/icons/HeadsetOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import db from "./firebase";
import Login from "./Components/Login";
import { useSelector } from "react-redux";
import { selectUser } from "./features/counterSlice";
const App = () => {
  const user = useSelector(selectUser);
  const [room, setRoom] = useState([]);
  const CreateChannels = () => {
    const className = prompt("Enter Class Name:");
    if(className){
      db.collection("rooms").add({
        room: className,
      });
    }
    console.log(className);
  };

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRoom(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div className="App">
          {/* sidebar starts here */}

          <div className="sidebar">
            {/* sidebar top start here */}
            <div className="sidebar_top">
              <h2>{user.username}</h2>
              <KeyboardArrowDown />
            </div>

            {/* Sidebar channels section starts here */}

            <div className="sidebar_channelSection">
              <div className="sidebar_hader">
                <div className="sidebar_haderInfo">
                  <KeyboardArrowDown />
                  <p>Text Channel</p>
                </div>
                <IconButton>
                  <Add onClick={CreateChannels} />
                </IconButton>
              </div>

              <div className="sidebar_channels">
                {room.map((data, index) => {
                  return (
                    <SidebarChannel
                      key={index}
                      roomName={data.data.room}
                      roomId={data.id}
                    />
                  );
                })}
              </div>
            </div>
            {/* Sidebar Network section starts here */}

            <div className="sidebar_network">
              <SignalCellularAltOutlinedIcon />
              <div className="sidebarNet_info">
                <h4>Voice Connected</h4>
                <span>sandy</span>
              </div>
              <div className="sidebarNet_icon">
                <InfoOutlinedIcon />
                <CallOutlinedIcon />
              </div>
            </div>

            {/* Sidebar Profile section starts here */}

            <div className="sidebar_profile">
            <Avatar alt={user.username}  src={user.imgUrl} />
              <h2>{user.username}</h2>
              <div className="sidebar_profileIcons">
                <MicNoneOutlinedIcon />
                <HeadsetOutlinedIcon />
                <SettingsOutlinedIcon />
              </div>
            </div>
          </div>

          {/* sidebar ends here */}

          {/* Chat section starts here */}

          <Chat />

          {/* Chat section ends here */}
        </div>
      )}
    </>
  );
};

export default App;
