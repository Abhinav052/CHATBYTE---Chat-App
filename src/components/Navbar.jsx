import React from "react";
import pfp from "../images/navbar--pfp.png";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">CHATBYTE</span>
      <div className="userinfo">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => {
            signOut(auth);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
