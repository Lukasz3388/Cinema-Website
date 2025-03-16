<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#" @click="showHome">Świat Kina</a>
      <div class="navbar-nav ms-auto"></div>
    </nav>
  </header>

  <div class="my-4 d-flex justify-content-center align-items-center" style="min-height: 80vh;">
    <form @submit.prevent="registerUser()" style="width: 100%; max-width: 500px; padding: 2rem; box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); border-radius: 10px; background-color: #f8f9fa;">
      <!-- Komunikat o wyniku rejestracji -->
      <div class="mb-4" v-if="errorInfo">
        <p :class="messageClass">{{ errorInfo }}</p>
      </div>
      <div class="mb-4">
        <label for="email" class="form-label">Email:</label>
        <input type="text" v-model="userRegister.email" class="form-control form-control-lg" required />
      </div>

      <div class="mb-4">
        <label for="password" class="form-label">Hasło:</label>
        <input type="password" v-model="userRegister.password" class="form-control form-control-lg" required />
      </div>

      <div class="mb-4">
        <label for="confirmPassword" class="form-label">Potwierdź hasło:</label>
        <input type="password" v-model="userRegister.confirmPassword" class="form-control form-control-lg" required />
      </div>

      <div class="mb-4 d-flex justify-content-between">
        <router-link to="/login" class="text-decoration-none">Zaloguj</router-link>
        <router-link to="/renew" class="text-decoration-none">Odzyskaj hasło</router-link>
      </div>

      <button type="submit" class="btn btn-success btn-lg w-100">Zarejestruj</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useLogin from "@/composables/useLogin";

const userRegister = ref({
  email: "",
  password: "",
  confirmPassword: "",
});

const { register, error, isLoading } = useLogin();
const errorInfo = ref('');
const messageClass = ref('text-success');
const router = useRouter();

async function registerUser() {
  if (userRegister.value.password !== userRegister.value.confirmPassword) {
    errorInfo.value = "Hasła nie są identyczne!";
    messageClass.value = "text-danger";
    userRegister.value.password = "";
    userRegister.value.confirmPassword = "";
    return;
  }

  try {
    await register(userRegister.value.email, userRegister.value.password);
    errorInfo.value = "Rejestracja udana! Przekierowanie na stronę logowania...";
    messageClass.value = "text-success";
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  } catch (err) {
    errorInfo.value = "Błąd rejestracji: " + err.message;
    messageClass.value = "text-danger";
  }
}

function showHome() {
  router.push('/');
}
document.title = "Rejestracja";
</script>

