import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useSelector } from "react-redux";
import { getUser } from "./store/appSlice";

function Sidebar({ responsive }) {
  const [rooms, setRooms] = useState([]);
  const user = useSelector(getUser);

  useEffect(() => {
    const q = query(collection(db, "rooms"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) =>
      setRooms(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={responsive ? "sidebar display" : "sidebar"}>
      <div className="sidebar__header">
        <IconButton>
          <Avatar src={user?.photoURL} />
        </IconButton>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="search or start new chat" type="text"></input>
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
