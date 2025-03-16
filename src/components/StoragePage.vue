<template>
  <div>
    <h1>Aplikacja z dostępem do kolekcji</h1>
    
    <!-- Panel logowania -->
    <div v-if="!currentUser">
      <h2>Wybierz metodę logowania:</h2>
      <button @click="loginAnonymously">Zaloguj anonimowo</button>
      <button @click="loginWithEmail">Zaloguj przez Email/Hasło</button>
      <button @click="loginWithGoogle">Zaloguj przez Google</button>
    </div>

    <!-- Panel po zalogowaniu -->
    <div v-else>
      <h2>Witaj, {{ currentUser.email || 'Anonimowy użytkownik' }}</h2>
      <button @click="logout">Wyloguj się</button>

      <!-- Próba odczytu kolekcji -->
      <div>
        <h3>Odczyt kolekcji:</h3>
        <button @click="readCollection('public')">Publiczna</button>
        <button @click="readCollection('loggedIn')">Dla zalogowanych</button>
        <button @click="readCollection('nonAnonymous')">Dla nieanonimowych</button>
      </div>

      <!-- Wyświetlenie wyników -->
      <div v-if="collectionData.length > 0">
        <h3>Wyniki odczytu:</h3>
        <ul>
          <li v-for="(item, index) in collectionData" :key="index">{{ item }}</li>
        </ul>
      </div>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInAnonymously, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase";

// Stan aplikacji
const currentUser = ref(null);
const errorMessage = ref("");
const collectionData = ref([]);

// Funkcje logowania
const auth = getAuth();

const loginAnonymously = async () => {
  try {
    const result = await signInAnonymously(auth);
    currentUser.value = result.user;
    errorMessage.value = "";
  } catch (err) {
    errorMessage.value = `Błąd logowania anonimowego: ${err.message}`;
  }
};

const loginWithEmail = async () => {
  try {
    const email = prompt("Podaj email:");
    const password = prompt("Podaj hasło:");
    const result = await signInWithEmailAndPassword(auth, email, password);
    currentUser.value = result.user;
    errorMessage.value = "";
  } catch (err) {
    errorMessage.value = `Błąd logowania Email/Hasło: ${err.message}`;
  }
};

const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    currentUser.value = result.user;
    errorMessage.value = "";
  } catch (err) {
    errorMessage.value = `Błąd logowania Google: ${err.message}`;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    currentUser.value = null;
    collectionData.value = [];
    errorMessage.value = "";
  } catch (err) {
    errorMessage.value = `Błąd podczas wylogowywania: ${err.message}`;
  }
};

// Funkcja odczytu kolekcji
const readCollection = async (collectionName) => {
  try {
    collectionData.value = [];
    errorMessage.value = "";
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      collectionData.value.push(doc.data());
    });
  } catch (err) {
    errorMessage.value = `Brak dostępu do kolekcji ${collectionName}: ${err.message}`;
  }
};

// Obserwowanie użytkownika
auth.onAuthStateChanged((user) => {
  currentUser.value = user;
});
</script>

<style scoped>
button {
  padding: 10px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  color: red;
}
</style>
