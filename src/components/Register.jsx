import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React from "react";
import pfp from "../images/register--pfp.svg";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Register = () => {
  console.log(auth);
  const [err, setErr] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log("handle triggerred");
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, username);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            try {
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                username,
                email,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "userChat", res.user.uid), {});
              navigate("/");
            } catch (error) {
              console.log("Errot" + error);
            }
          });
        }
      );
    } catch (error) {
      console.log("ERROORR" + error);
      setErr(error);
    }
  };

  return (
    <div className="form--container">
      <div className="form--wrapper">
        <span className="form--logo">CHATBYTE</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="file" id="form--file" style={{ display: "none" }} />
          <label
            htmlFor="form--file"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={pfp} alt="" />
            <span style={{ marginLeft: "10px" }}>Upload Display Picture</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
