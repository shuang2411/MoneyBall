 import { auth } from "./firebase.js"
 import { CreatNewUser } from "./Data model/user"

  // listen for auth status changes
  // auth.onAuthStateChanged(user => {
  //   if (user) {
  //     console.log('user logged in: ', user);
  //   } else {
  //     console.log('user logged out');
  //   }
  // });
  
  // sign up
  export const signUpWIthEmailAndPassword = async (email, password) => {

    if (email != null && password != null) {

      try{

        
        await  auth.createUserWithEmailAndPassword(email, password);
        await  CreatNewUser(email);
        
      } catch (error) {
        console.log(error.message);
        throw error;
      }

    } else {
      window.alert("Form is incomplete! Please fill out all fields!");
    }
  }

  // sign out
  export const logout = async () => {
    auth.signOut().then(() => {
      console.log("user has signed out!");
    });
  }

  // sign in
  export const signInWIthEmailAndPassword = async () => {
    auth.signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      throw new Error(error.message);
    });

    
  }
  

  
  
  
  