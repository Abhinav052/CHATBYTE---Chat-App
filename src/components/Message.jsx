import React from "react";
import pfp from "../images/navbar--pfp.png";
import defaultpic from "../images/message-pic.jpg";
const Message = () => {
  return (
    <div className="message owner">
      <div className="message--info">
        <img src={pfp} alt="" />
        <span>Just now</span>
      </div>
      <div className="message--content">
        <p>Hello there!</p>
        <img src={defaultpic} alt="" />
      </div>
    </div>
  );
};

export default Message;
