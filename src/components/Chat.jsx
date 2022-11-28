import React from "react";
import more from "../images/chat--more.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
const Chat = () => {
  const { data } = React.useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chat--info">
        <span>{data.user.username}</span>
        <img src={more} alt="" />
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
