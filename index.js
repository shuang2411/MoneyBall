var firebaseConfig = {
  apiKey: "AIzaSyBqdcAZULn67e2xDpAXw1NO-1Dux64XOp0",
  authDomain: "money-ball-1c4b7.firebaseapp.com",
  databaseURL: "https://money-ball-1c4b7.firebaseio.com",
  projectId: "money-ball-1c4b7",
  storageBucket: "money-ball-1c4b7.appspot.com",
  messagingSenderId: "680908302350",
  appId: "1:680908302350:web:666cea1087f74466d4b45f",
  measurementId: "G-5LZWLJQMG1"
};
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// make auth and firestore references
  const auth = firebase.auth();
  const db = firebase.firestore();

// update firestore settings
  db.settings({ timestampsInSnapshots: true });



// get data
db.collection('guides').get().then(snapshot => {
  console.log(snapshot.docs);
});


// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
  } else {
    console.log('user logged out');
  }
});


// sign up
const signupForm = document.querySelector('#signup-form'); //FIXME: need to know name for the signup form
singupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = singupForm['signup-email'].value;
  const password = singupForm['signup-password'].value;
    
  // sign up the user
  if (email != null && password != null) {
    auth.createUserWIthEmailAndPassword(email, password).then(cred => {
      console.log(cred.user);
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
  } else {
    window.alert("Form is incomplete! Please fill out all fields!");
  }
    
});

// sign out
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("user has signed out!");
  });
})


// sign in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  if (email != null && password != null) {
    auth.signInWithEmailAndPassword(email, password).then(cred => {
      console.log(cred.user);
      // close the login modal and reset the form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    });
  } else {
    window.alert("Form is incomplete! Please fill out all fields!");
  }
    
});



