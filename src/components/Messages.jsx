import React from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const Messages = () => {
  const [messages, setMessages] = React.useState([]);
  const { data } = React.useContext(ChatContext);
  console.log(data);
  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc?.data()?.messages);
    });
    return () => {
      return unsub();
    };
  }, [data.chatId]);
  return (
    <div className="messages">
      {messages.map((val) => {
        return <Message message={val} key={val.id} />;
      })}
    </div>
  );
};

export default Messages;
