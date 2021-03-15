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

    const handleChange = (e) => {
        console.log(e.target.value)
    }

    const handleSubmit = () => {

    }

    return (
        <div style={{textAlign: 'center'}}>
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

        <h1>Our own authntication</h1>
        <form onSubmit={handleSubmit} action="">
        <input type="email" placeholder="Your Email address" onChange={handleChange} required/>
        <br/>
        <input type="password" placeholder="Your Password" onChange={handleChange} required/>
        <br/>
        <input type="submit" value="submit"/>
        </form>






            <h2>this is login</h2>
        </div>
    )
}

export default Login
