<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#" @click="showHome">Świat Kina</a>
      <div class="navbar-nav ms-auto"></div>
    </nav>
  </header>
  <br />
  <div class="my-4 d-flex justify-content-center align-items-center" style="min-height: 80vh;">
    <form @submit.prevent="loginUser()" style="width: 100%; max-width: 500px; padding: 2rem; box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); border-radius: 10px; background-color: #f8f9fa;">
      <!-- Komunikat o błędzie -->
      <div v-if="error" class="alert alert-danger mb-4">{{ error }}</div>

      <div class="mb-4">
        <label for="email" class="form-label">Email:</label>
        <input type="text" v-model="userLogin.email" class="form-control form-control-lg" required />
      </div>
      <div class="mb-4">
        <label for="password" class="form-label">Hasło:</label>
        <input type="password" v-model="userLogin.password" class="form-control form-control-lg" required />
      </div>
      <div class="mb-4 d-flex justify-content-between">
        <router-link to="/register" class="text-decoration-none">Rejestracja</router-link>
        <router-link to="/renew" class="text-decoration-none">Odzyskaj hasło</router-link>
      </div>
      <button type="submit" class="btn btn-success btn-lg w-100" :disabled="isLoading">
        {{ isLoading ? "Logowanie..." : "Zaloguj" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useLogin from "@/composables/useLogin";

const userLogin = ref({
  email: "",
  password: "",
});

const { login, error, isLoading } = useLogin();
const router = useRouter();

async function loginUser() {
  try {
    await login(userLogin.value.email, userLogin.value.password);
    router.push("/"); // Po udanym logowaniu przenieś użytkownika na stronę główną
  } catch (err) {
    console.error("Błąd logowania:", err);
  }
}

function showHome() {
  router.push("/");
}
document.title = "Logowanie";
</script>
