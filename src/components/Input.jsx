import React from "react";
import attach from "../images/attachment.svg";
import upload from "../images/register--pfp.svg";
import send from "../images/send-icon.svg";
const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something..." />
      <div className="input--menu">
        <img src={attach} alt="" />
        <input type="file" name="" id="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <img src={upload} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
