import React from "react";
import { doc, onSnapshot } from "firebase/firestore";
import pfp from "../images/navbar--pfp.png";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Chats = () => {
  const [chat, setChat] = React.useState("");
  const { currentUser } = React.useContext(AuthContext);
  const { dispatch } = React.useContext(ChatContext);
  React.useEffect(() => {
    const getChat = () => {
      const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
        setChat(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChat();
  }, [currentUser.uid]);
  // console.log("chat context");
  // console.log(chat);
  function handleSelect(userInfo) {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  }
  return (
    <>
      {Object.entries(chat)?.map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.username}</span>
            <div>hey there...</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Chats;
