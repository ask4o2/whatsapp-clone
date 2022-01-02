import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import db from "./firebase";
import "./SidebarChat.css";
import { Link } from "react-router-dom";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      const docRef = doc(db, "rooms", id);
      const messagesRef = collection(docRef, "messages");
      const messagesQuery = query(messagesRef, orderBy("timestamp", "desc"));

      onSnapshot(messagesQuery, (snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const name = prompt("please enter name for chatroom");
    // new code
    addDoc(collection(db, "rooms"), { name });
    // /////////
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
