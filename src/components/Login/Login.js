import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../fireBaseConfig";
firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: ""
  });

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(signedOutUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBlur = (e) => {
    console.log(e.target.value, e.target.name);
    let isFormValid = true;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if(isFormValid){
        const newUserInfo ={...user}
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo)
    }
  };

  const handleSubmit = () => {};

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={handleSignOut}>Sing Out</button>
      ) : (
        <button onClick={handleSignIn}>sign In</button>
      )}
      {user.isSignedIn && (
        <div>
          <p> welcome , {user.name}</p>
          <img src={user.photo} alt="" />
          <p>{user.email}</p>
        </div>
      )}

      <h1>Our own authntication</h1>
      
      <form onSubmit={handleSubmit} action="">
      <input type="text" name="name"
      onBlur={handleBlur}
       placeholder="Your Name"/>
      <br/>
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
        <input type="submit" value="submit" />
      </form>

      <h2>this is login</h2>
    </div>
  );
};

export default Login;
