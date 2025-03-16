<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#" @click="showHome">Świat Kina</a>
      <div class="navbar-nav ms-auto">
        <a class="nav-item nav-link" href="#" @click="showHome">Strona Główna</a>
        <a class="nav-item nav-link" href="#" @click="showMovies">Filmy</a>
        <a class="nav-item nav-link" href="#" @click="showSeanse">Seanse</a>
        <template v-if="user && isAdmin">
          <a class="nav-item nav-link" href="#" @click="showAdmin">Panel Admina</a>
        </template>
        <template v-if="user">
          <!-- Wyświetlanie zdjęcia profilowego -->
          <a class="nav-item nav-link" href="#" @click="showProfile">
            <img :src="profilePicture" alt="Profil" class="profile-img" />
            <span>{{ user.email }}</span>
          </a>
          <button @click="logout" class="btn btn-outline-light me-4">Wyloguj</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-outline-light me-4">Zaloguj</router-link>
        </template>
      </div>
    </nav>
  </header>
  <main class="main-content">
    <component :is="currentView" @changePage="handleChangePage"></component>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useLogin from "@/composables/useLogin";
import Home from './HomePage.vue';
import Movies from './MoviesPage.vue';
import Seanse from './SeansePage.vue';
import adminPanel from './adminPanel.vue';
import ProfilePage from './ProfilePage.vue';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/Firebase";
import { doc, getDoc } from "firebase/firestore";  // Importujemy funkcje Firestore

const { logout, getUserProfilePicture, checkIfUserIsAdmin } = useLogin();

const user = ref(null);
const profilePicture = ref(""); // Przechowujemy URL zdjęcia profilowego
const currentView = ref(Home);
const isAdmin = ref(false); // Zmienna do przechowywania statusu administracyjnego

// Nasłuchiwanie stanu użytkownika
onMounted(() => {
  onAuthStateChanged(auth, async (currentUser) => {
    user.value = currentUser ? currentUser : null;
    if (user.value) {
      // Pobieramy zdjęcie profilowe
      profilePicture.value = await getUserProfilePicture();
      
      // Sprawdzamy, czy użytkownik jest administratorem
      isAdmin.value = await checkIfUserIsAdmin(user.value.uid);
      //console.log(isAdmin.value);
    }
  });
});

// Funkcje do zmiany widoków
function showHome() {
  currentView.value = Home;
}
function showMovies() {
  currentView.value = Movies;
}
function showSeanse() {
  currentView.value = Seanse;
}
function showAdmin() {
  currentView.value = adminPanel;
}
function showProfile() {
  currentView.value = ProfilePage;
}

// Obsługa zmiany strony z komponentu
function handleChangePage(page) {
  if (page === "Movies") {
    currentView.value = Movies;
  } else if (page === "Seanse") {
    currentView.value = Seanse;
  }
}
</script>

<style scoped>
.navbar-nav .btn {
  margin-right: 20px; /* Dodatkowy margines od prawej */
}

.profile-img {
  width: 30px; /* Szerokość miniaturki */
  height: 30px; /* Wysokość miniaturki */
  border-radius: 50%; /* Zaokrąglony obrazek */
  margin-right: 10px; /* Odstęp między obrazkiem a tekstem */
}
</style>
