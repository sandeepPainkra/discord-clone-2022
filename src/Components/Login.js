import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enterUser, selectUser } from "../features/counterSlice";
import { auth, provider } from "../firebase";
import "./Login.css";
const Login = () => {
  const dispatch = useDispatch();
  const LoginClick = () => {
    auth
      .signInWithPopup(provider)
      .catch((error) => alert(error.message))
      .then((data) => {
        dispatch(
          enterUser({
            username: data.user.displayName,
            email: data.user.email,
            imgUrl: data.user.photoURL,
          })
        );
      });
  };

  return (
    <div onClick={LoginClick} className="login">
      <div className="loginContainer">
        <img
          src="https://img.search.brave.com/TbUhnEgJEf8Bpoa_eEJfk4-vBa3oNHcIgZtOToFXOqc/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5t/NXlWODE1N3NGWDB6/NjNSMjF4Ujl3SGFF/OCZwaWQ9QXBp"
          alt="Discord logo"
        />
        <h3>Welcome to Discord</h3>
        <Button varient="primary">Sign In With Google</Button>
      </div>
    </div>
  );
};

export default Login;
