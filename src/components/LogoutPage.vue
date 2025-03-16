<template>
  <div class="container text-center mt-5">
    <p>Trwa wylogowywanie...</p>
    <p v-if="isLoggedOut">Zostałeś pomyślnie wylogowany!</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase";
import { ref } from 'vue';

const router = useRouter();
const isLoggedOut = ref(false);

async function logoutUser() {
  try {
    await signOut(auth); // Wylogowanie użytkownika
    isLoggedOut.value = true;
    setTimeout(() => {
      router.push('/'); // Przekierowanie na stronę główną
    }, 1500);
  } catch (error) {
    console.error("Błąd podczas wylogowywania:", error.message);
  }
}

logoutUser();
</script>
