import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
  const [err, setErr] = React.useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };
  console.log("Eror" + err);
  return (
    <div className="form--container">
      <div className="form--wrapper">
        <span className="form--logo">CHATBYTE</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </form>
        <p>Don't have an account? Sign Up</p>
      </div>
    </div>
  );
};

export default Login;
