// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIPuCXTPYYeSrFbYhJfRoqWkpUXz06qPw",
  authDomain: "learningmanagementsystem-6a495.firebaseapp.com",
  projectId: "learningmanagementsystem-6a495",
  storageBucket: "learningmanagementsystem-6a495.appspot.com",
  messagingSenderId: "607890066394",
  appId: "1:607890066394:web:8902df59d3fe6dea648ee3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Function to show the sign-up and sign-in message
function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function() {
    messageDiv.style.opacity = 0;
  }, 5000);
}


const signUp = document.getElementById('submit');
signUp.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const FirstName = document.getElementById('FirstName').value;
  const LastName = document.getElementById('LastName').value;
 
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        FirstName: FirstName,
        LastName: LastName,
      };
      // Call the showMessage function along with the message we want to display
      showMessage('Account Created Successfully', 'signUpMessage');
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email already in use!!', 'signUpMessage');
      } else {
        showMessage('Unable to create user', 'signUpMessage');
      }
    });
});
