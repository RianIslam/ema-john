import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../fireBaseConfig";

export const initializeLoginFremworks = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

}

export  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase
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
        return signedInUser;
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };



  export 
  const handleSignOut = () => {
   return firebase
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
        return signedOutUser ;
      })
      .catch((err) => {
        console.log(err);
      });
  };




//   export const createUserWithEmailAndPassword = () => {
//     firebase
//     .auth()
//     .createUserWithEmailAndPassword(user.email, user.password)
//     .then((res) => {
//         const newUserInfo = { ...user };
//         newUserInfo.error = '',
//         newUserInfo.success = true;
//         setUser(newUserInfo);
//         updateUserName(user.name)
//     })
//     .catch((error) => {
//       const newUserInfo = { ...user };
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//     });
//   }



//   export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then((res) => {
//       const newUserInfo = { ...user };
//           newUserInfo.error = '',
//           newUserInfo.success = true;
//           setUser(newUserInfo);
//           setLoggedInUser(newUserInfo);
//           history.replace(from);
//           console.log('sign in user info' , res.user);
//     })
//     .catch((error) => {
//       const newUserInfo = { ...user };
//         newUserInfo.error = error.message;
//         newUserInfo.success = false;
//         setUser(newUserInfo);
//     })
//   }


//   const updateUserName = name => {
//     const user = firebase.auth().currentUser;
//     user.updateProfile({
//     displayName: name
    
//     }).then(function(){
//       console.log('hwllo')
//     }).catch(function(err){
//       console.log(err)
//     })
    
//   }