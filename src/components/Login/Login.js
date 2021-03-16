import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../fireBaseConfig";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
firebase.initializeApp(firebaseConfig);

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

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  const history = useHistory();
  const location = useLocation();
  let {from} = location.state || {from:{pathname: "/"}};


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
          error: "",
          success: false
        };
        setUser(signedOutUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
            const newUserInfo = { ...user };
            newUserInfo.error = '',
            newUserInfo.success = true;
            setUser(newUserInfo);
            updateUserName(user.name)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUserInfo = { ...user };
            newUserInfo.error = '',
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            history.replace(from);
            console.log('sign in user info' , res.user);
      })
      .catch((error) => {
        const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
      })
    }
    e.preventDefault();
  };



  const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
    displayName: name
    
    }).then(function(){
      console.log('hwllo')
    }).catch(function(err){
      console.log(err)
    })
    
  }

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
