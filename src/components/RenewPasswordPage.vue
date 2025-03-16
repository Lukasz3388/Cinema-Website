<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#" @click="showHome">Świat Kina</a>
      <div class="navbar-nav ms-auto">
      </div>
    </nav>
  </header>
  <br/>
  <div class="my-4 d-flex justify-content-center align-items-center" style="min-height: 80vh;">
  <div v-if="successMessage" class="alert alert-success mb-4">{{ successMessage }}</div>
  <div v-if="errorInfo" class="alert alert-danger mb-4">{{ errorInfo }}</div>

<form @submit.prevent="resetpswdUser()" style="width: 100%; max-width: 500px; padding: 2rem; box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); border-radius: 10px; background-color: #f8f9fa;">
  <div class="mb-4">
    <label for="email" class="form-label">Email:</label>
    <input type="text" v-model="userReset.email" class="form-control form-control-lg" required />
  </div>
  <div class="mb-4 d-flex justify-content-between">
    <router-link to="/register" class="text-decoration-none">Rejestracja</router-link>
    <router-link to="/login" class="text-decoration-none">Zaloguj</router-link>
  </div>
  <button type="submit" class="btn btn-success btn-lg w-100">Zresetuj Hasło</button>
</form>
</div>

</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useLogin from "@/composables/useLogin";

const userReset = ref({
  email: "",
});

const { resetPassword, error, isLoading } = useLogin();
const successMessage = ref('');
const errorInfo = ref('');
const router = useRouter();

async function resetpswdUser() {
  try {
    const response = await resetPassword(userReset.value.email);
    successMessage.value = response; // Wyświetlamy komunikat sukcesu
    errorInfo.value = '';
  } catch (err) {
    errorInfo.value = "Błąd resetowania hasła: " + err.message;
    successMessage.value = '';
  }
}

function showHome() {
  router.push('/');
}
document.title = "Resetowanie hasła";
</script>
