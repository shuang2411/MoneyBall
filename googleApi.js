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

const auth = firebase.auth();

function signUpWithEmail(email,password){

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            alert("Signed up!");
        })
        .catch((error) => {
            var errorCode = error.code;
            //var errorMessage = error.message;
            return errorCode;
        });

}

function signInWithEmail(email,password){

    firebase.auth().signInWithEmailAndPassword(email,password)
        .then((user) => {
            alert("Signed in!");
        })
        .catch((error) => {
            var errorCode = error.code;
            //var errorMessage = error.message;
            return errorCode;
        });
}

function signInWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        alert("Signed in!");
      }).catch(function(error) {
        return error.code;
      });
      
}


function logOut(params) {
    firebase.auth().signOut().then(() => {
        console.log("user has signed out!");
      })
}
