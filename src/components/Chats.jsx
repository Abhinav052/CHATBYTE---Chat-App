import React from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Chats = () => {
  const [chat, setChat] = React.useState([]);
  const { currentUser } = React.useContext(AuthContext);
  const { dispatch } = React.useContext(ChatContext);
  console.log(currentUser);
  React.useEffect(() => {
    try {
      const getChat = async () => {
        const unsub = await onSnapshot(
          doc(db, "userChat", currentUser.uid),
          (doc) => {
            doc.data() && setChat(doc.data());
            // console.log("document");
            // console.log(doc.data());
          }
        );
        return () => {
          unsub();
        };
      };
      currentUser.uid && getChat();
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  }, [currentUser.uid]);
  // React.useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
  //       setChat(doc.data());
  //     });

  //     return () => {
  //       unsub();
  //     };
  //   };

  //   currentUser.uid && getChats();
  // }, [currentUser.uid]);

  console.log("chat context");
  console.log(chat);
  console.log(Object.entries(chat));
  function handleSelect(userInfo) {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  }
  return (
    <div>
      {chat &&
        Object.entries(chat)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo.username}</span>
                {chat[1].lastMessage && <div>{chat[1]?.lastMessage.text}</div>}
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chats;
