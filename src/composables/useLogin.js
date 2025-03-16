// src/composables/useLogin.js
import { ref } from "vue";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut
} from "firebase/auth";
import { db, auth, storage } from "@/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const error = ref(null);
const isLoading = ref(false);

// Logowanie użytkownika
async function login(email, password) {
  error.value = null;
  isLoading.value = true;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    isLoading.value = false;
    return userCredential.user;
  } catch (err) {
    isLoading.value = false;
    error.value = "Błąd logowania: " + err.message;
    throw err;
  }
}

// Rejestracja użytkownika
async function register(email, password) {
  error.value = null;
  isLoading.value = true;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    isLoading.value = false;
    return userCredential.user;
  } catch (err) {
    isLoading.value = false;
    error.value = "Błąd rejestracji: " + err.message;
    throw err;
  }
}

// Funkcja resetowania hasła
async function resetPassword(email) {
    error.value = null;
    isLoading.value = true;
    try {
      await sendPasswordResetEmail(auth, email);
      isLoading.value = false;
      return "E-mail do resetowania hasła został wysłany na podany adres.";
    } catch (err) {
      isLoading.value = false;
      error.value = "Błąd resetowania hasła: " + err.message;
      throw err;
    }
  }
  

// Funkcja logowania użytkownika
async function logout() {
  await signOut(auth);
}

// Funkcja dodawania zdjęcia profilowego
async function uploadProfilePicture(file) {
  const user = auth.currentUser;
  if (user) {
    try {
      // Tworzymy referencję do folderu użytkownika
      const storagePath = `userProfile/${user.uid}.png`;
      const fileRef = storageRef(storage, storagePath);

      // Rozpoczynamy upload zdjęcia
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Możesz dodać obsługę postępu uploadu tutaj, jeśli chcesz
        },
        (error) => {
          console.error("Błąd przesyłania zdjęcia: ", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref());
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, {
            photoURL: downloadURL,
          });

          console.log("Zdjęcie profilowe zostało dodane!");
          return downloadURL;
        }
      );
    } catch (err) {
      console.error("Błąd dodawania zdjęcia profilowego: ", err);
      throw err;
    }
  } else {
    console.log("Brak zalogowanego użytkownika.");
  }
}

// Funkcja do pobierania zdjęcia profilowego użytkownika
async function getUserProfilePicture() {
    const user = auth.currentUser;
    if (user) {
      try {
        const userProfileImageRef = storageRef(storage, `userProfile/${user.uid}.png`);
        try {
          const url = await getDownloadURL(userProfileImageRef);
          return url;
        } catch (err) {
          console.log("Brak zdjęcia użytkownika, używamy domyślnego.");
          const defaultImageRef = storageRef(storage, "userProfile/default.png");
          const defaultUrl = await getDownloadURL(defaultImageRef);
          return defaultUrl;
        }
      } catch (err) {
        console.error("Błąd pobierania zdjęcia profilowego: ", err);
        return "";
      }
    } else {
      return "";
    }
  }
  async function checkIfUserIsAdmin(uid) {
    //console.log(uid);
    const adminDocRef = doc(db, "admins", uid);  // Sprawdzamy dokument w kolekcji "admins" z UID użytkownika
    const adminDoc = await getDoc(adminDocRef);
    return(adminDoc.exists());  // Jeśli dokument istnieje, ustawiamy isAdmin na true
  }

function useLogin() {
  return {
    error,
    isLoading,
    login,
    register,
    logout,
    uploadProfilePicture,
    getUserProfilePicture,
    resetPassword,
    checkIfUserIsAdmin,
  };
}

export default useLogin;
