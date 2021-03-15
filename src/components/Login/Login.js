import React, { useState } from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../fireBaseConfig';
firebase.initializeApp(firebaseConfig);

const Login = () => {
    const[user,setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    });





    const provider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then(res =>{
            const {displayName,photoURL,email} =res.user;
            const signedInUser ={
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(signedInUser);
            console.log(displayName,email,photoURL);
        })
        .catch(err =>{
            console.log(err);
            console.log(err.message)
        })
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
        .then(res =>{

            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: ''
            }
            setUser(signedOutUser);
        })
        .catch(err =>{
            console.log(err)
        })
    }

    return (
        <div>
        { user.isSignedIn ?
            <button onClick={handleSignOut}>Sing Out</button> :
            <button onClick={handleSignIn}>sign In</button>
            }
        {
            user.isSignedIn && <div>
            <p> welcome , {user.name}</p>
            <img src={user.photo} alt=""/>
            <p>{user.email}</p>
        </div>
        }
            <h2>this is login</h2>
        </div>
    )
}

export default Login
