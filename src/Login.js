import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "./store/appSlice";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const userCred = {
          displayName: res.user.displayName,
          uid: res.user.uid,
          photoUrl: res.user.photoURL,
        };
        dispatch(login(userCred));
        // console.log(res.user);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
