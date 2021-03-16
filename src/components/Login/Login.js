import React, { useContext, useState } from "react";

import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFremworks, signInWithEmailAndPassword } from "./LoginManager";

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    
    name: "",
    email: "",
    password: "",
    error: "",
    photo: "",
    success: false
  });

  initializeLoginFremworks();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  const history = useHistory();
  const location = useLocation();
  let {from} = location.state || {from:{pathname: "/"}};

  const googleSignIn = () => {

    handleGoogleSignIn()
    .then(res =>{
      handleResponse(res,true);
    })

  }

  const signOut = () => {
    handleSignOut()
    .then(res =>{
      handleResponse(res,false);
    })

  }

  const handleResponse = (res,redirect) => {
    setUser(res);
    setLoggedInUser(res);
    history.replace(from)
    if(redirect){
      history.replace(from);
    }
  }


  const handleBlur = (e) => {
    console.log(e.target.value, e.target.name);
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then((res) => {
        handleResponse(res,true);
      })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email,user.password)
      .then((res) => {
        handleResponse(res,true);
      })
    }
    e.preventDefault();
  };



  

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sing Out</button>
      ) : (
        <button onClick={googleSignIn}>sign In</button>
      )}
      {user.isSignedIn && (
        <div>
          <p> welcome , {user.name}</p>
          <img src={user.photo} alt="" />
          <p>{user.email}</p>
        </div>
      )}

      <h1>Our own authntication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>

      

      <form onSubmit={handleSubmit} action="">
       {newUser && <input
          type="text"
          name="name"
          onBlur={handleBlur}
          placeholder="Your Name"
        />} 
        <br />
        <input
          type="email"
          name="email"
          placeholder="Your Email address"
          onBlur={handleBlur}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          onBlur={handleBlur}
          required
        />
        <br />
        <input type="submit" value={newUser ?  "Sign Up" : "Sign In"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {

          user.success && <p style={{color:'green'}}> User { newUser ? 'Created' : 'Logged In'} Successfully</p>
      }

      <h2>this is login</h2>
    </div>
  );
};

export default Login;
