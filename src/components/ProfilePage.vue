<template>
    <div>
      <h1>Twój profil</h1>
      
      <div class="profile-info">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <div>
          <p><strong>Twoje zdjęcie profilowe:</strong></p>
          <img :src="userPhotoURL" alt="Zdjęcie profilowe" class="profile-picture" />
        </div>
  
        <!-- Formularz do przesyłania zdjęcia -->
        <div>
          <input type="file" @change="handleFileUpload" />
          <button @click="uploadPicture">Prześlij zdjęcie profilowe</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import useLogin from '@/composables/useLogin';
  import { auth } from '@/Firebase';
  
  const { uploadProfilePicture, getUserProfilePicture } = useLogin();
  const user = auth.currentUser; 
  const selectedFile = ref(null); 
  const userPhotoURL = ref(null); 
  
  // Funkcja do pobrania zdjęcia profilowego użytkownika
  async function fetchUserProfilePicture() {
    userPhotoURL.value = await getUserProfilePicture();
  }
  
  // Funkcja do obsługi zmiany pliku zdjęcia
  function handleFileUpload(event) {
    selectedFile.value = event.target.files[0];
  }
  
  // Funkcja do przesyłania zdjęcia
  async function uploadPicture() {
    if (selectedFile.value) {
      try {
        const downloadURL = await uploadProfilePicture(selectedFile.value);
        userPhotoURL.value = downloadURL; 
        console.log("Zdjęcie zostało pomyślnie przesłane!");
      } catch (error) {
        console.error("Błąd przesyłania zdjęcia: ", error);
      }
    } else {
      console.log("Wybierz zdjęcie, aby je przesłać.");
    }
    fetchUserProfilePicture();
  }
  
  // Pobierz zdjęcie profilowe podczas ładowania komponentu
  onMounted(() => {
    fetchUserProfilePicture(); 
  });
  </script>
  
  <style scoped>
  .profile-info {
    margin-top: 20px;
  }
  
  .profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 10px;
  }
  </style>
  