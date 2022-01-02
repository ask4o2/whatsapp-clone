import { useParams } from "react-router-dom";
import {
  AttachFile,
  Mic,
  InsertEmoticon,
  SearchOutlined,
} from "@mui/icons-material";
import MoreVert from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");

  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (roomId) {
      const roomQuery = query(doc(db, "rooms", roomId));
      onSnapshot(roomQuery, (snapshot) => {
        setRoomName(snapshot.data().name);
      });

      const messagesRef = collection(roomQuery, "messages");

      const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));
      onSnapshot(messagesQuery, (snapshot) =>
        setMessages(snapshot.docs.map((msg) => ({ ...msg.data(), id: msg.id })))
      );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    // console.log("you typed input >>>> " + input);

    const roomRef = doc(db, "rooms", roomId);

    const messagesRef = collection(roomRef, "messages");
    addDoc(messagesRef, {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={message.id}
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}></button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
