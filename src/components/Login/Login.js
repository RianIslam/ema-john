import React from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../fireBaseConfig';
firebase.initializeApp(firebaseConfig);

const Login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const handleSignIn = () => {
        
    }

    return (
        <div>
        <button onClick={}>sign In</button>
            <h2>this is login</h2>
        </div>
    )
}

export default Login
