import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

/**
 * Add selected subjects to a student's record in Firestore.
 * @param {string} userId - The ID of the student.
 * @param {Array} subjects - The list of subjects selected by the student.
 */
async function addSubjectsToStudent(userId, subjects) {
    // Reference the student's document
    const studentRef = doc(db, 'users', userId);
  
    try {
      // Check if the document exists
      const docSnap = await getDoc(studentRef);
      if (docSnap.exists()) {
        // Update the student's document with the selected subjects
        await updateDoc(studentRef, {
          subjects: subjects
        });
        console.log("Subjects added successfully!");
      } else {
        // If the document doesn't exist, create it with the selected subjects
        await setDoc(studentRef, {
          subjects: subjects
        });
        console.log("New student document created with subjects!");
      }
    } catch (error) {
      console.error("Error adding subjects: ", error);
    }
}

document.getElementById('subjectForm').addEventListener('submit', (event) => {
    event.preventDefault();
  
    // Get the selected subjects
    const selectedSubjects = [];
    document.querySelectorAll('input[name="subject"]:checked').forEach((checkbox) => {
      selectedSubjects.push(checkbox.value);
    });
  
    // Assume you have the student's ID stored (e.g., from login information)
    const studentId = 'uniqueStudentId';
  
    // Call the function to add subjects
    addSubjectsToStudent(studentId, selectedSubjects);
});
